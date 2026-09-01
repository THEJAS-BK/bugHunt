import type { Difficulty, Status } from './common'

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
