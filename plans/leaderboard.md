# Plan: Global Leaderboard Page

Add a `/leaderboard` route showing a ranked table of users sorted by problems solved.
Mock data, no backend. Follows the existing tool-like visual language.

---

## New files

```
src/
├── mock/
│   └── leaderboard.ts    # mock leaderboard entries
├── api/
│   └── leaderboard.ts    # useLeaderboard() hook
├── components/
│   └── LeaderboardTable.tsx  # ranked table component
└── pages/
    └── LeaderboardPage.tsx   # /leaderboard route
```

## Modified files

- `src/types.ts` — add `LeaderboardEntry` type
- `src/App.tsx` — add `/leaderboard` route
- `src/components/Navbar.tsx` — add "Leaderboard" nav link

---

## Types — `src/types.ts` (append)

```ts
export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  avatarUrl: string
  totalSolved: number
  easy: number
  medium: number
  hard: number
  lastActive: string
}
```

## Mock data — `src/mock/leaderboard.ts`

~15 entries. Mix of names, stats descending by totalSolved. Current user (id '1',
Alex Chen) placed somewhere in the middle (rank ~6). Realistic spread: top user at 47
solved, bottom at 3. Varied easy/medium/hard breakdowns.

## API hook — `src/api/leaderboard.ts`

```ts
import { mockLeaderboard } from '../mock/leaderboard'
import type { LeaderboardEntry } from '../types'

export function useLeaderboard(): LeaderboardEntry[] {
  return mockLeaderboard
}
```

## Components

### `LeaderboardTable.tsx`

Props: `{ entries: LeaderboardEntry[]; currentUserId: string }`

Renders a `<table>` with columns:
1. **Rank** — number, `font-mono text-sm`. Top 3 get no special treatment (keep it quiet).
2. **User** — name + initials avatar (3px rounded square, neutral-200 bg). Current user
   highlighted with `bg-neutral-50` row + `font-medium` name.
3. **Solved** — total count, `font-mono text-sm font-medium`. Bold relative to breakdown.
4. **Easy** — `font-mono text-sm text-emerald-600`
5. **Medium** — `font-mono text-sm text-amber-600`
6. **Hard** — `font-mono text-sm text-red-600`
7. **Last Active** — relative time string, `text-xs text-neutral-400`

Table styling (consistent with ProblemList):
- No outer card wrapper — border + overflow-hidden on the table container
- Header: `text-xs font-medium text-neutral-500 bg-neutral-50 border-b border-neutral-200`
  sentence-case, no uppercase/tracking
- Rows: `border-b border-neutral-100 hover:bg-neutral-50`
- Current user row: `bg-neutral-50` (slightly raised, not colored)
- Empty state: `border border-neutral-200 rounded p-8 text-center`

### `LeaderboardPage.tsx`

- Imports `useLeaderboard` hook
- Heading: "Leaderboard"
- Subtext: "Ranked by total problems solved" — `text-sm text-neutral-500 mb-6`
- Renders `<LeaderboardTable>` with current user id from mockUser
- Full width, no extra layout wrapping needed

## Routing changes

### `App.tsx`
Add import for LeaderboardPage, add route:
```tsx
<Route path="/leaderboard" element={<LeaderboardPage />} />
```

### `Navbar.tsx`
Add a "Leaderboard" NavLink after "Problems" (same pattern as existing nav links).

---

## Verification

- `cd frontend && npm run build` must pass
- `cd frontend && npm run lint` must pass
