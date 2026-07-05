---
name: breakdown
description: Convert an accepted plan into beads issues for implementation tracking. Creates an epic and one child issue per phase with dependencies. Use when a plan is accepted and ready for implementation, or when the user says "break this down", "create beads", "set up tracking".
argument-hint: "<plan reference, e.g. docs/plans/020-workspace-snapshots.md>"
---

# Breakdown

Convert a plan into beads issues for implementation tracking: `$ARGUMENTS`

The breakdown skill bridges planning and implementation. It reads an accepted plan, creates a beads epic with child issues for each phase, and updates the plan file with bead IDs.

## How to break down a plan

### 1. Read the plan

Read the plan file referenced in `$ARGUMENTS`. If no plan is specified, check `docs/plans/` for recent plans and ask the user which one to break down.

Verify the plan has:
- A goal
- Numbered acceptance criteria
- Defined phases with acceptance criteria

If the plan looks incomplete or unaccepted, flag this to the user before proceeding.

### 2. Create the epic

Create a beads epic for the overall plan:

- **Title**: the plan's goal
- **Type**: `feature`
- **Priority**: match the urgency the user has conveyed (default to 2 if unclear)
- **Description**: summary of what the plan delivers, with links to the plan file and the upstream artefact (if the plan's frontmatter has a `source` field — typically a PRD or idea file). Include a completion ritual: when the final phase's PR is open, on that same branch prepend ✅ to the plan's `# Title` heading and run `bd close <epic-id>` — both changes ride in the final phase's PR, no separate epic-tick PR.

### 3. Create phase issues

For each phase in the plan, create a child beads issue using the issue body template at `${CLAUDE_SKILL_DIR}/references/issue-body-template.md`:

- **Title**: the phase goal
- **Type**: `task` (or `feature` if the phase delivers user-facing functionality)
- **Description**: contains:
  - What this phase delivers (the vertical slice)
  - Phase acceptance criteria
  - Which plan-level ACs this phase covers
  - Completion ritual (single PR — no follow-up): once the implementation PR is open and its URL is known, on the **same** feature branch:
    1. Prepend ✅ to this phase's heading in the plan file and append the PR URL (e.g. `### ✅ Phase 1: [Goal] — beads-abc123 — https://github.com/surgeventures/xenon/pull/14`).
    2. Run `bd close <bead-id>` to close this issue (mutates `.beads/issues.jsonl`).
    3. Commit both changes and push — they land in the same PR. Merge after.

Wire dependencies (`bd dep add <dependent> <dependency>`):
- Each phase depends on the previous phase: `bd dep add <phase-N> <phase-N-1>`
- The epic depends on every phase: `bd dep add <epic> <phase-N>` for each phase

### 4. Update the plan file

After creating all beads, update the plan document on disk so each phase heading includes its bead ID:

```
### Phase 1: [Goal] — beads-abc123
```

On phase completion, prepend ✅ to the heading (the requirement to do this lives in the bead itself):

```
### ✅ Phase 1: [Goal] — beads-abc123
```

When every phase is complete, prepend ✅ to the plan's `# Title` heading too.

This keeps the plan file as the single source of truth linking phases to their tracking issues, with completion state visible alongside the bead reference.

### 5. Confirm

Report to the user:
- Epic bead ID and title
- Each phase bead ID and title
- Dependency chain

## Boundaries

- Reads the plan — does not modify it (except adding bead IDs to phase headings)
- Does not start implementation
- Does not create sub-issues within a phase (a phase = one bead)
- Does not modify the PRD
