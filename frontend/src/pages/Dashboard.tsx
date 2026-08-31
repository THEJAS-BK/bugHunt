import { Link } from 'react-router-dom'
import { useUserStats } from '../api/user'
import { useProblems } from '../api/problems'
import type { Difficulty } from '../types'

const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-neutral-50 text-emerald-600',
  medium: 'bg-neutral-50 text-amber-600',
  hard: 'bg-neutral-50 text-red-600',
}

export function Dashboard() {
  const user = useUserStats()
  const problems = useProblems()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-sm font-medium text-neutral-500 mb-3">Your Progress</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
            <p className="text-xs font-medium text-neutral-500">Total Solved</p>
            <p className="mt-1 text-2xl font-semibold text-neutral-900">{user.stats.totalSolved}</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
            <p className="text-xs font-medium text-neutral-500">Easy</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-600">{user.stats.easy}</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
            <p className="text-xs font-medium text-neutral-500">Medium</p>
            <p className="mt-1 text-2xl font-semibold text-amber-600">{user.stats.medium}</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
            <p className="text-xs font-medium text-neutral-500">Hard</p>
            <p className="mt-1 text-2xl font-semibold text-red-600">{user.stats.hard}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-neutral-500 mb-3">Recent Problems</h2>
        <div className="border border-neutral-200 rounded divide-y divide-neutral-100">
          {problems.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              to={`/problems/${p.id}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-colors"
            >
              <span className="text-sm font-medium text-blue-600 hover:text-blue-800">{p.title}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${difficultyColors[p.difficulty]}`}>
                {p.difficulty}
              </span>
            </Link>
          ))}
        </div>
        <Link
          to="/problems"
          className="mt-3 inline-block text-sm text-neutral-500 hover:text-neutral-700"
        >
          View all problems
        </Link>
      </div>
    </div>
  )
}
