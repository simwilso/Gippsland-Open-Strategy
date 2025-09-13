#!/usr/bin/env node

/**
 * GitHub Adapter for Swarm Integration
 * Handles applying swarm outputs to GitHub repositories
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { execSync } from 'child_process';
import { mkdir } from 'fs/promises';

// Type definitions matching our contracts
interface SwarmOutput {
  taskId: string;
  status: 'completed' | 'partial' | 'failed' | 'cancelled';
  results: {
    changes: Array<{
      type: 'create' | 'modify' | 'delete' | 'rename';
      path: string;
      description: string;
      diff?: string;
      content?: string;
    }>;
    summary: string;
    tests?: {
      passed: number;
      failed: number;
      coverage?: number;
      details?: Array<{
        name: string;
        status: 'pass' | 'fail' | 'skip';
        message?: string;
      }>;
    };
    artifacts?: Array<{
      type: 'documentation' | 'diagram' | 'report' | 'build' | 'log';
      path: string;
      description: string;
    }>;
  };
  metadata: {
    startTime: string;
    endTime: string;
    duration?: number;
    agents: Array<{
      type: string;
      name?: string;
      tasksCompleted?: number;
      tokensUsed?: number;
    }>;
    performance?: {
      totalTokens?: number;
      totalCost?: number;
      efficiency?: number;
    };
    errors?: Array<{
      agent?: string;
      message: string;
      timestamp: string;
      severity: 'warning' | 'error' | 'critical';
    }>;
  };
  recommendations?: Array<{
    type: 'improvement' | 'fix' | 'refactor' | 'test' | 'review';
    description: string;
    priority: 'low' | 'medium' | 'high';
  }>;
}

interface AdapterConfig {
  auto_commit?: boolean;
  auto_pr?: boolean;
  branch_prefix?: string;
  commit_prefix?: string;
  repository?: string;
  base_branch?: string;
}

class GitHubAdapter {
  private config: AdapterConfig;
  private output: SwarmOutput;

  constructor(outputPath: string, configPath?: string) {
    // Load swarm output
    this.output = JSON.parse(readFileSync(outputPath, 'utf-8'));
    
    // Load adapter config
    this.config = configPath && existsSync(configPath)
      ? JSON.parse(readFileSync(configPath, 'utf-8'))
      : this.getDefaultConfig();
  }

  private getDefaultConfig(): AdapterConfig {
    return {
      auto_commit: false,
      auto_pr: true,
      branch_prefix: 'swarm/',
      commit_prefix: '🤖 [Swarm]',
      base_branch: 'main'
    };
  }

  private executeCommand(command: string): string {
    try {
      return execSync(command, { encoding: 'utf-8' }).trim();
    } catch (error: any) {
      console.error(`Command failed: ${command}`);
      console.error(error.message);
      throw error;
    }
  }

  private getCurrentBranch(): string {
    return this.executeCommand('git branch --show-current');
  }

  private createBranch(branchName: string): void {
    const fullBranchName = `${this.config.branch_prefix}${branchName}`;
    console.log(`Creating branch: ${fullBranchName}`);
    
    // Ensure we're on the base branch
    this.executeCommand(`git checkout ${this.config.base_branch || 'main'}`);
    
    // Create and checkout new branch
    this.executeCommand(`git checkout -b ${fullBranchName}`);
  }

  private async applyChange(change: SwarmOutput['results']['changes'][0]): Promise<void> {
    console.log(`Applying ${change.type} to ${change.path}`);

    switch (change.type) {
      case 'create':
        if (change.content) {
          // Ensure directory exists
          const dir = dirname(change.path);
          if (dir && dir !== '.') {
            await mkdir(dir, { recursive: true });
          }
          writeFileSync(change.path, change.content);
          this.executeCommand(`git add ${change.path}`);
        }
        break;

      case 'modify':
        if (change.content) {
          writeFileSync(change.path, change.content);
        } else if (change.diff) {
          // Apply diff patch
          const patchFile = `/tmp/swarm-patch-${Date.now()}.patch`;
          writeFileSync(patchFile, change.diff);
          try {
            this.executeCommand(`git apply ${patchFile}`);
          } finally {
            this.executeCommand(`rm -f ${patchFile}`);
          }
        }
        this.executeCommand(`git add ${change.path}`);
        break;

      case 'delete':
        if (existsSync(change.path)) {
          this.executeCommand(`git rm ${change.path}`);
        }
        break;

      case 'rename':
        // Assuming the description contains the new path
        const newPath = change.description.match(/to (.+)$/)?.[1];
        if (newPath) {
          this.executeCommand(`git mv ${change.path} ${newPath}`);
        }
        break;
    }
  }

  private generateCommitMessage(): string {
    const { results, metadata } = this.output;
    const prefix = this.config.commit_prefix || '🤖 [Swarm]';
    
    let message = `${prefix} ${results.summary}\n\n`;
    
    // Add change details
    message += 'Changes:\n';
    results.changes.forEach(change => {
      message += `- ${change.type}: ${change.path} - ${change.description}\n`;
    });
    
    // Add test results if available
    if (results.tests) {
      message += `\nTests: ${results.tests.passed} passed, ${results.tests.failed} failed`;
      if (results.tests.coverage !== undefined) {
        message += ` (${results.tests.coverage}% coverage)`;
      }
      message += '\n';
    }
    
    // Add performance metrics
    if (metadata.performance) {
      message += `\nPerformance: ${metadata.performance.totalTokens} tokens used`;
      if (metadata.performance.efficiency !== undefined) {
        message += ` (${(metadata.performance.efficiency * 100).toFixed(1)}% efficiency)`;
      }
      message += '\n';
    }
    
    // Add agent information
    message += `\nAgents: ${metadata.agents.map(a => a.type).join(', ')}\n`;
    
    // Add recommendations
    if (this.output.recommendations && this.output.recommendations.length > 0) {
      message += '\nRecommendations:\n';
      this.output.recommendations.forEach(rec => {
        message += `- [${rec.priority.toUpperCase()}] ${rec.type}: ${rec.description}\n`;
      });
    }
    
    return message;
  }

  private createPullRequest(branchName: string): void {
    const fullBranchName = `${this.config.branch_prefix}${branchName}`;
    const { results, metadata } = this.output;
    
    // Create PR title
    const title = `${this.config.commit_prefix} ${results.summary}`;
    
    // Create PR body
    let body = `## Summary\n${results.summary}\n\n`;
    
    body += `## Changes\n`;
    results.changes.forEach(change => {
      body += `- **${change.type}**: \`${change.path}\` - ${change.description}\n`;
    });
    
    if (results.tests) {
      body += `\n## Test Results\n`;
      body += `- ✅ Passed: ${results.tests.passed}\n`;
      body += `- ❌ Failed: ${results.tests.failed}\n`;
      if (results.tests.coverage !== undefined) {
        body += `- 📊 Coverage: ${results.tests.coverage}%\n`;
      }
    }
    
    if (metadata.performance) {
      body += `\n## Performance\n`;
      body += `- Tokens: ${metadata.performance.totalTokens}\n`;
      if (metadata.performance.efficiency !== undefined) {
        body += `- Efficiency: ${(metadata.performance.efficiency * 100).toFixed(1)}%\n`;
      }
    }
    
    body += `\n## Execution Details\n`;
    body += `- Duration: ${metadata.duration || 'N/A'} seconds\n`;
    body += `- Agents: ${metadata.agents.map(a => a.type).join(', ')}\n`;
    
    if (this.output.recommendations && this.output.recommendations.length > 0) {
      body += `\n## Recommendations\n`;
      this.output.recommendations.forEach(rec => {
        const emoji = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
        body += `- ${emoji} **${rec.type}**: ${rec.description}\n`;
      });
    }
    
    // Create PR using GitHub CLI
    try {
      this.executeCommand(
        `gh pr create --title "${title}" --body "${body}" --base ${this.config.base_branch || 'main'} --head ${fullBranchName}`
      );
      console.log('Pull request created successfully');
    } catch (error) {
      console.error('Failed to create pull request. You may need to push the branch first or install GitHub CLI.');
      console.log('Branch has been created with all changes. You can manually create a PR.');
    }
  }

  async apply(): Promise<void> {
    console.log(`Applying swarm output for task: ${this.output.taskId}`);
    
    // Check git status
    const status = this.executeCommand('git status --porcelain');
    if (status) {
      console.error('Working directory is not clean. Please commit or stash changes first.');
      process.exit(1);
    }
    
    // Create branch for changes
    const branchName = `${this.output.taskId}-${Date.now()}`;
    this.createBranch(branchName);
    
    // Apply all changes
    for (const change of this.output.results.changes) {
      await this.applyChange(change);
    }
    
    // Handle artifacts
    if (this.output.results.artifacts) {
      for (const artifact of this.output.results.artifacts) {
        console.log(`Created artifact: ${artifact.type} at ${artifact.path}`);
      }
    }
    
    // Commit changes if configured
    if (this.config.auto_commit !== false) {
      const commitMessage = this.generateCommitMessage();
      this.executeCommand(`git commit -m "${commitMessage}"`);
      console.log('Changes committed');
    }
    
    // Create PR if configured
    if (this.config.auto_pr) {
      this.createPullRequest(branchName);
    }
    
    // Report completion
    console.log('\n✅ Swarm output applied successfully!');
    console.log(`Status: ${this.output.status}`);
    console.log(`Changes: ${this.output.results.changes.length}`);
    
    if (this.output.metadata.errors && this.output.metadata.errors.length > 0) {
      console.log('\n⚠️  Errors encountered:');
      this.output.metadata.errors.forEach(error => {
        console.log(`- [${error.severity}] ${error.message}`);
      });
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: github.ts <swarm-output.json> [config.json]');
    process.exit(1);
  }
  
  const outputPath = args[0];
  const configPath = args[1];
  
  if (!existsSync(outputPath)) {
    console.error(`Swarm output file not found: ${outputPath}`);
    process.exit(1);
  }
  
  try {
    const adapter = new GitHubAdapter(outputPath, configPath);
    await adapter.apply();
  } catch (error: any) {
    console.error('Failed to apply swarm output:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { GitHubAdapter, SwarmOutput, AdapterConfig };