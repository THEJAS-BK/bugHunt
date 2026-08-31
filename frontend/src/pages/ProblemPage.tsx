import { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useProblem } from '../api/problems'
import { CodeEditor } from '../components/CodeEditor'
import { ReferencePreview } from '../components/ReferencePreview'
import { UserPreview } from '../components/UserPreview'
import { SubmissionResults } from '../components/SubmissionResults'
import { ResizeHandle } from '../components/ResizeHandle'
import type { Submission, Difficulty } from '../types'

const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-neutral-50 text-emerald-600',
  medium: 'bg-neutral-50 text-amber-600',
  hard: 'bg-neutral-50 text-red-600',
}

export function ProblemPage() {
  const { id } = useParams<{ id: string }>()
  const problem = useProblem(id ?? '')
  const [code, setCode] = useState(problem?.starterCode ?? '')
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'output'>('preview')
  const [leftWidth, setLeftWidth] = useState(30)
  const [rightWidth, setRightWidth] = useState(30)

  const handleLeftResize = useCallback((delta: number) => {
    setLeftWidth((prev) => Math.min(60, Math.max(15, prev + (delta / window.innerWidth) * 100)))
  }, [])

  const handleRightResize = useCallback((delta: number) => {
    setRightWidth((prev) => Math.min(60, Math.max(15, prev + (delta / window.innerWidth) * 100)))
  }, [])

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
        <p className="text-neutral-500 text-sm">Problem not found.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold text-neutral-900">{problem.title}</h1>
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${difficultyColors[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
        <div className="flex gap-1.5">
          {problem.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mb-4 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
      >
        Submit
      </button>

      <SubmissionResults submission={submission} />

      <div className="mt-4 hidden md:flex h-[600px] rounded border border-neutral-200 bg-white overflow-hidden">
        <div className="flex" style={{ width: `${leftWidth}%` }}>
          <div className="flex w-10 flex-col border-r border-neutral-200 bg-neutral-50">
            {(['preview', 'code', 'output'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 writing-vertical text-xs font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-neutral-900 border-r-2 border-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
                }`}
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-hidden">
            {activeTab === 'preview' && <ReferencePreview src={problem.referencePreviewSrc} />}
            {activeTab === 'code' && (
              <div className="h-full overflow-auto p-4">
                <pre className="text-xs text-neutral-700 whitespace-pre-wrap">{code}</pre>
              </div>
            )}
            {activeTab === 'output' && <UserPreview />}
          </div>
        </div>

        <ResizeHandle direction="horizontal" onResize={handleLeftResize} />

        <div className="flex-1 min-w-0">
          <CodeEditor code={code} onChange={setCode} />
        </div>

        <ResizeHandle direction="horizontal" onResize={handleRightResize} />

        <div style={{ width: `${rightWidth}%` }} className="min-w-0 overflow-hidden">
          <UserPreview />
        </div>
      </div>

      <div className="md:hidden space-y-4">
        <div className="h-64 rounded border border-neutral-200 overflow-hidden">
          <ReferencePreview src={problem.referencePreviewSrc} />
        </div>
        <div className="h-64 rounded border border-neutral-200 overflow-hidden">
          <CodeEditor code={code} onChange={setCode} />
        </div>
        <div className="h-48 rounded border border-neutral-200 overflow-hidden">
          <UserPreview />
        </div>
      </div>
    </div>
  )
}
