# PassFort

[![Live demo](https://img.shields.io/badge/demo-GitHub%20Pages-00ffcc?logo=github)](https://saichandram-sadhu.github.io/passfort/)
[![Tests](https://img.shields.io/badge/tests-44%20passing-brightgreen)](#quick-start)
[![CI](https://github.com/saichandram-sadhu/passfort/actions/workflows/ci.yml/badge.svg)](https://github.com/saichandram-sadhu/passfort/actions/workflows/ci.yml)
[![Pages](https://github.com/saichandram-sadhu/passfort/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/saichandram-sadhu/passfort/actions/workflows/deploy-pages.yml)

A full-stack password strength analyzer. Passwords are analyzed entirely in your browser — nothing sensitive ever leaves your device.

**Live site (frontend):** [saichandram-sadhu.github.io/passfort](https://saichandram-sadhu.github.io/passfort/) — auto-deployed from `master` via GitHub Actions. Dictionary + global stats need a deployed API; set `NEXT_PUBLIC_API_URL` in the Pages workflow when your backend URL is ready (see [Deploy](#deploy)).

## Screenshot

![PassFort — hero, privacy notice, and password analyzer](docs/screenshot.png)

## How it works (animated diagrams)

GitHub renders these **Mermaid** diagrams when you view this file on the web.

### User & privacy flow

```mermaid
flowchart LR
  subgraph Browser["Your browser"]
    A[Type password] --> B[analyzePassword]
    B --> C[Score · entropy · patterns]
    C --> D[UI updates instantly]
    B -.->|never sent| E[(Password)]
  end
  subgraph API["Backend (metadata only)"]
    F[POST /api/stats]:::meta
    G[GET /api/dictionary]:::meta
  end
  D -->|debounced 800ms| F
  G -->|word list| B
  classDef meta fill:#1a1a28,stroke:#00ffcc,color:#e0e0e0;
```

### Request sequence (dictionary + stats)

```mermaid
sequenceDiagram
  participant U as User
  participant FE as Next.js app
  participant API as FastAPI
  participant DB as PostgreSQL

  U->>FE: Types password
  FE->>FE: Local analysis (TS engine)
  Note over FE: No password over network

  FE->>API: GET /api/dictionary (once)
  API-->>FE: common words list

  FE->>API: POST /api/stats (debounced)
  Note right of API: score, length, crack_time, flags only
  API->>DB: INSERT password_stats
  API-->>FE: 200 OK

  FE->>API: GET /api/stats (dashboard)
  API->>DB: aggregates
  API-->>FE: totals & averages
```

### CI pipeline (GitHub Actions)

Runs on every push to `master` / `main` (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml); copy lives in [`docs/ci-workflow.yml`](docs/ci-workflow.yml)).

```mermaid
flowchart TB
  subgraph Push["git push"]
    P[origin/main or master]
  end
  subgraph CI["GitHub Actions — CI"]
    F[frontend: npm ci → test → build]
    B[backend: pip install → pytest]
  end
  P --> F
  P --> B
```

### Deploy overview

```mermaid
flowchart LR
  subgraph Vercel
    V[Next.js frontend]
  end
  subgraph Railway
    R[FastAPI]
    PG[(PostgreSQL)]
  end
  V -->|NEXT_PUBLIC_API_URL| R
  R --> PG
```

## Project Structure

```
passfort/
├── frontend/   # Next.js 14 + Tailwind + Framer Motion + Three.js + GSAP
├── backend/    # FastAPI + PostgreSQL
├── docs/       # Screenshot + CI workflow backup (`ci-workflow.yml`)
└── .github/workflows/  # CI (GitHub Actions)
```

## Features

- **Real-time strength analysis** — instant scoring as you type
- **Entropy calculator** — bits of randomness with tier labels
- **Crack time estimator** — brute force, dictionary, and rainbow table
- **Pattern detector** — keyboard walks, repeated chars, leet speak, dates
- **Password generator** — random (CSPRNG) and EFF passphrase modes
- **Anonymous global stats** — no passwords stored, ever
- **Three.js particle background** with GSAP scroll animations
- **Privacy first** — 100% client-side analysis

## Quick start

### Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL to your API origin
npm run dev        # http://localhost:3000
npm run build
npm test
```

### Backend (FastAPI)

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Optional: SKIP_DB_INIT=1 if PostgreSQL is not running yet
uvicorn main:app --reload --host 127.0.0.1 --port 8000
pytest tests/ -v
```

## Deploy

### 1. GitHub (done)

**Repository:** [github.com/saichandram-sadhu/passfort](https://github.com/saichandram-sadhu/passfort)

```bash
git remote add origin https://github.com/saichandram-sadhu/passfort.git   # if missing
git push -u origin master
```

**Note:** If `git push` ever rejects changes under `.github/workflows/` (OAuth `workflow` scope), paste from [`docs/ci-workflow.yml`](docs/ci-workflow.yml) in the GitHub UI, or run `gh auth refresh -s workflow` and push again.

### 2. Backend → [Railway](https://railway.app)

1. New project → add **PostgreSQL**.
2. Deploy from GitHub repo; set **root directory** to `backend/`.
3. Variables:

   | Variable | Value |
   |----------|--------|
   | `DATABASE_URL` | Use the variable Railway injects from PostgreSQL (backend rewrites `postgresql://` → `postgresql+asyncpg://`). |
   | `ALLOWED_ORIGINS` | Your Vercel URL, e.g. `https://passfort.vercel.app` |
   | `PORT` | Railway sets this automatically. |

4. After deploy, copy the public API URL (e.g. `https://xxx.up.railway.app`).

### 3. Frontend

**Option A — GitHub Pages (already wired)**  
Workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).  
Add a [repository secret](https://github.com/saichandram-sadhu/passfort/settings/secrets/actions) **`NEXT_PUBLIC_API_URL`** (e.g. your Railway API URL, no trailing slash). Re-run **Deploy GitHub Pages** so the build embeds it. Put `https://saichandram-sadhu.github.io` in Railway **`ALLOWED_ORIGINS`**.

**Option B — [Vercel](https://vercel.com)**  
Import the repo; **root directory** `frontend/`. Set `NEXT_PUBLIC_API_URL` to your API. For Vercel, do **not** set `NEXT_PUBLIC_BASE_PATH` (leave unset so `basePath` is empty in `next.config.mjs`).

### Local API without PostgreSQL

For quick demos, start the API with **`SKIP_DB_INIT=1`**. Dictionary routes work; stats endpoints need a real database.

## Architecture (text)

```
Browser
  ├── analyzePassword()     ← pure TS, no network for the secret
  ├── generateRandom()      ← crypto.getRandomValues
  ├── generatePassphrase()  ← EFF wordlist, lazy-loaded
  └── (debounced) POST /api/stats  ← score/metadata only

FastAPI
  ├── GET  /api/dictionary  → common-passwords list (cached)
  ├── POST /api/stats       → anonymous row (rate limited)
  └── GET  /api/stats       → global aggregates

PostgreSQL
  └── password_stats (score, length, crack_time_seconds, charset_flags, …)
```

## Developer

Developed by **Saichandram Sadhu**.

## License

MIT — use freely; no warranty.
