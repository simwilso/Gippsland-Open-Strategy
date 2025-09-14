#!/bin/bash

# Script to create a test GitHub issue for voting workflow verification
# Based on test data from flows/intake/test-issue.json

set -e

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) not found. Please install it first:"
    echo "https://cli.github.com/manual/installation"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "Not authenticated with GitHub. Please run: gh auth login"
    exit 1
fi

# Issue details from test data
TITLE="Improve public transport connectivity between towns"
BODY="**Category**: Infrastructure

**Proposal**: We need better public transport links between Traralgon, Morwell, and Moe. Currently, the bus services are limited and don't align with train schedules. This proposal suggests implementing a coordinated shuttle service that connects with V/Line trains and provides regular services throughout the day.

**Impact**: This would significantly improve mobility for residents without cars, reduce traffic congestion, lower carbon emissions, and boost economic activity by making it easier for people to access jobs, education, and services across the region.

---

*This is a test issue for verifying the voting workflow implementation. Please use 👍 reactions to vote for this proposal.*"

LABELS="high-priority,infrastructure,transport"

echo "Creating test GitHub issue..."
echo "Title: $TITLE"
echo "Labels: $LABELS"
echo ""

# Create the issue
ISSUE_URL=$(gh issue create \
    --title "$TITLE" \
    --body "$BODY" \
    --label "$LABELS" \
    --assignee "@me")

echo ""
echo "✅ Test issue created successfully!"
echo "🔗 Issue URL: $ISSUE_URL"
echo ""
echo "Next steps:"
echo "1. Visit the issue URL above"
echo "2. Test the voting functionality by adding 👍 reactions"
echo "3. Verify the workflow detects and processes the reactions"
echo "4. Check that the issue appears in voting reports/dashboards"

# Optional: Open the issue in the browser
if command -v xdg-open &> /dev/null; then
    echo ""
    echo "Opening issue in browser..."
    xdg-open "$ISSUE_URL"
fi