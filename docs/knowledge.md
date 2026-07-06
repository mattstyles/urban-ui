---
tags: [index, knowledge]
---

# Knowledge

Entrypoint for the repository's knowledge records: durable conventions and contracts that describe *how things are*. Where an ADR ([[adr]]) captures a decision at a point in time — immutable once accepted — and a PRD ([[prd]]) defines a problem space, knowledge records are **living documents**: they evolve with the repo and are corrected in place. When a record changes direction rather than detail, the decision behind the change belongs in a new ADR; the knowledge record then reflects it.

These are the repo-level counterpart of the knowledge the packages ship for the `urban` CLI ([[001-urban-cli]]): the same philosophy — legible to agents, validated where possible, wiki-linked into a graph — aimed at contributors and repo tooling rather than consumers.

## Format

- **Frontmatter** — `tags`, including `knowledge`
- Body favours contracts over narration: layouts, schemas, templates, rules that tooling and agents can glob and rely on
- Link related records with `[[wiki-links]]`; links to records that don't exist yet mark knowledge we know is coming

Records live in `docs/knowledge/`.

## Records

- [[package-anatomy]] — the contract for what every publishable package contains: layout, component anatomy, authored-guidance template, manifest, definition of done
- [[watch-items]] — living register of external events, pins, and revisit triggers committed to in ADRs
