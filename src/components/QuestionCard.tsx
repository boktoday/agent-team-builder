import { Question } from '../types'

interface QuestionCardProps {
  question: Question
  selectedAnswer: string
  onAnswer: (answer: string) => void
}

export default function QuestionCard({ question, selectedAnswer, onAnswer }: QuestionCardProps) {
  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-purple-700 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-sm rounded-full">
          {question.category}
        </span>
        {question.required && (
          <span className="text-red-400 text-sm">* Required</span>
        )}
      </div>
      
      <h2 className="text-2xl font-semibold text-white mb-6">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
              selectedAnswer === option
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-[1.02]'
                : 'bg-slate-700/50 text-slate-200 hover:bg-slate-700 hover:scale-[1.01] border border-slate-600'
            }`}
          >
            <span className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === option
                  ? 'border-white bg-white/20'
                  : 'border-slate-500'
              }`}>
                {selectedAnswer === option && (
                  <span className="w-3 h-3 rounded-full bg-white" />
                )}
              </span>
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
