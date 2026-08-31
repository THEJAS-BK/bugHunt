import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Dashboard } from './pages/Dashboard'
import { ProblemListPage } from './pages/ProblemListPage'
import { ProblemPage } from './pages/ProblemPage'
import { LeaderboardPage } from './pages/LeaderboardPage'

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/problems" element={<ProblemListPage />} />
          <Route path="/problems/:id" element={<ProblemPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </div>
  )
}
