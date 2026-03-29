# PassFort

A full-stack password strength analyzer. Passwords are analyzed entirely in your browser — nothing sensitive ever leaves your device.

## Project Structure

```
passfort/
├── frontend/   # Next.js 14 + Tailwind + Framer Motion + Three.js
└── backend/    # FastAPI + PostgreSQL
```

## Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm test           # run unit tests
```

## Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
DATABASE_URL=postgresql+asyncpg://... uvicorn main:app --reload
```

## Docs

- Spec: `../docs/superpowers/specs/2026-03-29-passfort-design.md`
- Plan: `../docs/superpowers/plans/2026-03-29-passfort.md`
