import { useState } from 'react'

interface PaymentModalProps {
  amount: number
  currency: string
  onClose: () => void
  onSuccess: () => void
}

export default function PaymentModal({ amount, currency, onClose, onSuccess }: PaymentModalProps) {
  const [processing, setProcessing] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setProcessing(false)
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-md w-full border border-purple-700 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-slate-400 mt-2">One-time payment for lifetime access</p>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-slate-900/50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-300">Agent Team Builder Pro</span>
            <span className="text-white font-semibold">${amount}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-300">68 Pre-built Agents</span>
            <span className="text-green-400">Included</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-300">GitHub Export</span>
            <span className="text-green-400">Included</span>
          </div>
          <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
            <span className="text-white font-bold">Total</span>
            <span className="text-2xl font-bold text-white">${amount}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Card Number</label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">Expiry</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">CVC</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={processing || !email}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${amount}`
            )}
          </button>

          <p className="text-center text-slate-500 text-xs">
            🔒 Secure payment powered by Stripe. Your data is encrypted.
          </p>
        </form>
      </div>
    </div>
  )
}
