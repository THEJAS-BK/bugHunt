import { useParams } from 'react-router-dom'
import { useProfileEntry } from '../api/profile'
import { useProblems } from '../api/problems'

const difficultyColors: Record<string, string> = {
  easy: 'bg-neutral-50 text-emerald-600',
  medium: 'bg-neutral-50 text-amber-600',
  hard: 'bg-neutral-50 text-red-600',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
}

function formatLastActive(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function deriveEmail(name: string): string {
  return name.toLowerCase().replace(/[^a-z\s]/g, '').trim().split(/\s+/).join('.') + '@example.com'
}

export function ProfilePage() {
  const { userId } = useParams()
  const entry = useProfileEntry(userId ?? '')
  const problems = useProblems()

  if (!entry) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-neutral-500 text-sm">User not found.</p>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded bg-neutral-200 text-lg font-semibold text-neutral-600 flex items-center justify-center">
            {getInitials(entry.name)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-neutral-900">{entry.name}</h1>
              {entry.userId === '1' && <span className="text-xs text-neutral-400">(you)</span>}
            </div>
            <p className="text-sm text-neutral-500">{deriveEmail(entry.name)}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
            <p className="font-mono text-2xl font-semibold text-neutral-900">{entry.totalSolved}</p>
            <p className="text-sm text-neutral-500 mt-1">Total Solved</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
            <p className="font-mono text-2xl font-semibold text-neutral-900">{entry.rank}</p>
            <p className="text-sm text-neutral-500 mt-1">Rank</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
            <p className="font-mono text-2xl font-semibold text-neutral-900">{formatLastActive(entry.lastActive)}</p>
            <p className="text-sm text-neutral-500 mt-1">Last Active</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
            <div className="flex gap-3">
              <span className="font-mono text-2xl font-semibold text-emerald-600">{entry.easy}</span>
              <span className="font-mono text-2xl font-semibold text-amber-600">{entry.medium}</span>
              <span className="font-mono text-2xl font-semibold text-red-600">{entry.hard}</span>
            </div>
            <p className="text-sm text-neutral-500 mt-1">E/M/H</p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-sm font-medium text-neutral-500 mb-3">Recent Problems</h2>
          <div className="border border-neutral-200 rounded divide-y divide-neutral-100">
            {problems.slice(0, 3).map((problem) => (
              <div key={problem.id} className="flex items-center justify-between p-3">
                <p className="text-sm text-neutral-700">{problem.title}</p>
                <span className={`text-xs rounded px-1.5 py-0.5 ${difficultyColors[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
