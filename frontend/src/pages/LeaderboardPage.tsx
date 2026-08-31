import { useLeaderboard } from '../api/leaderboard'
import { useUserStats } from '../api/user'
import { LeaderboardTable } from '../components/LeaderboardTable'

export function LeaderboardPage() {
  const entries = useLeaderboard()
  const user = useUserStats()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Leaderboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Ranked by total problems solved</p>
      </div>
      <LeaderboardTable entries={entries} currentUserId={user.id} />
    </div>
  )
}
