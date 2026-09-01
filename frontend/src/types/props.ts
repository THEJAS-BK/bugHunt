import type { Problem, Submission, LeaderboardEntry } from './index'

export interface ReferencePreviewProps {
  src: string
}

export interface CodeEditorProps {
  code: string
  onChange: (value: string) => void
}

export interface SubmissionResultsProps {
  submission: Submission | null
}

export interface ResizeHandleProps {
  direction: 'horizontal' | 'vertical'
  onResize: (delta: number) => void
}

export interface FilterBarProps {
  difficulty: string
  status: string
  tag: string
  onDifficultyChange: (v: string) => void
  onStatusChange: (v: string) => void
  onTagChange: (v: string) => void
}

export interface ProblemListProps {
  problems: Problem[]
}

export interface ProblemListItemProps {
  problem: Problem
}

export interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  currentUserId: string
}

export type View = 'reference' | 'code' | 'output'
