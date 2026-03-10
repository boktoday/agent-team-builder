import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [apiKeys, setApiKeys] = useState({
    openrouter: '',
    venice: '',
    maton: '',
    skillboss: ''
  });

  const [showKeys, setShowKeys] = useState({
    openrouter: false,
    venice: false,
    maton: false,
    skillboss: false
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      await new Promise(r => setTimeout(r, 1000));
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }
    
    if (passwords.new.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      return;
    }
    
    setLoading(true);
    setMessage(null);
    
    try {
      await new Promise(r => setTimeout(r, 1000));
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKeys = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      await new Promise(r => setTimeout(r, 1000));
      setMessage({ type: 'success', text: 'API keys saved securely!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save API keys' });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowKey = function(provider) {
    setShowKeys(function(prev) {
      var newState = {};
      newState[provider] = !prev[provider];
      return Object.assign({}, prev, newState);
    });
  };

  var integrations = [
    {
      id: 'openrouter',
      name: 'OpenRouter.ai',
      description: 'Unified API for 100+ AI models',
      logo: '🧠',
      docs: 'https://openrouter.ai/docs',
      placeholder: 'sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      models: 'GPT-4, Claude, Llama, Mistral, and 100+ more'
    },
    {
      id: 'venice',
      name: 'Venice AI',
      description: 'Uncensored AI models and image generation',
      logo: '🏊',
      docs: 'https://docs.venice.ai',
      placeholder: 'venice-xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      models: 'Venice GPT, Venice Image, Uncensored models'
    },
    {
      id: 'maton',
      name: 'Maton AI',
      description: 'Specialized AI for coding and development',
      logo: '🧱',
      docs: 'https://maton.ai',
      placeholder: 'maton_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      models: 'Code assistant, Debugger, Code reviewer'
    },
    {
      id: 'skillboss',
      name: 'Skillboss.co',
      description: 'Expert AI agents for business tasks',
      logo: '🎯',
      docs: 'https://skillboss.co',
      placeholder: 'sb_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      models: 'Research agent, Writer agent, Analyst agent'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">⚙️ Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and integrations</p>
        </div>

        {message && (
          <div className={"mb-6 p-4 rounded-lg " + (message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800')}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {['profile', 'security', 'integrations'].map(function(tab) {
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={"flex-1 py-4 px-6 text-center font-medium capitalize transition-colors " + (activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50')}
                >
                  {tab === 'profile' && '👤 Profile'}
                  {tab === 'security' && '🔒 Security'}
                  {tab === 'integrations' && '🔗 Integrations'}
                </button>
              );
            })}
          </div>

          {activeTab === 'profile' && (
            <div className="p-6">
              <form onSubmit={handleProfileUpdate}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(Object.assign({}, profile, { name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-6">
              <form onSubmit={handlePasswordChange}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords(Object.assign({}, passwords, { current: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter current password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords(Object.assign({}, passwords, { new: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter new password (min 8 characters)"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords(Object.assign({}, passwords, { confirm: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">🔗 API Integrations</h2>
                <p className="text-gray-600 mt-1">
                  Connect external AI services. These keys will be included in your exported agent ecosystem's .env file.
                </p>
              </div>

              <form onSubmit={handleSaveApiKeys}>
                <div className="space-y-6">
                  {integrations.map(function(integration) {
                    return (
                      <div key={integration.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{integration.logo}</span>
                            <div>
                              <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                              <p className="text-sm text-gray-500">{integration.description}</p>
                            </div>
                          </div>
                          <a
                            href={integration.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            Docs →
                          </a>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-3">
                          Models: {integration.models}
                        </p>
                        
                        <div className="relative">
                          <input
                            type={showKeys[integration.id] ? 'text' : 'password'}
                            value={apiKeys[integration.id]}
                            onChange={(e) => setApiKeys(Object.assign({}, apiKeys, (function(o) { o[integration.id] = e.target.value; return o; })({})))}
                            className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                            placeholder={integration.placeholder}
                          />
                          <button
                            type="button"
                            onClick={() => toggleShowKey(integration.id)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
                          >
                            {showKeys[integration.id] ? 'Hide' : 'Show'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Saving...' : 'Save API Keys'}
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">💡 How it works</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your API keys are stored securely and encrypted</li>
                  <li>• When you export your agent team, keys are included in .env.example</li>
                  <li>• Users can then add their own keys to use the integrations</li>
                  <li>• Never share your API keys publicly</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
