# Swarm Contracts and Flow System

This directory contains the contract definitions and flow system for orchestrating AI swarm operations.

## Structure

```
flows/
├── contracts/              # Input/output contracts
│   ├── swarm-request.schema.json   # Input contract for swarm tasks
│   └── swarm-output.schema.json    # Output contract for swarm results
├── policies/               # Routing and configuration policies
│   └── routing.yaml       # Task routing to swarm topologies
├── adapters/              # Integration adapters
│   └── github.ts         # GitHub adapter for applying swarm outputs
├── swarm.yaml            # Main swarm configuration
└── validate-contracts.js # Contract validation utility
```

## Contracts

### Swarm Request Contract

The `swarm-request.schema.json` defines the input format for swarm operations:

- **taskId**: Unique identifier for the task
- **taskType**: Type of task (feature-development, bug-fix, refactoring, etc.)
- **description**: Detailed task description
- **context**: Execution context including repository, branch, files, and constraints
- **priority**: Task priority level (low, medium, high, critical)
- **metadata**: Additional metadata

### Swarm Output Contract

The `swarm-output.schema.json` defines the output format from swarm operations:

- **taskId**: Matching task identifier
- **status**: Completion status (completed, partial, failed, cancelled)
- **results**: Execution results including changes, summary, tests, and artifacts
- **metadata**: Execution metadata including timing, agents, performance, and errors
- **recommendations**: Follow-up recommendations

## GitHub Adapter

The `github.ts` adapter handles applying swarm outputs to GitHub repositories:

### Usage

```bash
# Apply swarm output to repository
./flows/adapters/github.ts <swarm-output.json> [config.json]

# Example
./flows/adapters/github.ts output.json adapter-config.json
```

### Features

- Creates feature branches automatically
- Applies file changes (create, modify, delete, rename)
- Generates detailed commit messages
- Creates pull requests with comprehensive descriptions
- Includes test results and performance metrics
- Adds recommendations for follow-up work

### Configuration

The adapter can be configured with:

- `auto_commit`: Whether to commit changes automatically (default: false)
- `auto_pr`: Whether to create pull requests automatically (default: true)
- `branch_prefix`: Prefix for created branches (default: "swarm/")
- `commit_prefix`: Prefix for commit messages (default: "🤖 [Swarm]")
- `base_branch`: Base branch for PRs (default: "main")

## Routing Policies

The `routing.yaml` file defines how tasks are routed to appropriate swarm configurations:

- Maps task types to swarm topologies (mesh, hierarchical, star, ring)
- Defines agent assignments and priorities
- Specifies coordination strategies (parallel, sequential, adaptive)
- Sets resource limits based on priority

## Swarm Configuration

The `swarm.yaml` file contains the main configuration:

- Swarm settings and defaults
- Contract and policy references
- Adapter configurations
- Memory and hook settings
- Performance and security options

## Validation

Use the validation script to ensure contracts are valid:

```bash
node flows/validate-contracts.js
```

## Integration with Claude Flow

The flow system integrates with Claude Flow MCP tools:

1. Initialize swarm topology using MCP tools
2. Define agent types for coordination
3. Use contracts to structure input/output
4. Apply results using the GitHub adapter

## Example Workflow

1. Create a swarm request JSON following the contract
2. Initialize swarm with appropriate topology
3. Execute task with Claude Flow orchestration
4. Collect output following the output contract
5. Apply changes using the GitHub adapter

This system ensures consistent, well-structured swarm operations with proper validation and integration capabilities.