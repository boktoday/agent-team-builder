import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is Agent Team Builder?',
      answer: 'Agent Team Builder is a SaaS platform that helps you create custom AI agent ecosystems for your business. Answer questions about your business, and we recommend the perfect combination of AI agents. Export to GitHub and start using them immediately.'
    },
    {
      question: 'How does the 30-day trial work?',
      answer: 'When you sign up, you get 30 days of free access to explore the platform, build your agent team, and customize your selection. You only pay $99 when you\'re ready to export.'
    },
    {
      question: 'What do I get when I pay $99?',
      answer: 'Your payment unlocks the ability to export your custom agent ecosystem to GitHub. This includes: 68+ agent configurations, .env template with API integrations, CLAUDE.md for AI collaboration, README with setup instructions, and complete Python project structure.'
    },
    {
      question: 'Do I need coding skills?',
      answer: 'Not at all! Our intuitive questionnaire guides you through the process. The exported code is ready to run. However, if you want to customize or extend your agents, basic Python knowledge helps.'
    },
    {
      question: 'Which AI providers can I use?',
      answer: 'You can connect any of these: OpenRouter.ai (100+ models), Venice AI (uncensored), Mason AI (coding), Skillboss (business agents), OpenAI, and Anthropic Claude. Bring your own API keys.'
    },
    {
      question: 'Is there a monthly subscription?',
      answer: 'No! It\'s a one-time $99 payment. Your exported agents are yours forever. No monthly fees, ever.'
    },
    {
      question: 'Can I create multiple projects?',
      answer: 'Yes! You can create unlimited projects during your trial. Each can have different agent combinations for different use cases.'
    },
    {
      question: 'What if I need help?',
      answer: 'Check our FAQ above, or reach out to support. The exported agents include documentation to help you get started.'
    },
    {
      question: 'Can I modify the exported agents?',
      answer: 'Absolutely! The exported code is yours. Modify prompts, add capabilities, integrate with your existing systems—whatever you need.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Your data is encrypted and never shared. API keys you provide are stored securely. When you export, only you receive your agent ecosystem.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold text-white">Agent Team Builder</span>
            </Link>
            <div className="flex items-center gap-4">
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Agent Team Builder
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Build custom AI agent ecosystems in minutes, export forever.
          </p>
        </div>
      </section>

      {/* What Is It */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">What is Agent Team Builder?</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-lg mb-6">
              Agent Team Builder is a revolutionary platform that helps businesses create 
              custom AI agent ecosystems without needing to hire a team of AI specialists.
            </p>
            <p className="text-slate-300 mb-6">
              Instead of starting from scratch or piecing together random AI tools, 
              you answer simple questions about your business—your industry, team size, 
              goals, and challenges. Our intelligent recommendation engine analyzes your 
              responses and suggests the perfect combination of AI agents.
            </p>
            <p className="text-slate-300">
              Once you're happy with your selection, pay $99 once, and export your 
              complete agent ecosystem to GitHub. It's ready to run, customizable, 
              and forever yours.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['🤖', '68+ Pre-Built Agents', 'AI Engineer, Content Creator, Marketing Specialist, QA Tester, and many more'],
              ['🔗', '4+ AI Integrations', 'OpenRouter, Venice AI, Mason AI, Skillboss—bring your own keys'],
              ['📦', 'Complete Export', 'Python project with agents, prompts, config, and docs'],
              ['🧠', 'CLAUDE.md Included', 'Context file for AI collaboration in your exported repo'],
              ['🔐', 'Secure & Private', 'Your data encrypted, API keys never shared'],
              ['♾️', 'One-Time Payment', '$99 once, no monthly fees, forever yours']
            ].map(([icon, title, desc], i) => (
              <div key={i} className="flex gap-4 bg-slate-800/50 rounded-xl p-4 border border-white/10">
                <span className="text-3xl">{icon}</span>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="text-slate-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">How It Works</h2>
          <div className="space-y-6">
            {[
              ['1', 'Sign Up', 'Create your free account. No credit card required.'],
              ['2', 'Answer Questions', 'Tell us about your business, team, and goals.'],
              ['3', 'Get Recommendations', 'Our AI suggests the perfect agent combination.'],
              ['4', 'Customize', 'Add or remove agents, adjust configurations.'],
              ['5', 'Pay & Export', '$99 one-time payment, then export to GitHub.'],
              ['6', 'Deploy', 'Run your agent team locally or deploy to the cloud.']
            ].map(([num, title, desc], i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {num}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Pricing</h2>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <p className="text-indigo-200 mb-2">Complete Package</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-white">$99</span>
                <span className="text-xl text-indigo-200">one-time</span>
              </div>
            </div>
            <ul className="space-y-2 mb-6">
              {['68+ pre-built agents', 'Unlimited projects', 'GitHub export', 'All integrations', 'CLAUDE.md included', '30-day trial'].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-white">
                  <span className="text-green-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              to="/onboarding"
              className="block w-full py-3 bg-white text-indigo-600 text-center font-semibold rounded-xl hover:bg-indigo-50"
            >
              Start Building →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <span className="text-indigo-400 text-xl">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-slate-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build?</h2>
          <p className="text-slate-400 mb-8">
            Start your free trial today. No credit card required.
          </p>
          <Link
            to="/onboarding"
            className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700"
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
            <Link to="/" className="hover:text-white">Home</Link>
            <span>© 2024 Agent Team Builder</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
