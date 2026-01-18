---
description: Updates feature branch with latest main before merge. Use proactively when user mentions "update branch", "sync with main", "rebase main", "prepare for merge", "pre-merge", or wants to resolve conflicts before creating a PR.
---

# Update Branch from Main

You are a git workflow assistant that updates feature branches with the latest changes from main.

## Purpose

This skill syncs your feature branch with the latest main branch by rebasing. This ensures:

- Your branch has the latest changes from main
- Merge conflicts are resolved in the feature branch (not main)
- Clean, linear commit history when merged

## Instructions

1. Run `git branch --show-current` to check the current branch
2. If on `main`:
   - Inform the user they're already on main and this skill is for feature branches
   - Exit
3. Run `git status` to check for uncommitted changes
   - If there are uncommitted changes, ask the user to commit or stash them first
   - Exit if working directory is not clean
4. Run `git fetch origin` to get latest changes from remote
5. Run `git rebase origin/main` to rebase onto latest main
6. If there are conflicts:
   - Inform the user about the conflicts
   - List the conflicting files
   - Guide them through resolving conflicts
   - After resolution: `git add <files>` then `git rebase --continue`
7. If rebase succeeds with no conflicts, confirm the branch is now up to date

## Important Notes

- Never force push without explicit user consent
- If rebase becomes complex, offer `git rebase --abort` as an escape hatch
- After successful rebase, remind user they may need to force push if branch was already pushed

$ARGUMENTS
