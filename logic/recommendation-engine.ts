/**
 * Agent Team Builder - Recommendation Engine
 * 
 * Maps business attributes to recommended AI agents from the agency-ecosystem-v2
 */

import businessMapping from './business-mapping.json';

// ============================================
// Types & Interfaces
// ============================================

export type BusinessType = keyof typeof businessMapping.businessTypes;
export type TeamSize = keyof typeof businessMapping.teamSizes;
export type Industry = keyof typeof businessMapping.industries;
export type Goal = keyof typeof businessMapping.goals;
export type BudgetLevel = keyof typeof businessMapping.budgetLevels;
export type Priority = 'must-have' | 'nice-to-have' | 'optional';

export interface RecommendationInput {
  businessType: BusinessType;
  teamSize: TeamSize;
  industry: Industry;
  goal: Goal;
  budgetLevel: BudgetLevel;
}

export interface AgentRecommendation {
  agentId: string;
  score: number;
  priority: Priority;
  reasons: string[];
  category: string;
}

export interface RecommendationResult {
  recommendations: AgentRecommendation[];
  summary: {
    totalAgents: number;
    mustHaveCount: number;
    niceToHaveCount: number;
    optionalCount: number;
    primaryCategories: string[];
  };
  metadata: {
    businessType: BusinessType;
    teamSize: TeamSize;
    industry: Industry;
    goal: Goal;
    budgetLevel: BudgetLevel;
  };
}

export interface Agent {
  id: string;
  category: string;
  name: string;
  description?: string;
}

// ============================================
// Category Mapping
// ============================================

const AGENT_CATEGORY_MAP: Record<string, string> = {
  // Design
  'brand-guardian': 'Design',
  'ui-designer': 'Design',
  'ux-architect': 'Design',
  'ux-researcher': 'Design',
  'visual-storyteller': 'Design',
  'image-prompt-engineer': 'Design',
  'inclusive-visuals': 'Design',
  'whimsy-injector': 'Design',
  
  // Engineering
  'ai-engineer': 'Engineering',
  'backend-architect': 'Engineering',
  'frontend-developer': 'Engineering',
  'mobile-app-builder': 'Engineering',
  'data-engineer': 'Engineering',
  'devops-automator': 'Engineering',
  'security-engineer': 'Engineering',
  'senior-developer': 'Engineering',
  'rapid-prototyper': 'Engineering',
  'technical-writer': 'Engineering',
  'autonomous-optimization': 'Engineering',
  
  // Marketing
  'content-creator': 'Marketing',
  'growth-hacker': 'Marketing',
  'social-media-strategist': 'Marketing',
  'instagram-curator': 'Marketing',
  'tiktok-strategist': 'Marketing',
  'twitter-engager': 'Marketing',
  'reddit-community-builder': 'Marketing',
  'wechat-official-account': 'Marketing',
  'xiaohongshu-specialist': 'Marketing',
  'zhihu-strategist': 'Marketing',
  'app-store-optimizer': 'Marketing',
  
  // Product
  'sprint-prioritizer': 'Product',
  'feedback-synthesizer': 'Product',
  'trend-researcher': 'Product',
  'behavioral-nudge-engine': 'Product',
  
  // Project Management
  'senior-project-manager': 'Project Management',
  'project-shepherd': 'Project Management',
  'studio-operations': 'Project Management',
  'studio-producer': 'Project Management',
  'experiment-tracker': 'Project Management',
  
  // Spatial Computing
  'visiones-spatial-engineer': 'Spatial Computing',
  'xr-immersive-developer': 'Spatial Computing',
  'xr-interface-architect': 'Spatial Computing',
  'xr-cockpit-interaction': 'Spatial Computing',
  'macos-spatial-metal': 'Spatial Computing',
  'terminal-integration': 'Spatial Computing',
  
  // Specialized
  'agents-orchestrator': 'Specialized',
  'developer-advocate': 'Specialized',
  'cultural-intelligence': 'Specialized',
  'data-analytics-reporter': 'Specialized',
  'data-consolidation': 'Specialized',
  'report-distribution': 'Specialized',
  'sales-data-extraction': 'Specialized',
  'lsp-index-engineer': 'Specialized',
  
  // Support
  'support-responder': 'Support',
  'analytics-reporter': 'Support',
  'executive-summary-generator': 'Support',
  'finance-tracker': 'Support',
  'infrastructure-maintainer': 'Support',
  'legal-compliance-checker': 'Support',
  
  // Testing
  'accessibility-auditor': 'Testing',
  'api-tester': 'Testing',
  'performance-benchmarker': 'Testing',
  'test-results-analyzer': 'Testing',
  'evidence-collector': 'Testing',
  'reality-checker': 'Testing',
  'tool-evaluator': 'Testing',
  'workflow-optimizer': 'Testing',
};

// ============================================
// Scoring Constants
// ============================================

const SCORING_WEIGHTS = businessMapping.scoringWeights;

// ============================================
// Core Recommendation Engine
// ============================================

/**
 * Main recommendation function
 * Takes business attributes and returns ranked agent recommendations
 */
export function getRecommendations(input: RecommendationInput): RecommendationResult {
  const {
    businessType,
    teamSize,
    industry,
    goal,
    budgetLevel
  } = input;

  // Get base scores from each dimension
  const businessTypeScores = calculateBusinessTypeScores(businessType);
  const teamSizeScores = calculateTeamSizeScores(teamSize);
  const industryScores = calculateIndustryScores(industry);
  const goalScores = calculateGoalScores(goal);
  const budgetScores = calculateBudgetScores(budgetLevel);

  // Aggregate scores
  const aggregatedScores = aggregateScores([
    businessTypeScores,
    teamSizeScores,
    industryScores,
    goalScores,
    budgetScores
  ]);

  // Determine priority levels and reasons
  const recommendations = buildRecommendations(
    aggregatedScores,
    input,
    businessTypeScores,
    teamSizeScores,
    industryScores,
    goalScores,
    budgetScores
  );

  // Sort by score descending
  recommendations.sort((a, b) => b.score - a.score);

  // Build summary
  const summary = buildSummary(recommendations);

  return {
    recommendations,
    summary,
    metadata: input
  };
}

/**
 * Calculate scores based on business type
 */
function calculateBusinessTypeScores(businessType: BusinessType): Map<string, number> {
  const scores = new Map<string, number>();
  const bt = businessMapping.businessTypes[businessType];

  if (!bt) return scores;

  // Must-have agents get highest score
  bt.mustHaveAgents?.forEach(agent => {
    scores.set(agent, SCORING_WEIGHTS.mustHave * SCORING_WEIGHTS.businessTypeMatch);
  });

  // Nice-to-have agents
  bt.niceToHaveAgents?.forEach(agent => {
    const existing = scores.get(agent) || 0;
    scores.set(agent, Math.max(existing, SCORING_WEIGHTS.niceToHave * SCORING_WEIGHTS.businessTypeMatch));
  });

  // Optional agents
  bt.optionalAgents?.forEach(agent => {
    const existing = scores.get(agent) || 0;
    scores.set(agent, Math.max(existing, SCORING_WEIGHTS.optional * SCORING_WEIGHTS.businessTypeMatch));
  });

  return scores;
}

/**
 * Calculate scores based on team size
 */
function calculateTeamSizeScores(teamSize: TeamSize): Map<string, number> {
  const scores = new Map<string, number>();
  const ts = businessMapping.teamSizes[teamSize];

  if (!ts) return scores;

  // Recommended agents get base score
  ts.recommendedAgents?.forEach(agent => {
    scores.set(agent, SCORING_WEIGHTS.teamSizeFit);
  });

  return scores;
}

/**
 * Calculate scores based on industry
 */
function calculateIndustryScores(industry: Industry): Map<string, number> {
  const scores = new Map<string, number>();
  const ind = businessMapping.industries[industry];

  if (!ind) return scores;

  // Specialized agents get highest industry score
  ind.specializedAgents?.forEach(agent => {
    scores.set(agent, SCORING_WEIGHTS.industryMatch);
  });

  return scores;
}

/**
 * Calculate scores based on goal
 */
function calculateGoalScores(goal: Goal): Map<string, number> {
  const scores = new Map<string, number>();
  const g = businessMapping.goals[goal];

  if (!g) return scores;

  // Priority agents based on goal
  g.scoring?.mustHave?.forEach(agent => {
    scores.set(agent, SCORING_WEIGHTS.mustHave * SCORING_WEIGHTS.goalMatch);
  });

  g.scoring?.niceToHave?.forEach(agent => {
    const existing = scores.get(agent) || 0;
    scores.set(agent, Math.max(existing, SCORING_WEIGHTS.niceToHave * SCORING_WEIGHTS.goalMatch));
  });

  g.scoring?.optional?.forEach(agent => {
    const existing = scores.get(agent) || 0;
    scores.set(agent, Math.max(existing, SCORING_WEIGHTS.optional * SCORING_WEIGHTS.goalMatch));
  });

  return scores;
}

/**
 * Calculate scores based on budget level
 */
function calculateBudgetScores(budgetLevel: BudgetLevel): Map<string, number> {
  const scores = new Map<string, number>();
  const budget = businessMapping.budgetLevels[budgetLevel];

  if (!budget) return scores;

  if (budget.recommendedAgents === 'ALL_AGENTS') {
    // Enterprise gets all agents
    businessMapping.allAgents.forEach(agent => {
      scores.set(agent, SCORING_WEIGHTS.optional);
    });
  } else {
    budget.recommendedAgents?.forEach(agent => {
      scores.set(agent, SCORING_WEIGHTS.optional);
    });
  }

  return scores;
}

/**
 * Aggregate scores from all dimensions
 */
function aggregateScores(scoreMaps: Map<string, number>[]): Map<string, number> {
  const aggregated = new Map<string, number>();

  scoreMaps.forEach(scoreMap => {
    scoreMap.forEach((score, agent) => {
      const existing = aggregated.get(agent) || 0;
      aggregated.set(agent, existing + score);
    });
  });

  return aggregated;
}

/**
 * Build final recommendations with priorities and reasons
 */
function buildRecommendations(
  aggregatedScores: Map<string, number>,
  input: RecommendationInput,
  businessTypeScores: Map<string, number>,
  teamSizeScores: Map<string, number>,
  industryScores: Map<string, number>,
  goalScores: Map<string, number>,
  budgetScores: Map<string, number>
): AgentRecommendation[] {
  const recommendations: AgentRecommendation[] = [];
  const budget = businessMapping.budgetLevels[input.budgetLevel];
  const maxAgents = budget?.maxAgents || 10;

  // Get goal scoring to determine priority
  const goalScoring = businessMapping.goals[input.goal]?.scoring || {};
  const mustHaveSet = new Set([
    ...(businessMapping.businessTypes[input.businessType]?.mustHaveAgents || []),
    ...(goalScoring.mustHave || [])
  ]);
  const niceToHaveSet = new Set([
    ...(businessMapping.businessTypes[input.businessType]?.niceToHaveAgents || []),
    ...(goalScoring.niceToHave || [])
  ]);

  // Sort by score and take top agents
  const sortedAgents = Array.from(aggregatedScores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxAgents);

  sortedAgents.forEach(([agentId, score]) => {
    const reasons = generateReasons(
      agentId,
      input,
      businessTypeScores,
      teamSizeScores,
      industryScores,
      goalScores,
      budgetScores
    );

    // Determine priority
    let priority: Priority = 'optional';
    if (mustHaveSet.has(agentId)) {
      priority = 'must-have';
    } else if (niceToHaveSet.has(agentId)) {
      priority = 'nice-to-have';
    }

    recommendations.push({
      agentId,
      score: Math.round(score * 100) / 100,
      priority,
      reasons,
      category: AGENT_CATEGORY_MAP[agentId] || 'Unknown'
    });
  });

  return recommendations;
}

/**
 * Generate explanation reasons for each recommendation
 */
function generateReasons(
  agentId: string,
  input: RecommendationInput,
  businessTypeScores: Map<string, number>,
  teamSizeScores: Map<string, number>,
  industryScores: Map<string, number>,
  goalScores: Map<string, number>,
  budgetScores: Map<string, number>
): string[] {
  const reasons: string[] = [];

  // Check each score map for matches
  if (businessTypeScores.has(agentId)) {
    reasons.push(`Recommended for ${input.businessType} businesses`);
  }
  if (teamSizeScores.has(agentId)) {
    reasons.push(`Suitable for team size ${input.teamSize}`);
  }
  if (industryScores.has(agentId)) {
    reasons.push(`Specialized for ${input.industry} industry`);
  }
  if (goalScores.has(agentId)) {
    reasons.push(`Supports ${input.goal} goal`);
  }
  if (budgetScores.has(agentId)) {
    reasons.push(`Fits within ${input.budgetLevel} budget`);
  }

  return reasons;
}

/**
 * Build summary statistics
 */
function buildSummary(recommendations: AgentRecommendation[]): RecommendationResult['summary'] {
  const categoryCount = new Map<string, number>();

  recommendations.forEach(rec => {
    const count = categoryCount.get(rec.category) || 0;
    categoryCount.set(rec.category, count + 1);
  });

  // Sort categories by count
  const sortedCategories = Array.from(categoryCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);

  return {
    totalAgents: recommendations.length,
    mustHaveCount: recommendations.filter(r => r.priority === 'must-have').length,
    niceToHaveCount: recommendations.filter(r => r.priority === 'nice-to-have').length,
    optionalCount: recommendations.filter(r => r.priority === 'optional').length,
    primaryCategories: sortedCategories.slice(0, 3)
  };
}

// ============================================
// Utility Functions
// ============================================

/**
 * Get agents by category
 */
export function getAgentsByCategory(category: string): string[] {
  return businessMapping.agentCategories[category] || [];
}

/**
 * Get all available categories
 */
export function getCategories(): string[] {
  return Object.keys(businessMapping.agentCategories);
}

/**
 * Get all available agents
 */
export function getAllAgents(): string[] {
  return businessMapping.allAgents;
}

/**
 * Get agent category
 */
export function getAgentCategory(agentId: string): string {
  return AGENT_CATEGORY_MAP[agentId] || 'Unknown';
}

/**
 * Validate input parameters
 */
export function validateInput(input: Partial<RecommendationInput>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const validBusinessTypes = Object.keys(businessMapping.businessTypes);
  const validTeamSizes = Object.keys(businessMapping.teamSizes);
  const validIndustries = Object.keys(businessMapping.industries);
  const validGoals = Object.keys(businessMapping.goals);
  const validBudgetLevels = Object.keys(businessMapping.budgetLevels);

  if (!input.businessType || !validBusinessTypes.includes(input.businessType)) {
    errors.push(`Invalid businessType. Valid values: ${validBusinessTypes.join(', ')}`);
  }
  if (!input.teamSize || !validTeamSizes.includes(input.teamSize)) {
    errors.push(`Invalid teamSize. Valid values: ${validTeamSizes.join(', ')}`);
  }
  if (!input.industry || !validIndustries.includes(input.industry)) {
    errors.push(`Invalid industry. Valid values: ${validIndustries.join(', ')}`);
  }
  if (!input.goal || !validGoals.includes(input.goal)) {
    errors.push(`Invalid goal. Valid values: ${validGoals.join(', ')}`);
  }
  if (!input.budgetLevel || !validBudgetLevels.includes(input.budgetLevel)) {
    errors.push(`Invalid budgetLevel. Valid values: ${validBudgetLevels.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Filter recommendations by category
 */
export function filterByCategory(recommendations: AgentRecommendation[], category: string): AgentRecommendation[] {
  return recommendations.filter(r => r.category === category);
}

/**
 * Filter recommendations by priority
 */
export function filterByPriority(recommendations: AgentRecommendation[], priority: Priority): AgentRecommendation[] {
  return recommendations.filter(r => r.priority === priority);
}

/**
 * Get max agents for a budget level
 */
export function getMaxAgentsForBudget(budgetLevel: BudgetLevel): number {
  return businessMapping.budgetLevels[budgetLevel]?.maxAgents || 10;
}

// ============================================
// Export Configuration
// ============================================

export const CONFIG = {
  version: businessMapping.version,
  businessTypes: Object.keys(businessMapping.businessTypes),
  teamSizes: Object.keys(businessMapping.teamSizes),
  industries: Object.keys(businessMapping.industries),
  goals: Object.keys(businessMapping.goals),
  budgetLevels: Object.keys(businessMapping.budgetLevels),
  categories: Object.keys(businessMapping.agentCategories),
};

export default {
  getRecommendations,
  validateInput,
  getAgentsByCategory,
  getCategories,
  getAllAgents,
  getAgentCategory,
  filterByCategory,
  filterByPriority,
  getMaxAgentsForBudget,
  CONFIG
};
