import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './components/Landing'
import About from './components/About'
import Dashboard from './components/Dashboard'
import OnboardingWizard from './components/OnboardingWizard'
import Settings from './components/Settings'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App
