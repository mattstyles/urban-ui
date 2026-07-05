---
name: plan
description: Create a structured, phased implementation plan before writing any code. Use this skill whenever the user wants to plan work, design an approach, break down a feature, scope a change, or think through how to implement something before doing it. Trigger on phrases like "let's plan", "how should we approach", "break this down", "what's the plan for", "scope this out", or any request that benefits from structured thinking before implementation. If a task is non-trivial and no plan exists yet, suggest using this skill.
argument-hint: "<PRD reference or description of what to build or change>"
---

# Plan

Create a phased implementation plan for: `$ARGUMENTS`

Planning comes before implementation. No code gets written, no files get changed, until the plan is accepted. The purpose of a plan is to think clearly, surface problems early, and break work into vertical slices that each leave the system in a deployable state.

Read the vertical slices reference at `${CLAUDE_SKILL_DIR}/references/vertical-slices.md` to understand the phasing constraint.

## How to produce the plan

Draft sections 1–6 below in order, outputting each section as you go. Then run the Assessment (section 7) to revise, then Acceptance (section 8) to iterate with the user, and finally Write to disk (section 9) once the plan is accepted. The plan is a conversation — the user will push back, ask questions, and request changes. That's the point.

### 1. Gather context

- If `$ARGUMENTS` references a PRD (e.g. `docs/prds/005-workspace-snapshots.md`), read it. The PRD's problem, needle, solution, and user stories are the foundation.
- If gorilla ran earlier in this conversation, use the resolved decisions and constraints.
- If starting from a freeform description, treat `$ARGUMENTS` as the basis.
- Explore the codebase to understand the current state — existing behaviour, relevant code, constraints.

### 2. Goal

State what we want to achieve in 1–2 sentences. Be specific about the outcome, not the method. If working from a PRD, derive the goal from the problem and needle. If the user's request is vague, sharpen it — don't just echo it back.

### 3. Acceptance Criteria

Define a numbered list of observable, testable outcomes that determine when the plan is complete. These should be things you can verify by doing — not by reading code.

If working from a PRD, link each criterion to the user stories it satisfies (e.g. `AC 1: [criterion] (traces to User Story 3, 7)`). Every user story should be covered by at least one AC.

Good acceptance criteria are specific enough that two people would agree on whether each one has been met. "The feature works" is not testable. "Submit 'create a login page' in the prompt input and see a login form render in the iframe within 60 seconds" is.

### 4. Design Decisions

List architectural and technical choices that constrain the implementation. These are not code-level details — they're the significant choices that shape the approach.

For each decision, state the choice and the rationale. If alternatives were considered, note why they were rejected. If a decision was made during an earlier gorilla or PRD session, reference it rather than re-deriving it.

### 5. Risks

Identify what could go wrong or get complicated:

- **Technical risks** — things that might not work as expected, unknowns, performance concerns
- **Scope risks** — things that could expand beyond the stated goal, rabbit holes
- **Integration risks** — things that could break existing behaviour or conflict with other work

For each risk: severity (high / medium / low) and a mitigation if you have one. Don't pad this section — if there are genuinely few risks, say so.

Risks inform phase ordering — higher-risk phases go first to surface problems early, when there's still room to change course.

### 6. Phases

Break the work into phases. The critical constraints:

- **Every phase is a vertical slice.** Each phase delivers a thin but complete path through the product — from user action to observable outcome. No horizontal layers. Read `${CLAUDE_SKILL_DIR}/references/vertical-slices.md`.
- **Every phase is deployable.** The system should be shippable after any phase completes, even if later phases never happen.
- **Risk-first ordering.** Higher-risk phases come first to uncover problems early.

Format each phase using the structure from `${CLAUDE_SKILL_DIR}/references/phase-template.md`.

Each phase must list which plan-level ACs it covers. Every AC must appear in at least one phase. Phase-level ACs are more granular than plan-level ACs and should describe user-observable outcomes.

Prefer more phases with fewer concerns over fewer phases with many concerns.

### 7. Assessment

Step back and critically assess the plan. This is AI-driven — do the work, don't just list concerns:

- **Viability** — will this actually work? Are there technical assumptions that haven't been validated?
- **Inconsistencies** — do the phases contradict each other? Do the ACs conflict?
- **Omissions** — what's missing? Are there user stories from the PRD that aren't covered?
- **Vertical slices** — is every phase a genuine vertical slice, or are any phases horizontal layers masquerading as slices?
- **Risk ordering** — are higher-risk phases genuinely front-loaded?
- **Simplification** — can phases be merged or removed? Is there unnecessary complexity?

If the assessment reveals problems, revise the plan and call out what you changed and why.

### 8. Acceptance

Present the complete plan to the user and ask rigorous questions to verify shared understanding — similar to gorilla but focused on confirming alignment rather than deep exploration. The plan should be mostly correct by this point; acceptance is a final verification.

When the user requests changes, revise the plan, re-run the assessment, and re-present. Always show the complete picture, not just a diff. Do NOT write to disk while iterating.

Keep iterating until the user explicitly accepts.

### 9. Write to disk

Only after explicit acceptance, write the plan to disk.

Determine the next available number by checking existing files in `docs/plans/`. If the directory does not exist, create it and start at `001`. Use the format `NNN` (zero-padded to 3 digits).

Write to `docs/plans/NNN-slug.md` using the template at `${CLAUDE_SKILL_DIR}/references/plan-template.md`. The slug should be short kebab-case derived from the goal. Populate the YAML frontmatter:

- `title` — the plan title
- `source` — path to the upstream artefact (PRD or idea file), if the plan was driven from one (omit if not applicable)

Confirm the file was written.

## On acceptance

After writing the plan to disk, offer to run the breakdown skill to create beads issues for implementation tracking. Do NOT create beads directly — that's the breakdown skill's responsibility.

## Boundaries

- No step-by-step action checklists within phases — the implementer determines how using TDD
- No code changes
- No beads creation (that's the breakdown skill)
