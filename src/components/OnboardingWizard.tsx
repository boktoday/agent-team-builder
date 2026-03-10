import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionCard from './QuestionCard'
import AgentPreview from './AgentPreview'
import PaymentModal from './PaymentModal'
import { agents } from '../data/agents'
import { Question, OnboardingState } from '../types'

const questions: Question[] = [
  {
    id: 'q1',
    text: 'What is your primary business goal?',
    category: 'goals',
    options: ['Build a new product', 'Improve existing product', 'Automate processes', 'Scale operations'],
    required: true,
    order: 1
  },
  {
    id: 'q2',
    text: 'How would you describe your technical expertise?',
    category: 'expertise',
    options: ['Non-technical', 'Some technical knowledge', 'Developer', 'Expert developer'],
    required: true,
    order: 2
  },
  {
    id: 'q3',
    text: 'What team size are you building?',
    category: 'team',
    options: ['Solo founder', 'Small team (2-5)', 'Growing team (5-15)', 'Enterprise (15+)'],
    required: true,
    order: 3
  },
  {
    id: 'q4',
    text: 'Which industries are you targeting?',
    category: 'industry',
    options: ['B2B SaaS', 'E-commerce', 'Content/Media', 'Healthcare', 'Finance', 'Other'],
    required: true,
    order: 4
  },
  {
    id: 'q5',
    text: 'What is your monthly budget for AI/automation?',
    category: 'budget',
    options: ['$0-500', '$500-2000', '$2000-5000', '$5000+'],
    required: true,
    order: 5
  },
  {
    id: 'q6',
    text: 'Which channels are most important for your business?',
    category: 'channels',
    options: ['Web application', 'Mobile app', 'API/Integrations', 'Social media', 'Email'],
    required: true,
    order: 6
  }
]

export default function OnboardingWizard() {
  const navigate = useNavigate()
  const [state, setState] = useState<OnboardingState>({
    currentStep: 0,
    responses: {},
    selectedAgents: [],
    projectName: '',
    projectDescription: ''
  })
  const [showPayment, setShowPayment] = useState(false)

  const currentQuestion = questions[state.currentStep]
  const progress = ((state.currentStep + 1) / (questions.length + 1)) * 100

  const handleAnswer = (answer: string) => {
    setState(prev => ({
      ...prev,
      responses: { ...prev.responses, [currentQuestion.id]: answer }
    }))
  }

  const handleNext = () => {
    if (state.currentStep < questions.length - 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))
    } else {
      // After questions, show project name input
      setState(prev => ({ ...prev, currentStep: questions.length }))
    }
  }

  const handleBack = () => {
    if (state.currentStep > 0) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))
    }
  }

  const handleProjectSubmit = () => {
    // Select recommended agents based on responses
    const recommendedAgents = agents.slice(0, 8).map(a => a.id)
    setState(prev => ({
      ...prev,
      currentStep: questions.length + 1,
      selectedAgents: recommendedAgents
    }))
  }

  const handleAgentToggle = (agentId: string) => {
    setState(prev => ({
      ...prev,
      selectedAgents: prev.selectedAgents.includes(agentId)
        ? prev.selectedAgents.filter(id => id !== agentId)
        : [...prev.selectedAgents, agentId]
    }))
  }

  const handleContinueToPayment = () => {
    setShowPayment(true)
  }

  const handlePaymentSuccess = () => {
    // Navigate to dashboard with project data
    navigate('/dashboard', { 
      state: { 
        projectName: state.projectName, 
        selectedAgents: state.selectedAgents,
        responses: state.responses
      } 
    })
  }

  const isQuestionStep = state.currentStep < questions.length
  const isProjectStep = state.currentStep === questions.length
  const isAgentSelectionStep = state.currentStep === questions.length + 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Agent Team Builder</h1>
          <p className="text-purple-200">Build your custom AI agent ecosystem</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-purple-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-purple-300 text-sm mt-2 text-center">
            Step {state.currentStep + 1} of {questions.length + 2}
          </p>
        </div>

        {/* Question Card */}
        {isQuestionStep && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={state.responses[currentQuestion.id] || ''}
            onAnswer={handleAnswer}
          />
        )}

        {/* Project Name Step */}
        {isProjectStep && (
          <div className="bg-slate-800 rounded-2xl p-8 border border-purple-700">
            <h2 className="text-2xl font-semibold text-white mb-6">Name Your Project</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-purple-200 mb-2">Project Name</label>
                <input
                  type="text"
                  value={state.projectName}
                  onChange={(e) => setState(prev => ({ ...prev, projectName: e.target.value }))}
                  placeholder="My AI Agent Team"
                  className="w-full px-4 py-3 bg-slate-700 border border-purple-600 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-purple-200 mb-2">Description (optional)</label>
                <textarea
                  value={state.projectDescription}
                  onChange={(e) => setState(prev => ({ ...prev, projectDescription: e.target.value }))}
                  placeholder="Describe your project goals..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700 border border-purple-600 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Agent Selection Step */}
        {isAgentSelectionStep && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-purple-700">
              <h2 className="text-2xl font-semibold text-white mb-2">Select Your Agents</h2>
              <p className="text-purple-200 mb-6">Choose the agents that best fit your needs ({state.selectedAgents.length} selected)</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {agents.map(agent => (
                  <AgentPreview
                    key={agent.id}
                    agent={agent}
                    selected={state.selectedAgents.includes(agent.id)}
                    onToggle={() => handleAgentToggle(agent.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={state.currentStep === 0}
            className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>

          {isQuestionStep && (
            <button
              onClick={handleNext}
              disabled={!state.responses[currentQuestion?.id]}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue
            </button>
          )}

          {isProjectStep && (
            <button
              onClick={handleProjectSubmit}
              disabled={!state.projectName.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue
            </button>
          )}

          {isAgentSelectionStep && (
            <button
              onClick={handleContinueToPayment}
              disabled={state.selectedAgents.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue to Payment
            </button>
          )}
        </div>

        {/* Payment Modal */}
        {showPayment && (
          <PaymentModal
            amount={99}
            currency="USD"
            onClose={() => setShowPayment(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  )
}
