export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string
  stats: { totalSolved: number; easy: number; medium: number; hard: number }
}
