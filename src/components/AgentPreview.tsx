import { Agent } from '../types'

interface AgentPreviewProps {
  agent: Agent
  selected: boolean
  onToggle: () => void
  compact?: boolean
}

export default function AgentPreview({ agent, selected, onToggle, compact = false }: AgentPreviewProps) {
  if (compact) {
    return (
      <div 
        onClick={onToggle}
        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3 ${
          selected
            ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2'
            : 'bg-slate-700/30 border border-slate-600 hover:border-slate-500'
        }`}
        style={{ borderColor: selected ? agent.color : undefined }}
      >
        <span 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
          style={{ backgroundColor: `${agent.color}20` }}
        >
          {agent.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate">{agent.name}</h4>
          <p className="text-purple-300 text-xs truncate">{agent.category}</p>
        </div>
        {selected && (
          <span className="text-green-400">✓</span>
        )}
      </div>
    )
  }

  return (
    <div 
      onClick={onToggle}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        selected
          ? 'bg-slate-700/50 border-2 shadow-lg'
          : 'bg-slate-700/20 border border-slate-600 hover:border-slate-500'
      }`}
      style={{ borderColor: selected ? agent.color : undefined }}
    >
      <div className="flex items-start gap-3">
        <span 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ backgroundColor: `${agent.color}20` }}
        >
          {agent.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold mb-1">{agent.name}</h4>
          <p className="text-slate-400 text-sm mb-2 line-clamp-2">{agent.description}</p>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.slice(0, 2).map((cap, idx) => (
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
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
          selected ? 'border-green-500 bg-green-500' : 'border-slate-500'
        }`}>
          {selected && <span className="text-white text-xs">✓</span>}
        </div>
      </div>
    </div>
  )
}
