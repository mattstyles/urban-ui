---
name: gco
description: Use when the user asks to commit changes, save work, checkpoint progress, or after completing a unit of work that should be committed
argument-hint: [message]
---

# Git Commit Skill

Create git commits following project commit message conventions.

## Usage

`/gco <message>` - Create a commit with the given message
`/gco` - Analyze staged changes and generate an appropriate commit message

## Commit Message Rules

### Commit Message Convention

Use emoji prefixes to denote the type of change:

| Emoji | Use Case |
|-------|----------|
| :house: | Internal project changes (not public code/API) |
| :rocket: | New functionality or feature |
| :suspect: | Refactoring |
| :godmode: | Updates to existing code |
| :neckbeard: | Chore commits |
| :feelsgood: | Deleting code |
| :books: | Documentation only changes |
| :crystal_ball: | Test only changes |
| :wrench: | Fixes without behaviour changes |

Format: `<emoji-code> <subject>`

### Rules

- Keep commit messages to a single line where possible
- Be concise and direct
- Subject should be imperative mood ("Add feature" not "Added feature")
- Add commit attribution for Claude

Example: `:rocket: Add lerp function for linear interpolation`

## Instructions

1. Run `git status` to see modified, staged, and untracked files
2. If there are unstaged changes:
   - Stage specific files relevant to the current task using `git add <file1> <file2> ...`
   - Do NOT use `git add -A` or `git add .` — be deliberate about what to include
   - Group related changes together in a single commit
3. Run `git diff --staged` to review what will be committed
4. Generate an appropriate commit message with the correct emoji prefix
5. Execute the commit using `git commit -m "<message>"`
6. Push the commit to the remote using `git push` (use `git push -u origin <branch>` if no upstream is set)

If there are no changes to commit, inform the user.

## Arguments

- `$ARGUMENTS` - Optional commit message (if not provided, generate from changes)
