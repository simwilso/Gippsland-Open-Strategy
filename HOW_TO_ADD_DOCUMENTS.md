# 📚 How to Add Your Strategy Documents

Since the strategy documents are in your main GNEC repository, you'll need to copy them manually. Here's how:

## Option 1: Using GitHub Web Interface (Easiest)

1. Go to your GNEC repository on GitHub
2. Navigate to each folder below and download the files:
   - `docs/research/` - All 15 research documents
   - `docs/strategy/` - All 8 strategy documents
   - `docs/executive/` - Executive summaries and presentations
   - `docs/finance/` - Financial architecture documents
   - `docs/global/` - International strategy documents
   - `docs/implementation/` - Implementation plans
   - `docs/operations/` - Operations frameworks
   - `docs/partnerships/` - Partnership documents
   - `docs/technology/` - Technology strategy
   - `docs/validation/` - Validation reports
   
3. Also get these important files from `docs/`:
   - `STRATEGY_NAVIGATION_GUIDE.md`
   - `STRATEGY_OVERVIEW_MAP.md`
   - `DOCUMENTATION_ENHANCEMENT_REPORT.md`
   - `master-blueprint.md`
   - `executive-summaries.md`
   - Any other `.md` files in the docs root

## Option 2: Using Git Commands

If the documents are in a specific branch:

```bash
# Go to your GNEC repository
cd ~/Code/gnec-demo

# Check which branch has the documents
git branch -a

# Checkout the branch with the documents (e.g., feature/clean-slate-20250909-063241)
git checkout feature/clean-slate-20250909-063241

# Now copy the documents
cp -r docs/research ~/Code/Gippsland-Open-Strategy/docs/
cp -r docs/strategy ~/Code/Gippsland-Open-Strategy/docs/
cp -r docs/executive ~/Code/Gippsland-Open-Strategy/docs/
cp -r docs/finance ~/Code/Gippsland-Open-Strategy/docs/
cp -r docs/global ~/Code/Gippsland-Open-Strategy/docs/
cp -r docs/implementation ~/Code/Gippsland-Open-Strategy/docs/
cp -r docs/operations ~/Code/Gippsland-Open-Strategy/docs/
cp -r docs/partnerships ~/Code/Gippsland-Open-Strategy/docs/
cp -r docs/technology ~/Code/Gippsland-Open-Strategy/docs/
cp -r docs/validation ~/Code/Gippsland-Open-Strategy/docs/

# Copy root level docs
cp docs/*.md ~/Code/Gippsland-Open-Strategy/docs/

# Go to the new repository
cd ~/Code/Gippsland-Open-Strategy

# Add and commit
git add .
git commit -m "Add all strategy documentation from GNEC project"
git push
```

## What Documents to Look For

### Research Documents (15 files)
- 01-requirements-analysis.md
- 02-infrastructure-assets.md
- 03-current-projects-inventory.md
- ... through to 15-energy-storage-strategy.md

### Strategy Documents (8 files)
- 16-master-strategy.md
- 17-economic-development.md
- 18-just-transition.md
- ... through to 23-brand-toolkit.md

### Executive Documents
- implementation-readiness.md
- publication-readiness.md
- gnec-2025-presentation-strategy.md
- presentation-speaking-notes.md
- day2-executive-summary.md

### And many more in each category!

## After Adding Documents

Once you've added all the documents:

1. Verify you have 100+ markdown files:
   ```bash
   find docs -name "*.md" | wc -l
   ```

2. Commit and push:
   ```bash
   git add .
   git commit -m "Add complete strategy documentation suite"
   git push
   ```

3. Your repository will then have all the enhanced documentation with:
   - Australian English spelling
   - Mermaid diagrams
   - Professional tables
   - Navigation guides
   - Executive summaries

## Need Help?

If you're having trouble finding the documents, they should be in the branch where we did all the enhancement work. Look for branches with recent activity or check the commit history for "enhancement" commits.