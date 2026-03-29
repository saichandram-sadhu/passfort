# PassFort

A full-stack password strength analyzer. Passwords are analyzed entirely in your browser — nothing sensitive ever leaves your device.

## Screenshot

![PassFort — hero, privacy notice, and password analyzer](docs/screenshot.png)

## Project Structure

```
passfort/
├── frontend/   # Next.js 14 + Tailwind + Framer Motion + Three.js + GSAP
└── backend/    # FastAPI + PostgreSQL
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

## Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev        # http://localhost:3000
npm run build      # production build
npm test           # run 40 unit tests
```

## Backend (FastAPI)

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate          # Windows
# or: source .venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
cp .env.example .env            # set DATABASE_URL
uvicorn main:app --reload       # http://localhost:8000
pytest tests/ -v                # run 4 backend tests
```

## Deploy

### Backend → Railway

1. Create new Railway project, add PostgreSQL service
2. Deploy `passfort/backend/` as the root
3. Set environment variables:
   ```
   DATABASE_URL=<Railway PostgreSQL URL — auto-provided>
   ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
   PORT=8000
   ```
4. Railway auto-detects `railway.toml` and runs `uvicorn main:app --host 0.0.0.0 --port $PORT`

> **Important:** If Railway provides a `postgresql://` URL, the backend normalizes it to `postgresql+asyncpg://` automatically.

### Frontend → Vercel

1. Import `passfort/frontend/` as a Vercel project (set root directory to `frontend/`)
2. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app
   ```
3. Vercel auto-detects Next.js and deploys

## Architecture

```
Browser
  ├── analyzePassword()  ← pure TS, no network
  ├── generateRandom()   ← crypto.getRandomValues
  ├── generatePassphrase() ← EFF wordlist, lazy-loaded
  └── (debounced) POST /api/stats  ← score/metadata only, never passwords

FastAPI Backend
  ├── GET  /api/dictionary  → top-1000 common passwords list (cached 24h)
  ├── POST /api/stats       → insert anonymous stat row (rate limited: 10/min)
  └── GET  /api/stats       → global averages (total, avg_score, avg_length)

PostgreSQL
  └── password_stats (id, score, length, crack_time_seconds, charset_flags, created_at)
```

## Developer

Developed by **Saichandram Sadhu**.

## Docs

- Spec: `../docs/superpowers/specs/2026-03-29-passfort-design.md`
- Plan: `../docs/superpowers/plans/2026-03-29-passfort.md`
