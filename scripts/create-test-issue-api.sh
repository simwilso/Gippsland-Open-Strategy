#!/bin/bash

# Alternative script to create test GitHub issue using GitHub REST API
# Based on test data from flows/intake/test-issue.json

set -e

# Configuration
REPO_OWNER="simwilso"
REPO_NAME="Gippsland-Open-Strategy"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable not set"
    echo "Please set your GitHub personal access token:"
    echo "export GITHUB_TOKEN=your_token_here"
    echo ""
    echo "To create a token:"
    echo "1. Go to https://github.com/settings/tokens"
    echo "2. Generate a new token with 'repo' scope"
    echo "3. Export it as GITHUB_TOKEN"
    exit 1
fi

# Issue payload based on test data
ISSUE_PAYLOAD='{
  "title": "Improve public transport connectivity between towns",
  "body": "**Category**: Infrastructure\n\n**Proposal**: We need better public transport links between Traralgon, Morwell, and Moe. Currently, the bus services are limited and don'\''t align with train schedules. This proposal suggests implementing a coordinated shuttle service that connects with V/Line trains and provides regular services throughout the day.\n\n**Impact**: This would significantly improve mobility for residents without cars, reduce traffic congestion, lower carbon emissions, and boost economic activity by making it easier for people to access jobs, education, and services across the region.\n\n---\n\n*This is a test issue for verifying the voting workflow implementation. Please use 👍 reactions to vote for this proposal.*",
  "labels": ["high-priority", "infrastructure", "transport"]
}'

echo "Creating test GitHub issue via API..."
echo "Repository: $REPO_OWNER/$REPO_NAME"
echo ""

# Create the issue using GitHub API
RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues" \
  -d "$ISSUE_PAYLOAD")

# Extract issue URL and number
ISSUE_URL=$(echo "$RESPONSE" | grep -o '"html_url":"[^"]*"' | cut -d'"' -f4)
ISSUE_NUMBER=$(echo "$RESPONSE" | grep -o '"number":[0-9]*' | cut -d':' -f2)

if [ -n "$ISSUE_URL" ] && [ -n "$ISSUE_NUMBER" ]; then
    echo "✅ Test issue created successfully!"
    echo "🔗 Issue URL: $ISSUE_URL"
    echo "📝 Issue Number: #$ISSUE_NUMBER"
    echo ""
    echo "Next steps:"
    echo "1. Visit the issue URL above"
    echo "2. Test the voting functionality by adding 👍 reactions"
    echo "3. Verify the workflow detects and processes the reactions"
    echo "4. Check that the issue appears in voting reports/dashboards"
else
    echo "❌ Error creating issue. Response:"
    echo "$RESPONSE"
    exit 1
fi