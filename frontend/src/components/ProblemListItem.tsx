import { Link } from 'react-router-dom'
import type { Problem } from '../types'

const difficultyClasses: Record<string, string> = {
  easy: 'bg-green-50 text-green-700',
  medium: 'bg-yellow-50 text-yellow-700',
  hard: 'bg-red-50 text-red-700',
}

interface ProblemListItemProps {
  problem: Problem
}

export function ProblemListItem({ problem }: ProblemListItemProps) {
  return (
    <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
      <td className="px-4 py-3">
        <Link
          to={`/problems/${problem.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          {problem.title}
        </Link>
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyClasses[problem.difficulty] ?? ''}`}
        >
          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded-full"
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
