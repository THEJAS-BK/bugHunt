import { useState, useRef, useEffect } from 'react'
import { mockUser } from '../mock/user'

export function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const initials = mockUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md p-1.5 text-sm hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-700">
          {initials}
        </div>
        <span className="hidden text-sm font-medium text-neutral-700 sm:block">{mockUser.name}</span>
        <svg className="h-4 w-4 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-neutral-200 bg-white py-1 shadow-sm">
          <div className="border-b border-neutral-100 px-3 py-2">
            <p className="text-sm font-medium text-neutral-900">{mockUser.name}</p>
            <p className="text-xs text-neutral-500">{mockUser.email}</p>
          </div>
          <button className="w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600">
            Settings
          </button>
          <button className="w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
