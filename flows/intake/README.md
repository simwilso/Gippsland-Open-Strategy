# Gippsland Open Roadmap - Intake System

This intake system processes community suggestions from GitHub issues into a standardized format for the Gippsland Open Roadmap project.

## Components

### 1. suggestion.schema.json
JSON Schema that defines the structure of a suggestion with the following fields:
- **id**: Unique identifier
- **category**: Type of suggestion (infrastructure, education, healthcare, environment, business, other)
- **proposal**: Detailed description of the suggestion
- **impact**: Expected benefits and outcomes
- **status**: Current processing status (pending, review, approved, rejected, implemented)
- **priority**: Urgency level (low, medium, high, critical)
- **author**: Submitter information
- **tags**: Associated labels
- **githubIssueNumber**: Link to original GitHub issue

### 2. mapper.ts
Executable TypeScript tool that converts GitHub issues to the suggestion format.

**Features:**
- Extracts category from labels or body content
- Parses proposal and impact sections from issue body
- Determines priority from labels
- Preserves author information and timestamps
- Supports batch processing of multiple issues

**Usage:**
```bash
# Process single issue
./mapper.ts issue.json suggestion.json

# Output to stdout
./mapper.ts issue.json

# Process multiple issues
./mapper.ts issues-array.json suggestions.json
```

### 3. validate.ts
Validates suggestions against the schema to ensure data integrity.

**Usage:**
```bash
# Validate with default schema
./validate.ts suggestion.json

# Validate with custom schema
./validate.ts suggestion.json custom-schema.json
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Process a GitHub issue:
```bash
npm run map -- github-issue.json output.json
```

3. Validate a suggestion:
```bash
npm run validate -- suggestion.json
```

4. Run tests:
```bash
npm test
```

## GitHub Issue Format

The mapper expects GitHub issues in the following format:

```json
{
  "number": 123,
  "title": "Issue title",
  "body": "**Category**: infrastructure\n\n**Proposal**: Description...\n\n**Impact**: Benefits...",
  "state": "open",
  "created_at": "2025-01-13T10:30:00Z",
  "user": {
    "login": "username",
    "name": "Full Name",
    "email": "email@example.com"
  },
  "labels": [
    { "name": "high-priority" },
    { "name": "infrastructure" }
  ]
}
```

## Category Detection

The mapper uses the following hierarchy to determine category:
1. Labels containing category keywords
2. Explicit category field in issue body
3. Category keywords in body content
4. Default to "other" if no match found

## Priority Detection

Priority is determined from labels:
- Labels containing "critical" or "urgent" → critical
- Labels containing "high" → high
- Labels containing "low" → low
- Default → medium