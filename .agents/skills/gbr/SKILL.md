---
name: gbr
description: Use when the user asks to create a branch, start a new feature, begin working on a fix, or switch to a new task that requires a fresh branch
argument-hint: [branch-name]
---

# Git Branch Skill

Create or switch to a git branch following project naming conventions.

## Usage

`/gbr <branch-name>` - Create a new branch with the given name

## Branch Naming Rules

Generate branch names using this format:

| Prefix | Use Case |
|--------|----------|
| feature/ | New features |
| fix/ | Bug fixes |
| refactor/ | Refactoring |
| chore/ | Maintenance tasks |
| docs/ | Documentation changes |

### Rules

- Use lowercase with hyphens (kebab-case)
- Keep it short but descriptive (2-4 words)
- No special characters except hyphens

## Instructions

1. Validate the branch name follows conventions
2. Create and checkout the new branch from main
3. Confirm the branch was created

## Arguments

- `$ARGUMENTS` - The branch name or description to use
