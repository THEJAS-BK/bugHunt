import { Link } from 'react-router-dom'
import { useUserStats } from '../api/user'
import { useProblems } from '../api/problems'
import type { Difficulty } from '../types'

const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-green-50 text-green-700',
  medium: 'bg-yellow-50 text-yellow-700',
  hard: 'bg-red-50 text-red-700',
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
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <p className="text-xs font-medium text-neutral-500">Total Solved</p>
            <p className="mt-1 text-2xl font-semibold text-neutral-900">{user.stats.totalSolved}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-xs font-medium text-green-600">Easy</p>
            <p className="mt-1 text-2xl font-semibold text-green-700">{user.stats.easy}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs font-medium text-yellow-600">Medium</p>
            <p className="mt-1 text-2xl font-semibold text-yellow-700">{user.stats.medium}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-xs font-medium text-red-600">Hard</p>
            <p className="mt-1 text-2xl font-semibold text-red-700">{user.stats.hard}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-neutral-500 mb-3">Recent Problems</h2>
        <div className="bg-white border border-neutral-200 rounded-lg divide-y divide-neutral-100">
          {problems.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              to={`/problems/${p.id}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-colors"
            >
              <span className="text-sm font-medium text-blue-600 hover:text-blue-800">{p.title}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColors[p.difficulty]}`}>
                {p.difficulty}
              </span>
            </Link>
          ))}
        </div>
        <Link
          to="/problems"
          className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View All Problems →
        </Link>
      </div>
    </div>
  )
}
