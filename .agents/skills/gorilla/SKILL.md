---
name: gorilla
description: Interview the user relentlessly about a plan or design until reaching shared understanding, resolving each branch of the decision tree. Use when user wants to stress-test a plan, get grilled on their design, or mentions "grill me".
argument-hint: "<what to grill — a concept, idea reference, or design direction>"
---

# Gorilla

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

If `$ARGUMENTS` references an idea file (e.g. `docs/ideas/005-workspace-snapshots.md`), read it first to ground the conversation in the captured problem and rough solution.

Ask the questions one at a time.

If a question can be answered by exploring the codebase, explore the codebase instead.

Gorilla is purely conversational. The output is not a file — it flows directly into the next artefact (a PRD or a plan) within the same session. If gorilla runs in isolation, it is up to the user to capture anything they want to keep.
