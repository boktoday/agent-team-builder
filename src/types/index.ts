// SQLite-ready type definitions for Agent Team Builder

export interface Agent {
  id: string
  name: string
  description: string
  category: AgentCategory
  capabilities: string[]
  icon: string
  color: string
}

export type AgentCategory = 
  | 'development'
  | 'design'
  | 'marketing'
  | 'sales'
  | 'support'
  | 'analytics'
  | 'content'
  | 'operations'
  | 'finance'
  | 'hr'

export interface UserProject {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface ProjectAgent {
  id: string
  projectId: string
  agentId: string
  configuration: Record<string, unknown>
  enabled: boolean
  order: number
}

export interface UserResponse {
  id: string
  projectId: string
  questionId: string
  answer: string
  answeredAt: string
}

export interface Question {
  id: string
  text: string
  category: string
  options?: string[]
  required: boolean
  order: number
}

export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  stripePaymentId?: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  githubToken?: string
  createdAt: string
  hasPaid: boolean
}

export interface OnboardingState {
  currentStep: number
  responses: Record<string, string>
  selectedAgents: string[]
  projectName: string
  projectDescription: string
}
