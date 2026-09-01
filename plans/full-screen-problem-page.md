# Plan: Full-Screen ProblemPage with 3 Swapable Views

## Goal
Replace the current 3-panel IDE layout on `ProblemPage` with a full-screen, single-view layout. Three small buttons at the top center let the user swap between:

1. **Reference** — `ReferencePreview` iframe (expected output)
2. **Code** — `CodeEditor` Monaco editor
3. **Output** — `UserPreview` live output panel

## Files to Modify

### 1. `frontend/src/App.tsx` — Conditional wrapper
ProblemPage is currently wrapped in `<main className="mx-auto max-w-7xl px-4 py-6">`, which constrains it to 1280px and adds padding. To go full-screen, use `useLocation` to detect `/problems/:id` and render it outside the wrapper.

**Layout after change:**
```tsx
const location = useLocation()
const isProblemPage = /^\/problems\/[^/]+$/.test(location.pathname)

<div className="min-h-screen bg-white font-sans text-neutral-900">
  <Navbar />
  {isProblemPage ? (
    <Routes>
      <Route path="/problems/:id" element={<ProblemPage />} />
    </Routes>
  ) : (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <Routes> ... other routes ... </Routes>
    </main>
  )}
</div>
```

### 2. `frontend/src/pages/ProblemPage.tsx` — Full rewrite

**Remove:**
- 3-panel desktop layout (`hidden md:flex h-[600px]`)
- Mobile stacked layout (`md:hidden space-y-4`)
- Vertical tab sidebar
- `<ResizeHandle>` imports and resize state/logic
- `leftWidth`, `rightWidth`, `handleLeftResize`, `handleRightResize`

**New layout structure:**
```
┌─────────────────────────────────────────────────┐
│  [← Back]  [title] [diff] [tags]   [Submit btn] │  compact top bar
├─────────────────────────────────────────────────┤
│           [ Reference | Code | Output ]          │  3 pill buttons, centered
├─────────────────────────────────────────────────┤
│                                                 │
│             (active view — full area)            │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Key decisions:**
- Container: `h-[calc(100vh-3.5rem)]` (viewport minus navbar height), `flex flex-col`
- Top bar: horizontal row with back arrow, title, difficulty badge, tags, submit button
- View switcher: 3 small rounded buttons centered below top bar, active state highlighted
- View area: `flex-1 overflow-hidden`, renders the selected component
- `SubmissionResults`: shown inline below the view switcher, only when a submission exists
- Uses `useNavigate` for back button to `/problems`

**State changes:**
- `activeView: 'reference' | 'code' | 'output'` replaces `activeTab`
- Remove `leftWidth`, `rightWidth` state
- Keep `code`, `submission`, `handleSubmit`

### 3. No changes to child components
`CodeEditor`, `ReferencePreview`, `UserPreview`, `SubmissionResults` remain as-is. They already fill their parent via `h-full`.

## Verification
- `cd frontend && npm run lint`
- `cd frontend && npm run build`
