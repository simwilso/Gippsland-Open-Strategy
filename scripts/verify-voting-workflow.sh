#!/bin/bash

# Script to verify the voting workflow implementation after test issue creation
# This script checks various aspects of the voting system

set -e

REPO_OWNER="simwilso"
REPO_NAME="Gippsland-Open-Strategy"

echo "🔍 Verifying Voting Workflow Implementation"
echo "=========================================="
echo ""

# Function to check if gh CLI is available and authenticated
check_gh_auth() {
    if ! command -v gh &> /dev/null; then
        echo "⚠️  GitHub CLI (gh) not found. Some checks will be skipped."
        return 1
    fi
    
    if ! gh auth status &> /dev/null; then
        echo "⚠️  Not authenticated with GitHub CLI. Some checks will be skipped."
        return 1
    fi
    
    return 0
}

# Function to check for test issues
check_test_issues() {
    echo "1. Checking for test issues..."
    
    if check_gh_auth; then
        # List recent issues with our test title
        ISSUES=$(gh issue list --repo "$REPO_OWNER/$REPO_NAME" --search "Improve public transport connectivity" --json number,title,labels,reactions --limit 5)
        
        if echo "$ISSUES" | grep -q "public transport connectivity"; then
            echo "   ✅ Found test issue(s) with correct title"
            
            # Check labels
            if echo "$ISSUES" | grep -q "infrastructure"; then
                echo "   ✅ Test issue has 'infrastructure' label"
            else
                echo "   ❌ Test issue missing 'infrastructure' label"
            fi
            
            if echo "$ISSUES" | grep -q "transport"; then
                echo "   ✅ Test issue has 'transport' label"
            else
                echo "   ❌ Test issue missing 'transport' label"
            fi
            
            if echo "$ISSUES" | grep -q "high-priority"; then
                echo "   ✅ Test issue has 'high-priority' label"
            else
                echo "   ❌ Test issue missing 'high-priority' label"
            fi
            
            # Check for reactions
            REACTIONS=$(echo "$ISSUES" | grep -o '"reactions":{[^}]*}' || echo "")
            if [ -n "$REACTIONS" ]; then
                echo "   ✅ Issue has reaction data structure"
                if echo "$REACTIONS" | grep -q '"+1":[1-9]'; then
                    echo "   ✅ Issue has thumbs up reactions for voting!"
                else
                    echo "   ⚠️  No thumbs up reactions found yet (this is expected for new issues)"
                fi
            else
                echo "   ⚠️  No reaction data found"
            fi
        else
            echo "   ❌ No test issues found. Run create-test-issue.sh first."
        fi
    else
        echo "   ⚠️  Cannot check issues without GitHub CLI authentication"
    fi
    echo ""
}

# Function to check workflow files
check_workflow_files() {
    echo "2. Checking workflow configuration files..."
    
    # Check for GitHub Actions workflows
    if [ -d ".github/workflows" ]; then
        echo "   ✅ GitHub Actions workflows directory exists"
        
        # Look for voting-related workflows
        VOTING_WORKFLOWS=$(find .github/workflows -name "*.yml" -o -name "*.yaml" | xargs grep -l -i "voting\|reaction\|thumb" 2>/dev/null || echo "")
        
        if [ -n "$VOTING_WORKFLOWS" ]; then
            echo "   ✅ Found voting-related workflow files:"
            echo "$VOTING_WORKFLOWS" | sed 's/^/      /'
        else
            echo "   ⚠️  No voting-specific workflows found"
        fi
        
        # Check for issue event triggers
        ISSUE_WORKFLOWS=$(find .github/workflows -name "*.yml" -o -name "*.yaml" | xargs grep -l "issues\|issue_comment" 2>/dev/null || echo "")
        
        if [ -n "$ISSUE_WORKFLOWS" ]; then
            echo "   ✅ Found issue event workflows:"
            echo "$ISSUE_WORKFLOWS" | sed 's/^/      /'
        else
            echo "   ❌ No issue event workflows found"
        fi
    else
        echo "   ❌ No GitHub Actions workflows directory found"
    fi
    echo ""
}

# Function to check project structure
check_project_structure() {
    echo "3. Checking project structure for voting components..."
    
    # Check for flows directory
    if [ -d "flows" ]; then
        echo "   ✅ flows/ directory exists"
        
        if [ -d "flows/intake" ]; then
            echo "   ✅ flows/intake/ directory exists"
            
            if [ -f "flows/intake/test-issue.json" ]; then
                echo "   ✅ test-issue.json template file exists"
            else
                echo "   ❌ test-issue.json template file missing"
            fi
        else
            echo "   ❌ flows/intake/ directory missing"
        fi
    else
        echo "   ❌ flows/ directory missing"
    fi
    
    # Check for scripts directory
    if [ -d "scripts" ]; then
        echo "   ✅ scripts/ directory exists"
        
        if [ -f "scripts/create-test-issue.sh" ]; then
            echo "   ✅ create-test-issue.sh script exists"
        fi
        
        if [ -f "scripts/create-test-issue-api.sh" ]; then
            echo "   ✅ create-test-issue-api.sh script exists"
        fi
    else
        echo "   ❌ scripts/ directory missing"
    fi
    echo ""
}

# Function to provide next steps
provide_next_steps() {
    echo "4. Next Steps for Complete Testing:"
    echo ""
    echo "   Manual Testing Steps:"
    echo "   • Visit the test issue in GitHub"
    echo "   • Add 👍 (thumbs up) reactions to test voting"
    echo "   • Add comments to test discussion features"
    echo "   • Check if workflows trigger on these actions"
    echo ""
    echo "   Automated Testing:"
    echo "   • Run any CI/CD pipelines to ensure they pass"
    echo "   • Monitor GitHub Actions for voting workflow execution"
    echo "   • Check logs for any errors in reaction processing"
    echo ""
    echo "   Verification:"
    echo "   • Confirm vote counts are accurately tracked"
    echo "   • Test that high-priority issues are flagged appropriately"
    echo "   • Verify that infrastructure/transport labels work correctly"
    echo ""
}

# Run all checks
main() {
    check_test_issues
    check_workflow_files
    check_project_structure
    provide_next_steps
    
    echo "=========================================="
    echo "✅ Voting workflow verification complete!"
    echo ""
    echo "If you haven't created a test issue yet, run:"
    echo "   ./scripts/create-test-issue.sh"
    echo "or:"
    echo "   ./scripts/create-test-issue-api.sh"
    echo ""
}

# Change to repository root if we're not already there
if [ ! -f "CLAUDE.md" ]; then
    cd /home/simwilso/Code/Gippsland_Open_Roadmap
fi

main