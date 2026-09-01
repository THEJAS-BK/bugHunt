import type { SubmissionResultsProps } from '../types'

export function SubmissionResults({ submission }: SubmissionResultsProps) {
  if (!submission) return null

  return (
    <div className="mt-4 rounded border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-3">
        {submission.passed ? (
          <div className="flex items-center gap-2 rounded bg-green-50 px-3 py-1.5">
            <svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-green-700">All tests passed!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded bg-red-50 px-3 py-1.5">
            <svg className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-red-700">Some tests failed</span>
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>Similarity Score</span>
          <span className="font-mono font-medium text-neutral-700">{submission.similarityScore}%</span>
        </div>
        <div className="mt-1 h-2 rounded-full bg-neutral-100">
          <div
            className={`h-full rounded-full transition-all ${
              submission.similarityScore >= 80
                ? 'bg-green-500'
                : submission.similarityScore >= 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
            style={{ width: `${submission.similarityScore}%` }}
          />
        </div>
      </div>

      <p className="mt-2 text-xs text-neutral-400">
        Submitted {new Date(submission.submittedAt).toLocaleString()}
      </p>
    </div>
  )
}
