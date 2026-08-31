# Plan: Frontend Shell (Dashboard / Problems / Problem IDE)

Build the Bug Hunt frontend shell with mock data, per the brief. React 19 + TS + Vite 8 +
Tailwind v4 (`@tailwindcss/vite`, CSS-first). No evaluation logic, no backend calls.

## New dependencies
- `react-router-dom` — routing (`/`, `/problems`, `/problems/:id`)
- `@monaco-editor/react` — Monaco Editor integration (chosen over CodeMirror)

Three panes on the problem page are made resizable with a minimal, custom CSS drag-handle
component (no library), keeping to the flat/no-extra-deps constraint.

No icon library, no UI kit, no animation lib. Icons are inline SVG in components.

## Design direction (subject-grounded, constrained)
Subject: a LeetCode-style IDE for React challenges. Pages are functional tools, not
marketing pages. The "hero" is the problem workspace itself: reference preview | editor |
your preview, with a resizable split. Per the brief: flat, neutral whites/grays, GitHub/
LeetCode-like, no gradients/glassmorphism/drop-shadows, no hero/marketing/modals/toggle.

The single visual risk, kept in one place and justified: the live problem IDE with a
resizable three-pane split and a left-rail tab bar (Preview / Code / Output) that frames the
workflow literally — the reference on the left, your code center, your result right. Everything
else stays quiet and functional.

## Token system
Palette (Tailwind v4 utilities; no overrides needed):
- page background `bg-neutral-50`
- cards `bg-white`
- borders `border-neutral-200`
- primary text `text-neutral-900`
- secondary text `text-neutral-500`
- **one accent** for primary actions: `bg-blue-600` (submit), hover `bg-blue-700`
- status colors (subdued, GitHub-tag style): solved `text-green-700`/`bg-green-50`,
  unsolved `text-neutral-500`, difficulty badges easy `text-green-700`, medium
  `text-yellow-700`, hard `text-red-700` on `bg-*-50` soft fills.

Type: system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
'Helvetica Neue', Arial, sans-serif`) set once via Tailwind theme. No font import —
functional tool, zero weight cost. UI scale via Tailwind defaults (xs/sm/base/lg).

Layout: sticky top navbar; content max-width container; flat cards with hairline borders
and `rounded-lg`; no shadows except a single `shadow-sm` on the navbar.

## Components (flat, as specified — no extra wrappers/layout providers)
```
src/
├── main.tsx           # BrowserRouter + routes
├── App.tsx            # routes; <Navbar/> + <Outlet/> layout (flat, no provider)
├── index.css          # tailwind theme: font stack + accent defaults
├── types.ts           # Problem, User, Submission + enums
├── mock/
│   ├── problems.ts    # mock problem list
│   └── user.ts        # mock user + stats
├── api/
│   ├── problems.ts    # useProblems(), useProblem(id)
│   └── user.ts        # useUserStats()
└── components/
    ├── Navbar.tsx              # logo, nav links, ProfileDropdown
    ├── ProfileDropdown.tsx     # avatar + dropdown (settings/logout) — inline SVG
    ├── ProblemList.tsx         # table + FilterBar
    ├── ProblemListItem.tsx     # row: title, difficulty, tags, status
    ├── FilterBar.tsx           # filter by tag / difficulty / solved
    ├── ProblemPage.tsx         # fetches problem, composes tri-pane IDE
    ├── CodeEditor.tsx          # Monaco wrapper (React/JSX), resizable
    ├── ReferencePreview.tsx    # iframe placeholder of target design
    ├── UserPreview.tsx         # stub panel for live user code render
    ├── SubmissionResults.tsx   # mock pass/fail + similarity after submit
    └── ResizeHandle.tsx        # custom vertical/horizontal drag handle
```

## Routes & pages
- `/` Dashboard: Navbar; profile summary (total solved + easy/medium/hard breakdown as a
  stat block — a simple multi-cell stat row plus total, not a heavy donut chart);
  recent/quick links to problems. "Style loosely like LeetCode's profile/dashboard" →
  plain stat cards, no chart lib.
- `/problems` Problem list: FilterBar (tag / difficulty / solved) + table (title link →
  `/problems/:id`, difficulty badge, tags, solved/unsolved status dot).
- `/problems/:id` Problem page: header (title, difficulty, tags); tri-pane IDE with
  left-tab rail (Preview / Code / Output):
  - ReferencePreview — iframe with placeholder `src="about:blank"` + label.
  - CodeEditor — Monaco, mock JSX starter code in state.
  - UserPreview — stub panel with placeholder content (real bundling later).
  - Submit button → SubmissionResults (pass/fail + similarity %, dummy data).
  Pane widths controlled by `ResizeHandle` (pointer events adjusting flex-basis; min widths).

## API/service layer (swap-in later)
Hooks return mock data now but expose the same shape real fetches will:
- `useProblems(): Problem[] | undefined`
- `useProblem(id: string): Problem | undefined`
- `useUserStats(): User | undefined`
Each wrapped so the inner `fetch`/promise can be replaced by a real API later. The
`useProblem` reads from mock list by id (no router data router needed).

## Types
```ts
type Difficulty = 'easy' | 'medium' | 'hard'
type Status = 'solved' | 'unsolved'

interface Problem {
  id: string
  slug: string
  title: string
  difficulty: Difficulty
  tags: string[]
  status: Status
  referencePreviewSrc: string   // iframe placeholder
  starterCode: string           // Monaco initial content
}

interface User {
  id: string
  name: string
  email: string
  avatarUrl: string
  stats: { totalSolved: number; easy: number; medium: number; hard: number }
}

interface Submission {
  id: string
  problemId: string
  passed: boolean
  similarityScore: number  // 0-100, mocked
  submittedAt: string
}
```

## Mock data
- ~8 problems exercising the filters (a few each difficulty/tags; mix of solved/unsolved).
- One user with plausible stats.
- Mock `Submission` result returned by the local submit handler.

## Quality floor
- Responsive down to mobile (navigation collapses to a simple mobile row/stack; IDE pans
  stack on narrow widths).
- Visible `:focus-visible` outlines on interactive elements.
- `prefers-reduced-motion` respected (only basic hover states anyway).
- Type-safe via `verbatimModuleSyntax` (`import type` where needed); `noUnusedLocals` clean.

## Verification
- `cd frontend && npm run build` (tsc -b + vite build) must pass.
- `cd frontend && npm run lint` (oxlint) must pass.

## Out of scope (explicitly not built)
- Real evaluation logic, Playwright tests, live bundling, backend calls, auth, dark mode,
  extra pages/components/animations, donut chart.
