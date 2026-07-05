---
name: prd
description: Create a Product Requirements Document — problem, needle, solution, and user stories. Use when the user wants to write a PRD, define requirements, formalize an idea, or says "let's write a PRD", "requirements for...", "define this feature".
argument-hint: "<idea reference or description of what to define>"
---

# PRD

Create a PRD for: `$ARGUMENTS`

A PRD defines the problem space — what we're solving and for whom. It does not define how to build it. The PRD is the input to the plan skill, which handles implementation design.

## How to produce the PRD

### 1. Gather context

- If `$ARGUMENTS` references an idea file (e.g. `docs/ideas/005-workspace-snapshots.md`), read it as the starting point.
- If gorilla ran earlier in this conversation, use the resolved decisions and constraints.
- If starting from scratch, ask the user to describe the problem they want to solve.

### 2. Assess readiness

If the problem space feels underexplored — the user can't clearly articulate the problem, the solution direction is vague, or there are many open questions — offer to run gorilla first. Don't force it, just offer.

### 3. Build the PRD

Work through the four sections of the template at `${CLAUDE_SKILL_DIR}/references/template.md`:

**Problem** — Terse. What's broken or missing, who's affected. Don't pad this — if it takes more than a few sentences, the problem isn't well understood yet.

**Needle** — Terse, positive framing. What changes in the world if we solve this. This is not the solution — it's the outcome. One or two sentences.

**Solution** — From the user's perspective. Elaborates on the needles being moved. Describes the shape of the solution without implementation details. This section can be longer — it should give enough detail that someone reading it understands what we're building and why.

**User Stories** — Extensive numbered list covering the full surface of the solution. Each story follows: `As a [actor], I want [feature], so that [benefit]`. These become the raw material for plan phases and acceptance criteria, so thoroughness matters. Push for completeness — it's cheaper to cut stories later than to discover missing ones during implementation.

Explore the codebase as needed to ground the PRD in reality — existing behaviour, relevant code, constraints that affect the solution.

### 4. Assess the PRD

Before presenting for acceptance, critically review the PRD:

- Does the problem statement actually describe a problem?
- Does the needle articulate a positive change, not just restate the problem?
- Does the solution stay in the problem space (no implementation details)?
- Do the user stories cover the full surface of the solution?
- Are there implicit assumptions that should be explicit in the solution?

Fix any issues found. This assessment is AI-driven — present findings and revisions to the user, don't just note them.

### 5. Acceptance

Present the complete PRD to the user. Ask rigorous questions to verify shared understanding — similar to gorilla but lighter, focused on confirming alignment rather than deep exploration. The PRD should be mostly correct by this point; acceptance is a final verification.

Iterate until the user explicitly accepts.

### 6. Write to disk

Determine the next available number by checking existing files in `docs/prds/`. If the directory does not exist, create it and start at `001`. Use the format `NNN` (zero-padded to 3 digits).

Write to `docs/prds/NNN-slug.md` using the template format. The slug should be short kebab-case derived from the title. Populate the YAML frontmatter:

- `title` — the PRD title
- `source` — path to the idea file, if the PRD was driven from one (omit if not applicable)

Confirm the file was written.

## Boundaries

- No implementation details — that's the plan's job
- No phased breakdowns, no acceptance criteria — those come from planning
- No beads creation
- No changelog or revision tracking — git handles that
