// Strategy content loader using dynamic imports
// This approach is compatible with Docusaurus and doesn't require Node.js runtime modules

export interface StrategyContent {
  title: string;
  description: string;
  category: string;
  fileName: string;
}

// Strategy metadata and file mappings
export const strategyData: Record<string, StrategyContent> = {
  'master-strategy': {
    title: 'Master Strategy',
    description: 'Comprehensive overview of the Gippsland Open Roadmap strategic vision and implementation roadmap',
    category: 'Core Strategy',
    fileName: '16-master-strategy.md'
  },
  'economic-development': {
    title: 'Economic Development Framework',
    description: 'Strategic framework for renewable energy economic development in Gippsland',
    category: 'Economic Strategy',
    fileName: '17-economic-development.md'
  },
  'just-transition': {
    title: 'Just Transition Strategy',
    description: 'Framework for equitable transition of workers and communities from coal to renewables',
    category: 'Social Strategy',
    fileName: '18-just-transition.md'
  },
  'innovation-hub': {
    title: 'Innovation Hub Blueprint',
    description: 'Design and implementation plan for the Gippsland Renewable Energy Innovation Hub',
    category: 'Innovation Strategy',
    fileName: '19-innovation-hub.md'
  },
  'stakeholder-engagement': {
    title: 'Stakeholder Engagement Plan',
    description: 'Comprehensive approach to community and stakeholder participation',
    category: 'Engagement Strategy',
    fileName: '20-stakeholder-engagement.md'
  },
  'environmental-impact': {
    title: 'Environmental Impact Strategy',
    description: 'Framework for managing and optimizing environmental outcomes',
    category: 'Environmental Strategy',
    fileName: '21-environmental-impact.md'
  },
  'policy-regulatory': {
    title: 'Policy & Regulatory Framework',
    description: 'Strategic approach to policy development and regulatory engagement',
    category: 'Policy Strategy',
    fileName: '22-policy-regulatory.md'
  },
  'brand-narrative': {
    title: 'Brand & Narrative Strategy',
    description: 'Positioning Gippsland as a global renewable energy leader',
    category: 'Marketing Strategy',
    fileName: '23-brand-narrative.md'
  },
  '90-day-launch': {
    title: '90-Day Launch Plan',
    description: 'Detailed implementation roadmap for the first 90 days',
    category: 'Implementation',
    fileName: '90-day-launch-plan.md'
  }
};

export type StrategyKey = keyof typeof strategyData;