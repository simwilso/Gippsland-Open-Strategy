# Test Scripts for Voting Workflow

This directory contains scripts to create and verify test GitHub issues for the voting workflow implementation.

## Scripts Overview

### 1. `create-test-issue.sh`
Creates a test GitHub issue using the GitHub CLI (gh) based on the test data template.

**Prerequisites:**
- GitHub CLI installed and authenticated
- Run: `gh auth login`

**Usage:**
```bash
./scripts/create-test-issue.sh
```

### 2. `create-test-issue-api.sh`
Alternative script that creates the test issue using GitHub REST API directly.

**Prerequisites:**
- GitHub personal access token with 'repo' scope
- Set environment variable: `export GITHUB_TOKEN=your_token_here`

**Usage:**
```bash
export GITHUB_TOKEN=your_token_here
./scripts/create-test-issue-api.sh
```

### 3. `verify-voting-workflow.sh`
Comprehensive verification script that checks the voting workflow implementation.

**Features:**
- Checks for test issues and their properties
- Verifies GitHub Actions workflow files
- Validates project structure
- Provides testing guidance

**Usage:**
```bash
./scripts/verify-voting-workflow.sh
```

## Test Issue Details

The test issue created will have:

- **Title:** "Improve public transport connectivity between towns"
- **Category:** Infrastructure
- **Labels:** high-priority, infrastructure, transport
- **Content:** Detailed proposal about public transport improvements
- **Purpose:** Test voting functionality with 👍 reactions

## Testing Workflow

1. **Create Test Issue:**
   ```bash
   ./scripts/create-test-issue.sh
   ```

2. **Manual Testing:**
   - Visit the created issue URL
   - Add 👍 reactions to test voting
   - Verify reaction counting works

3. **Verify Implementation:**
   ```bash
   ./scripts/verify-voting-workflow.sh
   ```

4. **Check Results:**
   - Monitor GitHub Actions for workflow execution
   - Verify vote counting and processing
   - Test high-priority flagging

## Authentication Options

### Option 1: GitHub CLI
```bash
gh auth login
./scripts/create-test-issue.sh
```

### Option 2: Personal Access Token
```bash
export GITHUB_TOKEN=ghp_your_token_here
./scripts/create-test-issue-api.sh
```

## Expected Issue Format

Based on `/flows/intake/test-issue.json`, the test issue will include:

```json
{
  "title": "Improve public transport connectivity between towns",
  "labels": ["high-priority", "infrastructure", "transport"],
  "body": "**Category**: Infrastructure\n\n**Proposal**: [detailed description]..."
}
```

## Troubleshooting

- **Authentication errors:** Ensure GitHub CLI is logged in or GITHUB_TOKEN is set
- **Permission errors:** Verify repository access permissions
- **API rate limits:** Wait a few minutes if hitting GitHub API limits
- **Workflow not triggering:** Check GitHub Actions tab for any configuration issues

## Next Steps

After creating and testing the issue:

1. Monitor GitHub Actions workflows
2. Test reaction-based voting functionality
3. Verify issue categorization and prioritization
4. Document any bugs or improvements needed