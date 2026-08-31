import { NavLink } from 'react-router-dom'
import { ProfileDropdown } from './ProfileDropdown'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center border-b border-neutral-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <NavLink to="/" className="flex items-center gap-2 text-base font-semibold text-neutral-900">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
            BugHunt
          </NavLink>
          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm font-medium transition-colors border-b-2 ${
                  isActive ? 'text-neutral-900 border-neutral-900' : 'text-neutral-500 hover:text-neutral-700 border-transparent'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/problems"
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm font-medium transition-colors border-b-2 ${
                  isActive ? 'text-neutral-900 border-neutral-900' : 'text-neutral-500 hover:text-neutral-700 border-transparent'
                }`
              }
            >
              Problems
            </NavLink>
          </div>
        </div>
        <ProfileDropdown />
      </div>
    </nav>
  )
}
