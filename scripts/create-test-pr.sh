#!/bin/bash

# Script to create a test PR for workflow validation
# Usage: ./scripts/create-test-pr.sh

set -e

echo "🧪 Creating test PR for workflow validation..."
echo ""

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: You're not on main branch. Current branch: $CURRENT_BRANCH"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create test branch
BRANCH_NAME="test-workflow-validation"
echo "📝 Creating branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

# Create test blueprint directory if it doesn't exist
mkdir -p src/content/blueprints

# Create test blueprint file
TEST_FILE="src/content/blueprints/test-validation-workflow.json"
echo "📄 Creating test blueprint file: $TEST_FILE"

cat > "$TEST_FILE" << 'EOF'
{
  "id": "test-validation-workflow",
  "slug": "test-validation-workflow",
  "title": "Test Blueprint for Workflow Validation",
  "author": "leopoldus11",
  "platform": "GTM",
  "type": "Tag",
  "content": "console.log('This is a test blueprint to verify GitHub Actions workflow');",
  "community_verified": false,
  "description": "This is a test blueprint created to verify that the GitHub Actions workflow runs correctly when a PR is created.",
  "difficulty": "Beginner",
  "tags": ["test", "validation", "workflow"]
}
EOF

# Validate locally
echo ""
echo "✅ Validating blueprint locally..."
if npm run validate:blueprints > /dev/null 2>&1; then
    echo "✅ Local validation passed!"
else
    echo "⚠️  Local validation had issues, but continuing anyway..."
fi

# Stage and commit
echo ""
echo "📦 Staging and committing changes..."
git add "$TEST_FILE"
git commit -m "Test: Add test blueprint to verify workflow validation

This PR is for testing purposes only to verify that:
- GitHub Actions workflow runs automatically
- Blueprint validation works correctly
- Status checks appear on PRs"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git push origin "$BRANCH_NAME"

# Get repository URL
REPO_URL=$(git remote get-url origin | sed 's/\.git$//' | sed 's/git@github.com:/https:\/\/github.com\//')
PR_URL="${REPO_URL}/compare/main...${BRANCH_NAME}?expand=1"

echo ""
echo "✅ Test branch created and pushed!"
echo ""
echo "📋 Next steps:"
echo "1. Go to: $PR_URL"
echo "2. Click 'Create pull request'"
echo "3. Watch the workflow run in the 'Checks' section"
echo "4. After testing, close the PR and run:"
echo "   git checkout main"
echo "   git branch -d $BRANCH_NAME"
echo "   git push origin --delete $BRANCH_NAME"
echo ""

