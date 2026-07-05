---
tags: [index, adr]
---

# Architectural decision records

Entrypoint for all ADRs in this repository. Each record captures one architectural decision: the context it was made in, the decision itself, and its consequences. Records are immutable once accepted — a change of direction is a new ADR that supersedes the old one, so the trail of reasoning is never lost.

## Format

Every ADR follows the same structure:

- **Frontmatter** — `status` (`proposed` | `accepted` | `superseded by [[link]]`), `date`, `tags`
- **Context** — the forces at play: requirements, constraints, and what prompted the decision
- **Decision** — what we chose, as bullets, stated in the active voice
- **Consequences** — what becomes easier, what becomes harder, what we've accepted as a trade-off
- **Open questions** — optional; unresolved threads, each linking to the (possibly not-yet-written) ADR that will resolve it

Records live in `docs/adr/` and are numbered `NNNN-title.md`. Link between records with `[[wiki-links]]`; links to records that don't exist yet are deliberate — they mark decisions we know are coming.

## Records

- [[0001-repository-structure]] — dev environment (mise/hk/bun), no build orchestrator, monorepo layout — **accepted**
- [[0005-style-shipping-and-package-build]] — consumer-compiles StyleX, peer-dep trio, tsc-only ESM build — **accepted**
- [[0006-component-quality-stack]] — hand-rolled playground, committed VRT baselines via Playwright, Vitest units, oxc static gates — **accepted**

## Planned

- [[0002-package-architecture]] — two-tier publish shape: lockstep core + independently versioned labs
- [[0003-urban-cli]] — the `urban` CLI: how it gathers and surfaces design-system knowledge to AI agents (see [[001-urban-cli]] PRD)
- [[0004-release-strategy]] — intent capture, changelog assembly, and publish mechanics for npm packages and CLI binaries

Conventions notes (not ADRs): [[package-anatomy]]
