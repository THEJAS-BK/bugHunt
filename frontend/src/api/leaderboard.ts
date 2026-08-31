import { mockLeaderboard } from '../mock/leaderboard'
import type { LeaderboardEntry } from '../types'

export function useLeaderboard(): LeaderboardEntry[] {
  return mockLeaderboard
}
