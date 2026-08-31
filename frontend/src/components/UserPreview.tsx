export function UserPreview() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-white p-4">
      <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center">
        <svg
          className="mx-auto mb-3 h-8 w-8 text-neutral-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path d="M9 10h.01M15 10h.01M9.5 15.5a3.5 3.5 0 015 0" />
        </svg>
        <p className="text-sm font-medium text-neutral-700">Your Output</p>
        <p className="mt-1 text-xs text-neutral-500">
          Live preview will render your code here
        </p>
      </div>
    </div>
  )
}
