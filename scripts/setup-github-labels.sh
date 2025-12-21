#!/bin/bash

# Script to set up GitHub labels
# Usage: ./scripts/setup-github-labels.sh

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "Setting up GitHub labels..."

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) is not installed. Please install it first:"
    echo "  macOS: brew install gh"
    echo "  Or download from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "Please authenticate with GitHub first:"
    echo "  gh auth login"
    exit 1
fi

# Get repository name
REPO=$(git remote get-url origin | sed -E 's/.*github.com[:/]([^/]+\/[^/]+)\.git/\1/')

if [ -z "$REPO" ]; then
    echo "Could not determine repository. Make sure you're in a git repository with a GitHub remote."
    exit 1
fi

echo "Repository: $REPO"
echo ""

# Read labels from JSON and create them
while IFS= read -r line; do
    if [[ $line =~ \"name\":\ \"([^\"]+)\" ]]; then
        NAME="${BASH_REMATCH[1]}"
    elif [[ $line =~ \"color\":\ \"([^\"]+)\" ]]; then
        COLOR="${BASH_REMATCH[1]}"
    elif [[ $line =~ \"description\":\ \"([^\"]+)\" ]]; then
        DESC="${BASH_REMATCH[1]}"
        
        # Create the label
        echo -e "${GREEN}Creating label: $NAME${NC}"
        gh label create "$NAME" --color "$COLOR" --description "$DESC" --repo "$REPO" --force 2>/dev/null || echo "  Label $NAME already exists or failed to create"
    fi
done < .github/labels.json

echo ""
echo "✅ GitHub labels setup complete!"
echo ""
echo "You can verify labels at: https://github.com/$REPO/labels"

