import type { ReferencePreviewProps } from '../types'

export function ReferencePreview({ src }: ReferencePreviewProps) {
  return (
    <div className="relative h-full">
      <div className="absolute left-2 top-2 z-10 rounded bg-neutral-800 px-2 py-0.5 text-xs font-medium text-white">
        Reference Preview
      </div>
      <iframe
        src={src}
        title="Reference Preview"
        className="h-full w-full border-0"
      />
    </div>
  )
}
