import { useCallback } from 'react'
import type { ResizeHandleProps } from '../types'

export function ResizeHandle({ direction, onResize }: ResizeHandleProps) {
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      const target = e.currentTarget as HTMLElement
      target.setPointerCapture(e.pointerId)
      const start = direction === 'horizontal' ? e.clientX : e.clientY

      const onMove = (ev: PointerEvent) => {
        const current = direction === 'horizontal' ? ev.clientX : ev.clientY
        onResize(current - start)
      }

      const onUp = () => {
        target.removeEventListener('pointermove', onMove)
        target.removeEventListener('pointerup', onUp)
      }

      target.addEventListener('pointermove', onMove)
      target.addEventListener('pointerup', onUp)
    },
    [direction, onResize]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = 10
      if (direction === 'horizontal') {
        if (e.key === 'ArrowLeft') onResize(-step)
        if (e.key === 'ArrowRight') onResize(step)
      } else {
        if (e.key === 'ArrowUp') onResize(-step)
        if (e.key === 'ArrowDown') onResize(step)
      }
    },
    [direction, onResize]
  )

  const isHorizontal = direction === 'horizontal'

  return (
    <div
      role="separator"
      aria-orientation={direction}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      className={`flex shrink-0 items-center justify-center bg-neutral-200 transition-colors hover:bg-neutral-300 focus-visible:outline ${
        isHorizontal ? 'w-1.5 cursor-col-resize' : 'h-1.5 cursor-row-resize'
      }`}
    >
      <div
        className={`rounded-full bg-neutral-400 ${
          isHorizontal ? 'h-6 w-0.5' : 'h-0.5 w-6'
        }`}
      />
    </div>
  )
}
