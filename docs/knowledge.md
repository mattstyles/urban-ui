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

- [[product-framing]] — what urban-ui is for: the needle and standing decisions (audience, archetype, coherence model, agents-first, scope, themes) that frame all future PRDs
- [[design-language]] — how rules work: the three strata (contract/language/flagship), the flat evidence-based rule register, the deviation model, and the seed rules
- [[theme-contract]] — the token architecture: coherence groups, var/group/category/theme tiers, and the per-domain schema (colour, materials, shape, text, space)
- [[package-anatomy]] — the contract for what every publishable package contains: layout, component anatomy, authored-guidance template, manifest, definition of done
- [[release-runbook]] — how a train departs: intent → assembly → merge-as-departure, rehearsal commands, the first-release decision, previews
- [[watch-items]] — living register of external events, pins, and revisit triggers committed to in ADRs
