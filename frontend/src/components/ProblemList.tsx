import type { Problem } from '../types'
import { ProblemListItem } from './ProblemListItem'

interface ProblemListProps {
  problems: Problem[]
}

export function ProblemList({ problems }: ProblemListProps) {
  if (problems.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-lg p-8 text-center">
        <p className="text-neutral-500 text-sm">No problems match your filters.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider bg-neutral-50 border-b border-neutral-200">
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Difficulty</th>
            <th className="px-4 py-3">Tags</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <ProblemListItem key={p.id} problem={p} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
