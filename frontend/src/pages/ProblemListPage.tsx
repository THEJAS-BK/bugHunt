import { useState, useMemo } from 'react'
import type { Problem } from '../types'
import { mockProblems } from '../mock/problems'
import { FilterBar } from '../components/FilterBar'
import { ProblemList } from '../components/ProblemList'

export function ProblemListPage() {
  const [difficulty, setDifficulty] = useState('all')
  const [status, setStatus] = useState('all')
  const [tag, setTag] = useState('all')

  const filtered = useMemo(() => {
    return mockProblems.filter((p: Problem) => {
      if (difficulty !== 'all' && p.difficulty !== difficulty) return false
      if (status !== 'all' && p.status !== status) return false
      if (tag !== 'all' && !p.tags.includes(tag)) return false
      return true
    })
  }, [difficulty, status, tag])

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Problems</h1>
      <div className="mb-4">
        <FilterBar
          difficulty={difficulty}
          status={status}
          tag={tag}
          onDifficultyChange={setDifficulty}
          onStatusChange={setStatus}
          onTagChange={setTag}
        />
      </div>
      <ProblemList problems={filtered} />
    </div>
  )
}
