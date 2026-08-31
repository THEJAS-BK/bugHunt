interface FilterBarProps {
  difficulty: string
  status: string
  tag: string
  onDifficultyChange: (v: string) => void
  onStatusChange: (v: string) => void
  onTagChange: (v: string) => void
}

const difficulties = ['all', 'easy', 'medium', 'hard'] as const
const statuses = ['all', 'solved', 'unsolved'] as const
const tags = ['all', 'react', 'hooks', 'components', 'state', 'styling', 'events', 'performance', 'forms'] as const

const selectClass =
  'border border-neutral-200 rounded-lg px-3 py-1.5 text-sm bg-white text-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'

export function FilterBar({
  difficulty,
  status,
  tag,
  onDifficultyChange,
  onStatusChange,
  onTagChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-neutral-500 font-medium">Difficulty</label>
        <select
          className={selectClass}
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-neutral-500 font-medium">Status</label>
        <select
          className={selectClass}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-neutral-500 font-medium">Tag</label>
        <select
          className={selectClass}
          value={tag}
          onChange={(e) => onTagChange(e.target.value)}
        >
          {tags.map((t) => (
            <option key={t} value={t}>
              {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
