import { Agent } from '../types'

export const agents: Agent[] = [
  // Development Agents (10)
  {
    id: 'dev-1',
    name: 'Code Architect',
    description: 'Designs system architecture and makes high-level technical decisions',
    category: 'development',
    capabilities: ['System Design', 'Code Review', 'Architecture Patterns'],
    icon: '🏗️',
    color: '#3B82F6'
  },
  {
    id: 'dev-2',
    name: 'Backend Engineer',
    description: 'Builds robust APIs, databases, and server-side logic',
    category: 'development',
    capabilities: ['API Development', 'Database Design', 'Authentication'],
    icon: '⚙️',
    color: '#6366F1'
  },
  {
    id: 'dev-3',
    name: 'Frontend Developer',
    description: 'Creates responsive, interactive user interfaces',
    category: 'development',
    capabilities: ['UI Development', 'Component Design', 'State Management'],
    icon: '🎨',
    color: '#8B5CF6'
  },
  {
    id: 'dev-4',
    name: 'DevOps Engineer',
    description: 'Manages CI/CD pipelines, deployments, and infrastructure',
    category: 'development',
    capabilities: ['CI/CD', 'Docker', 'Cloud Infrastructure'],
    icon: '🚀',
    color: '#14B8A6'
  },
  {
    id: 'dev-5',
    name: 'QA Engineer',
    description: 'Writes tests, identifies bugs, ensures code quality',
    category: 'development',
    capabilities: ['Test Writing', 'Bug Detection', 'Quality Assurance'],
    icon: '🧪',
    color: '#F59E0B'
  },
  {
    id: 'dev-6',
    name: 'Security Analyst',
    description: 'Identifies vulnerabilities and implements security measures',
    category: 'development',
    capabilities: ['Security Audits', 'Vulnerability Assessment', 'Code Scanning'],
    icon: '🔒',
    color: '#EF4444'
  },
  {
    id: 'dev-7',
    name: 'Database Administrator',
    description: 'Optimizes queries, manages schemas, ensures data integrity',
    category: 'development',
    capabilities: ['Query Optimization', 'Schema Design', 'Data Migration'],
    icon: '🗄️',
    color: '#0EA5E9'
  },
  {
    id: 'dev-8',
    name: 'Mobile Developer',
    description: 'Builds native and cross-platform mobile applications',
    category: 'development',
    capabilities: ['iOS Development', 'Android Development', 'React Native'],
    icon: '📱',
    color: '#10B981'
  },
  {
    id: 'dev-9',
    name: 'API Integrator',
    description: 'Connects third-party services and manages webhooks',
    category: 'development',
    capabilities: ['API Integration', 'Webhook Management', 'Third-party Apps'],
    icon: '🔌',
    color: '#F97316'
  },
  {
    id: 'dev-10',
    name: 'Technical Writer',
    description: 'Creates documentation, API references, and guides',
    category: 'development',
    capabilities: ['Documentation', 'API Docs', 'Code Comments'],
    icon: '📝',
    color: '#6B7280'
  },

  // Design Agents (7)
  {
    id: 'design-1',
    name: 'UI Designer',
    description: 'Creates beautiful, intuitive user interfaces',
    category: 'design',
    capabilities: ['Visual Design', 'Prototyping', 'Design Systems'],
    icon: '✏️',
    color: '#EC4899'
  },
  {
    id: 'design-2',
    name: 'UX Researcher',
    description: 'Conducts user research and improves user experience',
    category: 'design',
    capabilities: ['User Research', 'Usability Testing', 'Persona Creation'],
    icon: '🔍',
    color: '#8B5CF6'
  },
  {
    id: 'design-3',
    name: 'Brand Designer',
    description: 'Develops brand identity, logos, and visual guidelines',
    category: 'design',
    capabilities: ['Logo Design', 'Brand Identity', 'Visual Guidelines'],
    icon: '🎯',
    color: '#F59E0B'
  },
  {
    id: 'design-4',
    name: 'Motion Designer',
    description: 'Creates animations, transitions, and micro-interactions',
    category: 'design',
    capabilities: ['Animations', 'Transitions', 'Motion Graphics'],
    icon: '🎬',
    color: '#14B8A6'
  },
  {
    id: 'design-5',
    name: 'Icon Designer',
    description: 'Designs consistent iconography and symbol systems',
    category: 'design',
    capabilities: ['Icon Design', 'Symbol Creation', 'Icon Sets'],
    icon: '⬡',
    color: '#6366F1'
  },
  {
    id: 'design-6',
    name: 'Illustration Artist',
    description: 'Creates custom illustrations and visual assets',
    category: 'design',
    capabilities: ['Custom Illustration', 'Visual Assets', 'Art Direction'],
    icon: '🖼️',
    color: '#10B981'
  },
  {
    id: 'design-7',
    name: 'Accessibility Expert',
    description: 'Ensures designs meet WCAG and accessibility standards',
    category: 'design',
    capabilities: ['WCAG Compliance', 'A11y Audits', 'Screen Reader Testing'],
    icon: '♿',
    color: '#0EA5E9'
  },

  // Marketing Agents (7)
  {
    id: 'marketing-1',
    name: 'SEO Specialist',
    description: 'Optimizes content for search engines and improves rankings',
    category: 'marketing',
    capabilities: ['Keyword Research', 'On-page SEO', 'Technical SEO'],
    icon: '🔎',
    color: '#22C55E'
  },
  {
    id: 'marketing-2',
    name: 'Content Strategist',
    description: 'Plans content calendars and develops content strategies',
    category: 'marketing',
    capabilities: ['Content Planning', 'Editorial Strategy', 'Topic Research'],
    icon: '📅',
    color: '#3B82F6'
  },
  {
    id: 'marketing-3',
    name: 'Social Media Manager',
    description: 'Manages social presence and engages with audiences',
    category: 'marketing',
    capabilities: ['Post Scheduling', 'Community Management', 'Trend Analysis'],
    icon: '📢',
    color: '#F97316'
  },
  {
    id: 'marketing-4',
    name: 'Email Marketer',
    description: 'Creates email campaigns and nurtures leads',
    category: 'marketing',
    capabilities: ['Campaign Design', 'A/B Testing', 'Automation'],
    icon: '✉️',
    color: '#6366F1'
  },
  {
    id: 'marketing-5',
    name: 'PPC Specialist',
    description: 'Manages paid advertising campaigns across platforms',
    category: 'marketing',
    capabilities: ['Ad Campaign Management', 'Budget Optimization', 'Conversion Tracking'],
    icon: '💰',
    color: '#14B8A6'
  },
  {
    id: 'marketing-6',
    name: 'Influencer Manager',
    description: 'Identifies and manages influencer partnerships',
    category: 'marketing',
    capabilities: ['Influencer Outreach', 'Partnership Management', 'Campaign Coordination'],
    icon: '⭐',
    color: '#EC4899'
  },
  {
    id: 'marketing-7',
    name: 'Analytics Manager',
    description: 'Tracks marketing performance and provides insights',
    category: 'marketing',
    capabilities: ['Performance Tracking', 'Reporting', 'Data Analysis'],
    icon: '📊',
    color: '#8B5CF6'
  },

  // Sales Agents (6)
  {
    id: 'sales-1',
    name: 'Sales Development Rep',
    description: 'Generates leads and qualifies prospects',
    category: 'sales',
    capabilities: ['Lead Generation', 'Prospect Qualification', 'Cold Outreach'],
    icon: '🤝',
    color: '#10B981'
  },
  {
    id: 'sales-2',
    name: 'Account Executive',
    description: 'Closes deals and manages customer relationships',
    category: 'sales',
    capabilities: ['Deal Closing', 'Negotiation', 'Relationship Management'],
    icon: '💼',
    color: '#3B82F6'
  },
  {
    id: 'sales-3',
    name: 'Customer Success Manager',
    description: 'Ensures customer satisfaction and retention',
    category: 'sales',
    capabilities: ['Onboarding', 'Retention', 'Upselling'],
    icon: '🌟',
    color: '#F59E0B'
  },
  {
    id: 'sales-4',
    name: 'Sales Analyst',
    description: 'Analyzes sales data and forecasts revenue',
    category: 'sales',
    capabilities: ['Sales Forecasting', 'Pipeline Analysis', 'Revenue Tracking'],
    icon: '📈',
    color: '#6366F1'
  },
  {
    id: 'sales-5',
    name: 'Partnership Manager',
    description: 'Develops strategic partnerships and business alliances',
    category: 'sales',
    capabilities: ['Partnership Development', 'Deal Structuring', 'Strategic Planning'],
    icon: '🤝',
    color: '#EC4899'
  },
  {
    id: 'sales-6',
    name: 'RevOps Specialist',
    description: 'Optimizes revenue operations and sales processes',
    category: 'sales',
    capabilities: ['Process Optimization', 'Tool Implementation', 'Sales Enablement'],
    icon: '⚡',
    color: '#14B8A6'
  },

  // Support Agents (5)
  {
    id: 'support-1',
    name: 'Support Specialist',
    description: 'Resolves customer issues and provides assistance',
    category: 'support',
    capabilities: ['Ticket Resolution', 'Customer Communication', 'Troubleshooting'],
    icon: '🎧',
    color: '#0EA5E9'
  },
  {
    id: 'support-2',
    name: 'Technical Support Engineer',
    description: 'Handles complex technical issues and escalations',
    category: 'support',
    capabilities: ['Technical Troubleshooting', 'Escalation Management', 'Root Cause Analysis'],
    icon: '🔧',
    color: '#8B5CF6'
  },
  {
    id: 'support-3',
    name: 'Knowledge Base Manager',
    description: 'Creates and maintains self-service documentation',
    category: 'support',
    capabilities: ['Documentation', 'Article Writing', 'Knowledge Management'],
    icon: '📚',
    color: '#22C55E'
  },
  {
    id: 'support-4',
    name: 'Chatbot Trainer',
    description: 'Trains and improves AI support bots',
    category: 'support',
    capabilities: ['Bot Training', 'Intent Classification', 'Response Optimization'],
    icon: '🤖',
    color: '#F97316'
  },
  {
    id: 'support-5',
    name: 'Community Manager',
    description: 'Manages community forums and user discussions',
    category: 'support',
    capabilities: ['Community Engagement', 'Forum Moderation', 'User Events'],
    icon: '🌐',
    color: '#EC4899'
  },

  // Analytics Agents (5)
  {
    id: 'analytics-1',
    name: 'Data Analyst',
    description: 'Analyzes data and generates actionable insights',
    category: 'analytics',
    capabilities: ['Data Analysis', 'Statistical Modeling', 'Reporting'],
    icon: '🔢',
    color: '#3B82F6'
  },
  {
    id: 'analytics-2',
    name: 'Business Intelligence Developer',
    description: 'Builds dashboards and visualizes business metrics',
    category: 'analytics',
    capabilities: ['Dashboard Creation', 'ETL Pipelines', 'Data Warehousing'],
    icon: '📊',
    color: '#14B8A6'
  },
  {
    id: 'analytics-3',
    name: 'Product Analyst',
    description: 'Analyzes product usage and drives product decisions',
    category: 'analytics',
    capabilities: ['Product Metrics', 'User Behavior Analysis', 'Feature Analysis'],
    icon: '📦',
    color: '#8B5CF6'
  },
  {
    id: 'analytics-4',
    name: 'Growth Analyst',
    description: 'Identifies growth opportunities and experiments',
    category: 'analytics',
    capabilities: ['A/B Testing', 'Cohort Analysis', 'Growth Hacking'],
    icon: '📈',
    color: '#10B981'
  },
  {
    id: 'analytics-5',
    name: 'Data Engineer',
    description: 'Builds and maintains data infrastructure',
    category: 'analytics',
    capabilities: ['Data Pipelines', 'Data Quality', 'Infrastructure'],
    icon: '⚙️',
    color: '#6366F1'
  },

  // Content Agents (6)
  {
    id: 'content-1',
    name: 'Copywriter',
    description: 'Writes compelling marketing and product copy',
    category: 'content',
    capabilities: ['Ad Copy', 'Landing Page Copy', 'Product Descriptions'],
    icon: '✍️',
    color: '#F59E0B'
  },
  {
    id: 'content-2',
    name: 'Technical Content Writer',
    description: 'Creates technical articles and in-depth guides',
    category: 'content',
    capabilities: ['Technical Writing', 'Tutorials', 'How-to Guides'],
    icon: '📖',
    color: '#0EA5E9'
  },
  {
    id: 'content-3',
    name: 'Blog Writer',
    description: 'Produces engaging blog posts and articles',
    category: 'content',
    capabilities: ['Blog Posts', 'SEO Content', 'Thought Leadership'],
    icon: '📝',
    color: '#22C55E'
  },
  {
    id: 'content-4',
    name: 'Video Script Writer',
    description: 'Writes scripts for videos and presentations',
    category: 'content',
    capabilities: ['Video Scripts', 'Presentations', 'Storyboarding'],
    icon: '🎥',
    color: '#EC4899'
  },
  {
    id: 'content-5',
    name: 'Podcaster',
    description: 'Creates podcast content and show notes',
    category: 'content',
    capabilities: ['Podcast Scripts', 'Show Notes', 'Interview Preparation'],
    icon: '🎙️',
    color: '#F97316'
  },
  {
    id: 'content-6',
    name: 'PR Writer',
    description: 'Creates press releases and media communications',
    category: 'content',
    capabilities: ['Press Releases', 'Media Kits', 'Communications'],
    icon: '📰',
    color: '#6366F1'
  },

  // Operations Agents (5)
  {
    id: 'ops-1',
    name: 'Project Manager',
    description: 'Manages projects, timelines, and resources',
    category: 'operations',
    capabilities: ['Project Planning', 'Resource Allocation', 'Risk Management'],
    icon: '📋',
    color: '#3B82F6'
  },
  {
    id: 'ops-2',
    name: 'Scrum Master',
    description: 'Facilitates agile processes and ceremonies',
    category: 'operations',
    capabilities: ['Agile Facilitation', 'Sprint Planning', 'Retrospectives'],
    icon: '🏃',
    color: '#14B8A6'
  },
  {
    id: 'ops-3',
    name: 'Operations Manager',
    description: 'Optimizes business processes and workflows',
    category: 'operations',
    capabilities: ['Process Optimization', 'Workflow Design', 'Efficiency Improvement'],
    icon: '⚙️',
    color: '#6B7280'
  },
  {
    id: 'ops-4',
    name: 'Vendor Manager',
    description: 'Manages vendor relationships and contracts',
    category: 'operations',
    capabilities: ['Vendor Relations', 'Contract Management', 'SLA Monitoring'],
    icon: '🤝',
    color: '#8B5CF6'
  },
  {
    id: 'ops-5',
    name: 'Compliance Officer',
    description: 'Ensures regulatory compliance and risk management',
    category: 'operations',
    capabilities: ['Regulatory Compliance', 'Audit Support', 'Policy Development'],
    icon: '✅',
    color: '#10B981'
  },

  // Finance Agents (5)
  {
    id: 'finance-1',
    name: 'Financial Analyst',
    description: 'Analyzes financial data and creates forecasts',
    category: 'finance',
    capabilities: ['Financial Modeling', 'Forecasting', 'Budget Analysis'],
    icon: '💹',
    color: '#22C55E'
  },
  {
    id: 'finance-2',
    name: 'Bookkeeper',
    description: 'Maintains financial records and transactions',
    category: 'finance',
    capabilities: ['Record Keeping', 'Reconciliation', 'Invoice Processing'],
    icon: '📒',
    color: '#3B82F6'
  },
  {
    id: 'finance-3',
    name: 'Payroll Specialist',
    description: 'Manages employee compensation and payroll',
    category: 'finance',
    capabilities: ['Payroll Processing', 'Tax Compliance', 'Benefits Administration'],
    icon: '💵',
    color: '#F59E0B'
  },
  {
    id: 'finance-4',
    name: 'Accounts Receivable',
    description: 'Manages incoming payments and collections',
    category: 'finance',
    capabilities: ['Invoice Management', 'Collections', 'Payment Tracking'],
    icon: '📥',
    color: '#14B8A6'
  },
  {
    id: 'finance-5',
    name: 'Accounts Payable',
    description: 'Manages outgoing payments and vendor invoices',
    category: 'finance',
    capabilities: ['Invoice Processing', 'Payment Scheduling', 'Vendor Relations'],
    icon: '📤',
    color: '#6366F1'
  },

  // HR Agents (7)
  {
    id: 'hr-1',
    name: 'Recruiter',
    description: 'Sources candidates and manages hiring process',
    category: 'hr',
    capabilities: ['Candidate Sourcing', 'Interview Scheduling', 'Offer Management'],
    icon: '👥',
    color: '#EC4899'
  },
  {
    id: 'hr-2',
    name: 'HR Business Partner',
    description: 'Strategic HR support for business objectives',
    category: 'hr',
    capabilities: ['Employee Relations', 'Performance Management', 'Org Development'],
    icon: '💼',
    color: '#8B5CF6'
  },
  {
    id: 'hr-3',
    name: 'Training Coordinator',
    description: 'Plans and coordinates employee training programs',
    category: 'hr',
    capabilities: ['Training Planning', 'LMS Management', 'Workshop Facilitation'],
    icon: '📚',
    color: '#14B8A6'
  },
  {
    id: 'hr-4',
    name: 'Benefits Administrator',
    description: 'Manages employee benefits and compensation packages',
    category: 'hr',
    capabilities: ['Benefits Management', 'Enrollment', 'Compliance'],
    icon: '🎁',
    color: '#F97316'
  },
  {
    id: 'hr-5',
    name: 'Employee Experience Manager',
    description: 'Improves workplace culture and employee satisfaction',
    category: 'hr',
    capabilities: ['Culture Building', 'Engagement Programs', 'Onboarding'],
    icon: '🌸',
    color: '#F59E0B'
  },
  {
    id: 'hr-6',
    name: 'Compensation Analyst',
    description: 'Analyzes and structures employee compensation',
    category: 'hr',
    capabilities: ['Salary Benchmarking', 'Pay Equity', 'Incentive Design'],
    icon: '⚖️',
    color: '#10B981'
  },
  {
    id: 'hr-7',
    name: 'Onboarding Specialist',
    description: 'Manages new hire onboarding and integration',
    category: 'hr',
    capabilities: ['Onboarding Process', 'Paperwork', 'New Hire Training'],
    icon: '👋',
    color: '#0EA5E9'
  }
]

export const getAgentsByCategory = (category: string): Agent[] => {
  return agents.filter(agent => agent.category === category)
}

export const getAgentById = (id: string): Agent | undefined => {
  return agents.find(agent => agent.id === id)
}
