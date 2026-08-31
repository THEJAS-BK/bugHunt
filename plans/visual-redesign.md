# Plan: Visual Redesign — Tool-like, Not Templated

Tighten the frontend shell so it reads as a deliberate developer tool (GitHub / Linear /
CodeSandbox territory), not default component-library output.

---

## Diagnosis — what reads as "AI-generated" right now

1. **Blue used as the universal accent** — links, buttons, active nav, focus rings, IDE tab
   indicator all compete for attention with the same blue-600. Nothing stands out.
2. **Rounded-full pills everywhere** — difficulty badges, tags, and status dots all get the
   same `rounded-full` treatment. Reads bubbly, not structured.
3. **Identical card treatment** — every container is `bg-white border border-neutral-200
   rounded-lg` with the same visual weight. No hierarchy.
4. **Colorful badge fills** — `bg-green-50 text-green-700` etc. on badges makes them loud
   relative to their informational value.
5. **`shadow-sm` on navbar** — soft shadow reads as marketing-site, not tool chrome.
6. **Uppercase tracked-out table headers** — `text-xs font-medium uppercase tracking-wider`
   is the generic-data-table tell.
7. **Arrow on "View All Problems →"** — classic AI-link pattern.
8. **`bg-neutral-50` page + `bg-white` cards** — warm/soft contrast, not sharp tool contrast.

---

## Token system — revised

### Palette

| Token             | Value          | Use                                    |
|-------------------|----------------|----------------------------------------|
| page              | `white`        | page background                        |
| surface           | `neutral-50`   | subtle raised areas (IDE tab rail)     |
| border            | `neutral-200`  | structural dividers everywhere         |
| border-subtle     | `neutral-100`  | table row separators                   |
| text-primary      | `neutral-900`  | headings, body                         |
| text-secondary    | `neutral-500`  | labels, metadata                       |
| text-tertiary     | `neutral-400`  | timestamps, disabled                   |
| accent            | `blue-600`     | Submit button ONLY                     |
| accent-hover      | `blue-700`     | Submit hover ONLY                      |
| easy              | `emerald-600`  | text-only on neutral-50 fill           |
| medium            | `amber-600`    | text-only on neutral-50 fill           |
| hard              | `red-600`      | text-only on neutral-50 fill           |
| status-solved     | `emerald-500`  | small dot                              |
| status-unsolved   | `neutral-300`  | small dot                              |

### Typography

| Role       | Face                              | Size/Weight                    |
|------------|-----------------------------------|--------------------------------|
| UI text    | Inter, system fallback            | sm (14px) base, semibold headings |
| Code/data  | `ui-monospace, SFMono-Regular, Menlo, monospace` | xs (12px), in SubmissionResults score only |

- No `@import` — system/Inter stack only. Zero weight cost.
- Monospace used ONLY for the similarity percentage number, nowhere else.

### Border radius

- Badges/tags: `rounded` (3px) — not `rounded-full`, not `rounded-lg`.
- Cards/containers: no border-radius (sharp corners) or `rounded` (3px) max.
- Buttons: `rounded` (3px).
- Progress bar fill: `rounded-sm` (2px) — functional, not decorative.

### Shadows

- Zero shadows. Not on navbar, not on cards, not on dropdowns.
- Hierarchy comes from borders and background tinting only.

---

## Component-by-component changes

### `index.css`
- Add Inter to font stack: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, sans-serif`
- Add monospace stack as a utility: `--font-mono: 'SF Mono', SFMono-Regular, ui-monospace,
  Menlo, monospace`

### `App.tsx`
- Page bg: `bg-white` (not `bg-neutral-50`)
- Container: keep `max-w-7xl mx-auto px-4 py-6`

### `Navbar.tsx`
- Remove `shadow-sm`. Keep `border-b border-neutral-200 bg-white`.
- Nav links: remove `rounded-md`. Active state: `text-neutral-900` with a 1px
  `border-b-2 border-neutral-900` underline indicator (like Linear's tab bar), not
  `bg-neutral-100` fill.
- Logo: slightly smaller, `text-base font-semibold` (not `text-lg`).
- Bug icon: replace smiley with a simpler mark — a small `B` in a rounded square or a
  terminal-prompt `>_` icon. Something that says "dev tool."

### `ProfileDropdown.tsx`
- Remove `rounded-full` from avatar circle → `rounded` (3px).
- Dropdown: remove `rounded-lg` → `rounded`. Remove `shadow-sm`.
- Dropdown hover: `bg-neutral-50` (not `bg-neutral-100` — subtler).

### `FilterBar.tsx`
- Selects: remove `rounded-lg` → `rounded`. Add `appearance-none` + custom chevron SVG for
  consistency.
- Labels: keep `text-xs font-medium text-neutral-500`. No uppercase.
- Layout: tighter gap-3 (not gap-4).

### `ProblemList.tsx`
- Remove outer `bg-white border rounded-lg` wrapper — render the `<table>` directly; the
  page bg is white, so no card is needed.
- Table header: `text-[11px] font-medium text-neutral-500` — NO uppercase, NO
  `tracking-wider`. Sentence-case column names: "Title", "Difficulty", "Tags", "Status".
- Header bg: `bg-neutral-50` stays (subtle section marker).
- Empty state: no card wrapper, just centered text.

### `ProblemListItem.tsx`
- Row hover: `hover:bg-neutral-50` (keep).
- Difficulty badge: remove `rounded-full` → `rounded`. Remove `bg-green-50` fill →
  `bg-neutral-50` for all difficulties. Color is in the text only.
- Tags: remove `rounded-full` → `rounded`. Keep `bg-neutral-100 text-neutral-600`.
- Title link: remove `text-blue-600` → `text-neutral-900 hover:text-neutral-700
  underline-offset-2 hover:underline`. Links in a data table should not be blue —
  they're navigation, not decoration.
- Status dot: keep as-is (it's already minimal).

### `Dashboard.tsx`
- Stat cards: remove `bg-green-50 border-green-200` etc. → all cards get
  `bg-neutral-50 border border-neutral-200 rounded`. The color is in the number text
  (emerald-600, amber-600, red-600), not the card background. Total-solved card gets
  `bg-white` to stand out slightly.
- "Recent Problems" section: keep the list-as-rows treatment, no card bg needed.
- "View All Problems →" → "View all problems" (no arrow, sentence case, remove `→`).
  Style: `text-sm text-neutral-500 hover:text-neutral-700` — quiet, not blue.
- Section headings ("Your Progress", "Recent Problems"): `text-xs font-medium
  text-neutral-400 uppercase tracking-wide` — wait, user said no tracked-out ALL-CAPS.
  Instead: `text-sm font-medium text-neutral-500` — keep as-is, it's fine for actual
  section labels (not decorative eyebrows).

### `ProblemListPage.tsx`
- No changes needed (layout is fine).

### `ProblemPage.tsx`
- Header tags: remove `rounded-full` → `rounded`.
- Difficulty badge: same change — `rounded`, `bg-neutral-50`, text color only.
- Submit button: remove `rounded-lg` → `rounded`. Keep blue-600 (it's the ONE accent use).
- IDE container: remove `rounded-lg` → `rounded`.
- Tab rail: remove `bg-neutral-50` → `bg-neutral-50` (keep, it's structural). Active tab
  indicator: remove `border-r-2 border-blue-600` → `border-r-2 border-neutral-900` (neutral
  active state, not blue).
- Mobile stacked panes: remove `rounded-lg` → `rounded`.
- Remove all `→` arrows if any exist.

### `CodeEditor.tsx`
- No changes. Monaco owns this pane entirely.

### `ReferencePreview.tsx`
- Label overlay: remove `rounded` → `rounded` (3px, keep). Style is fine — it's a utility
  label, not decoration.

### `UserPreview.tsx`
- Dashed border box: remove `rounded-lg` → `rounded`.
- Keep the empty-state treatment as-is (it's honest and functional).

### `SubmissionResults.tsx`
- Card: remove `rounded-lg` → `rounded`.
- Pass/fail badges: remove `rounded-md` → `rounded`. Keep bg-green-50/bg-red-50 (functional
  signal, not decoration).
- Progress bar: keep `rounded-full` on the bar track and fill — progress bars are one place
  where round is correct.
- Similarity score number: add `font-mono` to the percentage value — this is the ONE place
  monospace appears.

### `ResizeHandle.tsx`
- No changes. Already minimal and functional.

---

## Summary of anti-pattern removals

| Before                          | After                            |
|---------------------------------|----------------------------------|
| `shadow-sm` on navbar           | border only                      |
| `rounded-full` on badges/tags   | `rounded` (3px)                  |
| `rounded-lg` on cards/IDE       | `rounded` (3px) or none          |
| `text-blue-600` on table links  | `text-neutral-900` + hover:underline |
| `bg-green-50 text-green-700`    | `bg-neutral-50 text-emerald-600` |
| blue-600 on everything          | blue-600 on Submit button only   |
| `uppercase tracking-wider`      | sentence-case headers            |
| `→` on links                    | plain text links                 |
| `bg-neutral-50` page + cards    | `bg-white` page, minimal cards   |

---

## Verification

- `cd frontend && npm run build` must pass (tsc -b + vite build)
- `cd frontend && npm run lint` must pass (oxlint)
