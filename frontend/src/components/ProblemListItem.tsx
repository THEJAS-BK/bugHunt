import { Link } from 'react-router-dom'
import type { ProblemListItemProps } from '../types'

const difficultyClasses: Record<string, string> = {
  easy: 'bg-neutral-50 text-emerald-600',
  medium: 'bg-neutral-50 text-amber-600',
  hard: 'bg-neutral-50 text-red-600',
}

export function ProblemListItem({ problem }: ProblemListItemProps) {
  return (
    <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
      <td className="px-4 py-3">
        <Link
          to={`/problems/${problem.id}`}
          className="text-neutral-900 hover:text-neutral-700 font-medium text-sm underline-offset-2 hover:underline"
        >
          {problem.title}
        </Link>
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded ${difficultyClasses[problem.difficulty] ?? ''}`}
        >
          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3">
        <span
          className={
            problem.status === 'solved'
              ? 'h-2 w-2 rounded-full bg-green-500 inline-block'
              : 'h-2 w-2 rounded-full bg-neutral-300 inline-block'
          }
        />
      </td>
    </tr>
  )
}
