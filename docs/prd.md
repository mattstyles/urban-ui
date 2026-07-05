---
tags: [index, prd]
---

# Product requirements documents

Entrypoint for all PRDs in this repository. A PRD defines the problem space — what we're solving and for whom — not how to build it. It is the input to implementation planning; the *how* lands in plans and, where architecture is decided, in [[adr]] records.

## Format

Every PRD follows the same four sections:

- **Problem** — terse; what's broken or missing, and who's affected
- **Needle** — terse, positive; what changes in the world if we solve it
- **Solution** — the shape of the solution from the user's perspective, free of implementation detail
- **User stories** — extensive numbered list covering the full surface; the raw material for plan phases and acceptance criteria

Records live in `docs/prds/` and are numbered `NNN-slug.md`. Link between documents with `[[wiki-links]]`.

## Records

- [[001-urban-cli]] — the `urban` CLI: installed-first design-system knowledge, navigable by AI agents
