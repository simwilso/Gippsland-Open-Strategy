#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  state: string;
  created_at: string;
  updated_at?: string;
  user?: {
    login: string;
    name?: string;
    email?: string;
  };
  labels?: Array<{
    name: string;
  }>;
}

interface Suggestion {
  id: string;
  category: string;
  proposal: string;
  impact: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  author?: {
    name?: string;
    email?: string;
    github?: string;
  };
  tags?: string[];
  priority?: string;
  githubIssueNumber?: number;
}

/**
 * Extracts category from issue body or labels
 */
function extractCategory(issue: GitHubIssue): string {
  const body = issue.body || '';
  const labels = issue.labels?.map(l => l.name.toLowerCase()) || [];
  
  // Check labels first
  const categoryMap: Record<string, string> = {
    'infrastructure': 'infrastructure',
    'education': 'education',
    'healthcare': 'healthcare',
    'environment': 'environment',
    'business': 'business',
    'health': 'healthcare',
    'infra': 'infrastructure',
    'edu': 'education',
    'env': 'environment',
    'biz': 'business'
  };
  
  for (const label of labels) {
    for (const [key, value] of Object.entries(categoryMap)) {
      if (label.includes(key)) {
        return value;
      }
    }
  }
  
  // Check body content for category keywords
  const bodyLower = body.toLowerCase();
  const categoryPatterns = [
    { pattern: /category:\s*(\w+)/i, group: 1 },
    { pattern: /\*\*category\*\*:\s*(\w+)/i, group: 1 },
    { pattern: /^#{1,3}\s*category:\s*(\w+)/im, group: 1 }
  ];
  
  for (const { pattern, group } of categoryPatterns) {
    const match = body.match(pattern);
    if (match && match[group]) {
      const category = match[group].toLowerCase();
      return categoryMap[category] || 'other';
    }
  }
  
  // Check for category keywords in body
  for (const [key, value] of Object.entries(categoryMap)) {
    if (bodyLower.includes(key)) {
      return value;
    }
  }
  
  return 'other';
}

/**
 * Extracts proposal from issue body
 */
function extractProposal(issue: GitHubIssue): string {
  const body = issue.body || '';
  
  // Try to extract proposal section
  const proposalPatterns = [
    { pattern: /(?:proposal|description|summary):\s*(.+?)(?:\n#{1,3}|\n\*\*|$)/is, group: 1 },
    { pattern: /\*\*proposal\*\*:\s*(.+?)(?:\n\*\*|$)/is, group: 1 },
    { pattern: /^#{1,3}\s*proposal\s*\n+(.+?)(?:\n#{1,3}|$)/im, group: 1 }
  ];
  
  for (const { pattern, group } of proposalPatterns) {
    const match = body.match(pattern);
    if (match && match[group]) {
      return match[group].trim();
    }
  }
  
  // If no specific proposal section, use title + first paragraph of body
  const firstParagraph = body.split(/\n\n/)[0] || '';
  return `${issue.title}. ${firstParagraph}`.trim();
}

/**
 * Extracts impact from issue body
 */
function extractImpact(issue: GitHubIssue): string {
  const body = issue.body || '';
  
  // Try to extract impact section
  const impactPatterns = [
    { pattern: /(?:impact|benefits|outcomes?):\s*(.+?)(?:\n#{1,3}|\n\*\*|$)/is, group: 1 },
    { pattern: /\*\*impact\*\*:\s*(.+?)(?:\n\*\*|$)/is, group: 1 },
    { pattern: /^#{1,3}\s*impact\s*\n+(.+?)(?:\n#{1,3}|$)/im, group: 1 }
  ];
  
  for (const { pattern, group } of impactPatterns) {
    const match = body.match(pattern);
    if (match && match[group]) {
      return match[group].trim();
    }
  }
  
  // Default impact if not found
  return 'To be assessed during review process';
}

/**
 * Determines priority from labels or content
 */
function extractPriority(issue: GitHubIssue): string {
  const labels = issue.labels?.map(l => l.name.toLowerCase()) || [];
  
  if (labels.some(l => l.includes('critical') || l.includes('urgent'))) {
    return 'critical';
  }
  if (labels.some(l => l.includes('high'))) {
    return 'high';
  }
  if (labels.some(l => l.includes('low'))) {
    return 'low';
  }
  
  return 'medium';
}

/**
 * Maps GitHub issue to suggestion format
 */
export function mapGitHubIssueToSuggestion(issue: GitHubIssue): Suggestion {
  const suggestion: Suggestion = {
    id: `gh-${issue.number}-${Date.now()}`,
    category: extractCategory(issue),
    proposal: extractProposal(issue),
    impact: extractImpact(issue),
    status: issue.state === 'closed' ? 'review' : 'pending',
    createdAt: issue.created_at,
    githubIssueNumber: issue.number
  };
  
  if (issue.updated_at) {
    suggestion.updatedAt = issue.updated_at;
  }
  
  if (issue.user) {
    suggestion.author = {
      github: issue.user.login,
      name: issue.user.name,
      email: issue.user.email
    };
  }
  
  if (issue.labels && issue.labels.length > 0) {
    suggestion.tags = issue.labels.map(l => l.name);
  }
  
  suggestion.priority = extractPriority(issue);
  
  return suggestion;
}

/**
 * CLI interface for the mapper
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: ./mapper.ts <github-issue.json> [output.json]');
    console.error('\nExample:');
    console.error('  ./mapper.ts issue.json suggestion.json');
    console.error('  ./mapper.ts issue.json  # outputs to stdout');
    process.exit(1);
  }
  
  try {
    const inputFile = resolve(args[0]);
    const issueData = JSON.parse(readFileSync(inputFile, 'utf-8'));
    
    // Handle single issue or array of issues
    const issues = Array.isArray(issueData) ? issueData : [issueData];
    const suggestions = issues.map(mapGitHubIssueToSuggestion);
    
    const output = suggestions.length === 1 ? suggestions[0] : suggestions;
    const jsonOutput = JSON.stringify(output, null, 2);
    
    if (args[1]) {
      const outputFile = resolve(args[1]);
      writeFileSync(outputFile, jsonOutput);
      console.log(`✅ Mapped ${suggestions.length} suggestion(s) to ${outputFile}`);
    } else {
      console.log(jsonOutput);
    }
  } catch (error) {
    console.error('❌ Error mapping GitHub issue:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}