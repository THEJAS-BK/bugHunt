import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Dashboard } from './pages/Dashboard'
import { ProblemListPage } from './pages/ProblemListPage'
import { ProblemPage } from './pages/ProblemPage'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { ProfilePage } from './pages/ProfilePage'

export default function App() {
  const location = useLocation()
  const isProblemPage = /^\/problems\/[^/]+$/.test(location.pathname)

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <Navbar />
      {isProblemPage ? (
        <Routes>
          <Route path="/problems/:id" element={<ProblemPage />} />
        </Routes>
      ) : (
        <main className="mx-auto max-w-7xl px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/problems" element={<ProblemListPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/users/:userId" element={<ProfilePage />} />
          </Routes>
        </main>
      )}
    </div>
  )
}
