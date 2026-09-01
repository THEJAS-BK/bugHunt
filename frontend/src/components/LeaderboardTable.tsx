import type { LeaderboardTableProps } from '../types'
import { Link } from 'react-router-dom'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
}

function formatLastActive(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="border border-neutral-200 rounded p-8 text-center">
        <p className="text-neutral-500 text-sm">No leaderboard data available.</p>
      </div>
    )
  }

  return (
    <div className="border border-neutral-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-xs font-medium text-neutral-500 bg-neutral-50 border-b border-neutral-200">
            <th className="px-4 py-2.5 text-left w-12">Rank</th>
            <th className="px-4 py-2.5 text-left">User</th>
            <th className="px-4 py-2.5 text-left">Solved</th>
            <th className="px-4 py-2.5 text-left">Easy</th>
            <th className="px-4 py-2.5 text-left">Medium</th>
            <th className="px-4 py-2.5 text-left">Hard</th>
            <th className="px-4 py-2.5 text-left">Last Active</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            const isCurrentUser = entry.userId === currentUserId
            return (
              <tr
                key={entry.userId}
                className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                  isCurrentUser ? 'bg-neutral-50' : ''
                } ${i === entries.length - 1 ? 'border-b-0' : ''}`}
              >
                <td className="px-4 py-2.5 font-mono text-sm text-neutral-500">{entry.rank}</td>
                <td className="px-4 py-2.5">
                  <Link
                    to={`/users/${entry.userId}`}
                    className="inline-flex items-center gap-2.5 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                  >
                    <div className="h-6 w-6 shrink-0 rounded bg-neutral-200 text-[10px] font-medium text-neutral-600 flex items-center justify-center">
                      {getInitials(entry.name)}
                    </div>
                    <span className="text-sm text-neutral-700 underline-offset-2 hover:underline">
                      {entry.name}
                      {isCurrentUser && <span className="ml-1.5 text-xs text-neutral-400">(you)</span>}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-2.5 font-mono text-sm font-medium text-neutral-900">{entry.totalSolved}</td>
                <td className="px-4 py-2.5 font-mono text-sm text-emerald-600">{entry.easy}</td>
                <td className="px-4 py-2.5 font-mono text-sm text-amber-600">{entry.medium}</td>
                <td className="px-4 py-2.5 font-mono text-sm text-red-600">{entry.hard}</td>
                <td className="px-4 py-2.5 text-xs text-neutral-400">{formatLastActive(entry.lastActive)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
