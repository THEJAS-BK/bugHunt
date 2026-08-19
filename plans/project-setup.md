# Plan: Initial Project Setup

## Current state
- Empty repo with README.md, AGENTS.md, and `.agents/skills/`
- No code, no package.json, no build tooling

## Steps

### 1. Frontend — Vite React TypeScript scaffold
```bash
npm create vite@latest frontend -- --template react-ts
cd frontend && npm install
```
- Uses standard `react-ts` template (React 18 + TypeScript + Vite)
- No additional packages added

### 2. Backend — Express project init
```bash
mkdir backend && cd backend
npm init -y
npm install express cors dotenv
```
- Only `express`, `cors`, `dotenv` installed
- No app code, routes, or config beyond what `npm init` and `npm install` create

### 3. AGENTS.md — Update
- Document the project structure and setup commands
- Note the two skills installed (`ai-sdk`, `frontend-design`)
- Keep it short and actionable

## Final structure
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

## Installed versions
- **Frontend:** React 19.2.8, TypeScript 6.0.2, Vite 8.2.0
- **Backend:** Express 5.2.1, cors 2.8.6, dotenv 17.4.2

## Commands summary
| Step | Command |
|------|---------|
| Frontend scaffold | `npm create vite@latest frontend -- --template react-ts` |
| Frontend install | `cd frontend && npm install` |
| Backend init | `cd backend && npm init -y` |
| Backend deps | `cd backend && npm install express cors dotenv` |

## What this plan does NOT do
- No application logic, routes, or controllers
- No database configuration
- No authentication setup
- No extra dependencies beyond the listed ones
- No modifications to default Vite setup
