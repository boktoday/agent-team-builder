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
            <div className="flex items-center gap-3">
              <Link
                to="/settings"
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2"
              >
                ⚙️ Settings
              </Link>
              <Link
                to="/onboarding"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
                className="text-2xl font-bold bg-transparent text-white border-b border-transparent hover:border-slate-600 focus:border-indigo-500 focus outline-none w-full"
              />
              <p className="text-slate-400 mt-2">
                {selectedAgents.length} agents selected • {categories.length} categories
              </p>
            </div>
            <ExportButton projectName={projectName} agents={selectedAgentData} />
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Your Agent Team</h2>
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`px-4 py-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              ▦ Grid
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${view === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              ☰ List
            </button>
          </div>
        </div>

        {/* Agents Grid/List */}
        {selectedAgents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-white mb-2">No agents yet</h3>
            <p className="text-slate-400 mb-6">Start building your agent team</p>
            <Link
              to="/onboarding"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Building
            </Link>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedAgentData.map((agent) => (
              <AgentPreview key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {selectedAgentData.map((agent) => (
              <div key={agent.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{agent.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white">{agent.name}</h3>
                    <p className="text-slate-400 text-sm">{agent.description}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                  {agent.category}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Add More */}
        {selectedAgents.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
            >
              + Add More Agents
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
