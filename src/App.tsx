import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import OnboardingWizard from './components/OnboardingWizard'
import Settings from './components/Settings'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App