import { mockProblems } from '../mock/problems'
import type { Problem } from '../types'

export function useProblems(): Problem[] {
  return mockProblems
}

export function useProblem(id: string): Problem | undefined {
  return mockProblems.find((p) => p.id === id)
}
