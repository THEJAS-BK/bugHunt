# bugHunt — Agent Instructions

## Project structure

```
bugHunt/
├── frontend/          # Vite + React + TypeScript
├── backend/           # Node.js + Express + cors + dotenv
├── .agents/skills/    # Installed opencode skills
├── plans/             # Development plans and change logs
├── AGENTS.md
├── README.md
└── skills-lock.json
```

## Frontend

- **Stack:** React 18 + TypeScript + Vite (standard `react-ts` template)
- **Location:** `frontend/`
- **Commands:**
  - `cd frontend && npm run dev` — start dev server
  - `cd frontend && npm run build` — production build
  - `cd frontend && npm run preview` — preview production build
  - `cd frontend && npm run lint` — run ESLint

## Backend

- **Stack:** Node.js + Express + cors + dotenv
- **Location:** `backend/`
- **Installed packages:** `express`, `cors`, `dotenv`
- **Entry point:** `backend/index.js` (default, no app code yet)

## Installed skills

Two opencode skills are installed in `.agents/skills/`:

| Skill | Source | Purpose |
|-------|--------|---------|
| `ai-sdk` | vercel/ai | Vercel AI SDK guidance |
| `frontend-design` | anthropics/skills | Frontend design principles |

## Key notes

- This is a fresh project — no application logic, routes, or database config exists yet.
- Plans and change logs are stored in `plans/`.
- Do not install additional packages unless explicitly requested.
