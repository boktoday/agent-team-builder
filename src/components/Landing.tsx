import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: '🤖',
      title: 'Build Your Dream Team',
      description: 'Answer simple questions about your business and we\'ll recommend the perfect AI agent组合.'
    },
    {
      icon: '⚡',
      title: '68+ Pre-Built Agents',
      description: 'From AI engineers to content creators, marketing specialists to security experts.'
    },
    {
      icon: '🔗',
      title: 'Your Tools, Your Choice',
      description: 'Connect OpenRouter, Venice AI, Maton AI, or Skillboss. Bring your own API keys.'
    },
    {
      icon: '📦',
      title: 'Export to GitHub',
      description: 'Get a complete, runnable agent ecosystem ready to customize and deploy.'
    },
    {
      icon: '💰',
      title: 'One-Time Payment',
      description: 'Pay $99 once, own your agent team forever. No monthly subscriptions.'
    },
    {
      icon: '🛡️',
      title: 'Secure & Private',
      description: 'Your data stays yours. API keys are encrypted and never shared.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Tell Us About Your Business',
      description: 'Answer 8 simple questions about your industry, team size, and goals.'
    },
    {
      number: '2',
      title: 'Get AI Recommendations',
      description: 'Our engine suggests the perfect agents based on your unique needs.'
    },
    {
      number: '3',
      title: 'Customize Your Team',
      description: 'Add or remove agents, adjust configurations to your preferences.'
    },
    {
      number: '4',
      title: 'Pay & Export',
      description: 'One $99 payment, then download your complete agent ecosystem.'
    }
  ];

  const pricingFeatures = [
    '68+ pre-built AI agents',
    'Business analysis & recommendations',
    'Customizable agent configurations',
    'GitHub export',
    '.env template with 4+ integrations',
    'CLAUDE.md for AI collaboration',
    'Unlimited projects',
    '30-day trial'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold text-white">Agent Team Builder</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                About
              </Link>
              <Link
                to="/onboarding"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Build Your Custom
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {' '}AI Agent Team
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Answer a few questions about your business and get a complete, 
            customized AI agent ecosystem exported to your GitHub. 
            One payment. Forever yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/onboarding"
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Start Building Free →
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white/10 text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-colors"
            >
              Learn More
            </Link>
          </div>
          <p className="mt-4 text-slate-400 text-sm">
            ✨ No credit card required • 30-day free trial
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Everything You Need
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            A complete solution for building, customizing, and deploying AI agent teams
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            How It Works
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Four simple steps to your custom agent team
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Simple, One-Time Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Pay once, own your agent team forever
          </p>
          
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl shadow-indigo-500/25">
            <div className="text-center mb-8">
              <p className="text-indigo-200 mb-2">Complete Agent Ecosystem</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl md:text-6xl font-bold text-white">$99</span>
                <span className="text-xl text-indigo-200">one-time</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              {pricingFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <span className="text-green-400">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link
              to="/onboarding"
              className="block w-full py-4 bg-white text-indigo-600 text-center text-lg font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Start Building Now →
            </Link>
            
            <p className="text-center text-indigo-200 text-sm mt-4">
              30-day free trial • No credit card required to start
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Team?
          </h2>
          <p className="text-slate-400 mb-8">
            Join thousands of businesses already using AI agent teams
          </p>
          <Link
            to="/onboarding"
            className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <span className="text-slate-400">Agent Team Builder</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400 text-sm">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/about#faq" className="hover:text-white transition-colors">FAQ</Link>
            <span>© 2024 Agent Team Builder</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
