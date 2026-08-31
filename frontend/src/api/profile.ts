import { mockLeaderboard } from '../mock/leaderboard'
import type { LeaderboardEntry } from '../types'

export function useProfileEntry(userId: string): LeaderboardEntry | undefined {
  return mockLeaderboard.find((entry) => entry.userId === userId)
}
