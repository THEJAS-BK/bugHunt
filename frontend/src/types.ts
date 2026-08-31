export type Difficulty = 'easy' | 'medium' | 'hard'
export type Status = 'solved' | 'unsolved'

export interface Problem {
  id: string
  slug: string
  title: string
  difficulty: Difficulty
  tags: string[]
  status: Status
  referencePreviewSrc: string
  starterCode: string
}

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string
  stats: { totalSolved: number; easy: number; medium: number; hard: number }
}

export interface Submission {
  id: string
  problemId: string
  passed: boolean
  similarityScore: number
  submittedAt: string
}
