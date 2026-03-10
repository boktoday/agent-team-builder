import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import OnboardingWizard from './components/OnboardingWizard'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
      </Routes>
    </div>
  )
}

export default App
