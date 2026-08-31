# Bug Hunt — Development & Setup

Single consolidated reference for the project: current setup, everything built so far,
the design system in use, and how it all fits together. Older one-off plans have been
folded in here.

---

## Current setup

**Monorepo layout:**
```
bugHunt/
├── frontend/          # Vite + React 19 + TS + Tailwind v4
├── backend/           # Node.js + Express + cors + dotenv (no app code yet)
├── .agents/skills/    # ai-sdk, frontend-design (+ community skills)
├── plans/             # this file
├── AGENTS.md
├── README.md
└── skills-lock.json
```

**Frontend stack:** React 19.2.8, TypeScript 6.0.2, Vite 8.2.1, Tailwind v4
(`@tailwindcss/vite`, CSS-first), `react-router-dom`, `@monaco-editor/react`.
Lint via oxlint (`npm run lint`), typecheck+bundle via `tsc -b && vite build` (`npm run build`).

**Backend stack:** Express 5.2.1, cors, dotenv. Entry point `backend/index.js`. No routes,
controllers, or DB config — intentionally deferred.

**Commands:**
| Action | Command |
|--------|---------|
| Dev server | `cd frontend && npm run dev` |
| Build | `cd frontend && npm run build` |
| Lint | `cd frontend && npm run lint` |

---

## Design system (tool-like, deliberate)

A developer tool aesthetic (GitHub / Linear / CodeSandbox), not a marketing site.

- **Palette:** page `bg-white`; surfaces `bg-neutral-50`; borders `neutral-200` / rows
  `neutral-100`; text `neutral-900/500/400`. **One accent only** — `blue-600` on the Submit
  button. Difficulty as text color only: easy `emerald-600`, medium `amber-600`,
  hard `red-600`. Status dots: solved `emerald-500`, unsolved `neutral-300`.
- **Type:** `--font-sans` = Inter + system stack; `--font-mono` = SF Mono/UI-monospace —
  used ONLY for numeric/data values (similarity score, counts, ranks).
- **Geometry:** `rounded` (3px) on badges/tags/controls; no shadows anywhere; hierarchy from
  borders + spacing, not boxes. No `rounded-full` chips, no gradients, no glassmorphism.
- **Anti-patterns avoided:** no `→` on links, no ALL-CAPS tracked-out headers, no cream/
  clay or near-black/neon palettes, no blue on nav links (nav uses neutral + underline).

---

## Frontend structure

```
src/
├── main.tsx            # BrowserRouter + root render
├── App.tsx             # <Navbar/> + <Outlet/>-style layout + routes
├── index.css           # tailwind theme (fonts)
├── types.ts            # Problem, User, Submission, LeaderboardEntry
├── mock/               # problems.ts, user.ts, leaderboard.ts
├── api/                # problems.ts, user.ts, leaderboard.ts (hooks — swappable for real fetches)
├── components/         # Navbar, ProfileDropdown, FilterBar, ProblemList(Item),
│                       #   CodeEditor, ReferencePreview, UserPreview,
│                       #   SubmissionResults, ResizeHandle, LeaderboardTable
└── pages/              # Dashboard, ProblemListPage, ProblemPage, LeaderboardPage, ProfilePage
```

### Routes

| Path | Page |
|------|------|
| `/` | Dashboard — stat cards + recent problems |
| `/problems` | Problem list — FilterBar (tag/difficulty/status) + table |
| `/problems/:id` | Problem IDE — resizable three-pane (reference \| editor \| output) + Submit |
| `/leaderboard` | Leaderboard — ranked table of users by solved count |
| `/users/:userId` | Public profile — click a user in the leaderboard |

### API layers
Hooks return mock data but expose the shape real fetches will use (`useProblems`,
`useProblem(id)`, `useUserStats`, `useLeaderboard`). Swap the inner return for a fetch later.

---

## What's built so far

1. **Frontend shell** — routing, navbar, dashboard, problem list, problem IDE with Monaco +
   custom drag-handle resize (no lib), mock submit results.
2. **Visual redesign** — tightened to the tool-like system above.
3. **Global leaderboard** — `/leaderboard`, 15 mock users, current user highlighted.
4. **Public profile** — `/users/:userId`, opened by clicking a leaderboard user; shows
   avatar, email, solve stat breakdown, rank, last active, and recent problems.

---

## Development log

- `b04b5b9` chore: tailwind config
- `fc7e4fa` feat: set up routing and base layout
- `1956d4e` style: tighten visual language to tool-like aesthetic
- `a4920a8` feat: add global leaderboard page
- *(pending)* feat: add public profile page from leaderboard
---

## Out of scope (deferred)

Real evaluation logic, Playwright tests, live bundling, backend calls, auth, dark mode,
donut charts, animations.
