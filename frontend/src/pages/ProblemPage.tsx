import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProblem } from '../api/problems'
import { CodeEditor } from '../components/CodeEditor'
import { ReferencePreview } from '../components/ReferencePreview'
import { UserPreview } from '../components/UserPreview'
import { SubmissionResults } from '../components/SubmissionResults'
import type { Submission, Difficulty } from '../types'

const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-neutral-50 text-emerald-600',
  medium: 'bg-neutral-50 text-amber-600',
  hard: 'bg-neutral-50 text-red-600',
}

type View = 'reference' | 'code' | 'output'

const viewButtons: { key: View; label: string }[] = [
  { key: 'reference', label: 'Reference' },
  { key: 'code', label: 'Code' },
  { key: 'output', label: 'Output' },
]

export function ProblemPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const problem = useProblem(id ?? '')
  const [code, setCode] = useState(problem?.starterCode ?? '')
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [activeView, setActiveView] = useState<View>('reference')

  const handleSubmit = useCallback(() => {
    if (!problem) return
    const result: Submission = {
      id: crypto.randomUUID(),
      problemId: problem.id,
      passed: Math.random() > 0.3,
      similarityScore: Math.floor(Math.random() * 41) + 60,
      submittedAt: new Date().toISOString(),
    }
    setSubmission(result)
  }, [problem])

  if (!problem) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-neutral-500">Problem not found.</p>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-2">
        <button
          onClick={() => navigate('/problems')}
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <h1 className="text-base font-semibold text-neutral-900">{problem.title}</h1>
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${difficultyColors[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
        <div className="flex gap-1.5">
          {problem.tags.map((tag) => (
            <span key={tag} className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
              {tag}
            </span>
          ))}
        </div>
        <div className="ml-auto">
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 border-b border-neutral-200 px-4 py-1.5">
        {viewButtons.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveView(key)}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              activeView === key
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {submission && (
        <div className="border-b border-neutral-200 px-4 py-2">
          <SubmissionResults submission={submission} />
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {activeView === 'reference' && <ReferencePreview src={problem.referencePreviewSrc} />}
        {activeView === 'code' && <CodeEditor code={code} onChange={setCode} />}
        {activeView === 'output' && <UserPreview />}
      </div>
    </div>
  )
}
