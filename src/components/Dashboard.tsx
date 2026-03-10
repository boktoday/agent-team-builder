import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AgentPreview from './AgentPreview'
import ExportButton from './ExportButton'
import { agents, getAgentById } from '../data/agents'

interface DashboardState {
  projectName?: string
  selectedAgents?: string[]
  responses?: Record<string, string>
}

export default function Dashboard() {
  const location = useLocation()
  const state = location.state as DashboardState | null
  const [projectName, setProjectName] = useState(state?.projectName || 'My Agent Team')
  const [selectedAgents, setSelectedAgents] = useState<string[]>(state?.selectedAgents || [])
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const selectedAgentData = selectedAgents.map(id => getAgentById(id)).filter(Boolean)

  const categories = [...new Set(agents.map(a => a.category))]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">🤖 Agent Team Builder</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/onboarding"
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                + New Project
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Info */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="text-3xl font-bold text-white bg-transparent border-none focus:outline-none focus:ring-0 w-full"
              />
              <p className="text-slate-400 mt-2">
                {selectedAgents.length} agents configured • Last updated today
              </p>
            </div>
            <ExportButton selectedAgents={selectedAgents} projectName={projectName} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.slice(0, 4).map((cat, idx) => {
            const count = agents.filter(a => a.category === cat).length
            return (
              <div key={cat} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm capitalize">{cat}</p>
                <p className="text-2xl font-bold text-white">{count}</p>
              </div>
            )
          })}
        </div>

        {/* Selected Agents */}
        {selectedAgents.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Your Active Agents</h2>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setView('grid')}
                className={`px-4 py-2 rounded-lg ${view === 'grid' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg ${view === 'list' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300'}`}
              >
                List
              </button>
            </div>
            <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
              {selectedAgentData.map((agent) => (
                agent && (
                  <div key={agent.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-start gap-3">
                      <span 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${agent.color}20` }}
                      >
                        {agent.icon}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{agent.name}</h3>
                        <p className="text-slate-400 text-sm">{agent.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {agent.capabilities.map((cap, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-0.5 rounded-full text-xs"
                              style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-white mb-2">No agents selected yet</h2>
            <p className="text-slate-400 mb-6">Start building your agent team</p>
            <Link
              to="/onboarding"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold"
            >
              Start Onboarding
            </Link>
          </div>
        )}

        {/* Browse All Agents */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Browse All Agents ({agents.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {agents.map(agent => (
              <AgentPreview
                key={agent.id}
                agent={agent}
                selected={selectedAgents.includes(agent.id)}
                onToggle={() => {
                  setSelectedAgents(prev => 
                    prev.includes(agent.id)
                      ? prev.filter(id => id !== agent.id)
                      : [...prev, agent.id]
                  )
                }}
                compact
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
