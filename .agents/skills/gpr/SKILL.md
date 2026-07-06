---
name: gpr
description: Use when the user asks to create a PR, open a pull request, submit changes for review, or after completing a feature/fix that needs to be merged
argument-hint: [title]
model: sonnet
---

# Git PR Skill

Create pull requests following project conventions.

## Usage

`/gpr <title>` - Create a PR with the given title
`/gpr` - Analyze commits and generate PR title/description
`/gpr --refs` - Create a PR that references (but does not close) the linked task

## PR Conventions

```
Title: append beads ID if available, or plan number/phase number
```

```
## Summary
<Brief description of what this PR does - 1-2 sentences>

## Changes
- <Bullet point list of specific changes>
- <Each change on its own line>

## Testing
<How to test these changes, or note if no testing required>
```

## Instructions

1. Ensure branch is pushed to remote
2. Gather commits since branching from main
3. Generate/validate PR title and description
4. Create the PR using gh cli
5. Return the PR URL

## Arguments

- `$ARGUMENTS` - Optional PR title (if not provided, generate from commits)
