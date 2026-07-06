---
status: accepted
date: 2026-07-06
tags: [adr, cli, rust, knowledge, tooling]
---

# ADR-0003 — The urban CLI: language, versioning, and delivery

## Context

- The product is defined in the [[001-urban-cli]] PRD: a self-documenting CLI that answers design-system questions from knowledge shipped inside the installed packages. This record fixes the architectural decisions around it — implementation language, versioning and compatibility, and how it ships.
- The audience is JS repositories, but the tool must not entangle itself with the consumer's JS toolchain: no Node version negotiations, no install-order hazards. It reads files out of `node_modules`; it never executes JS.
- Future scope (v1.1+) includes checks against consumer code, which means parsing TSX at scale.
- Repo charter: CLIs are standalone and never build-dependencies of the JS packages ([[0001-repository-structure]]).

## Decision

- **Rust** — decided for `urban` specifically; language remains a per-CLI choice under the repo charter, so this sets no precedent for future tools. The deciding factors:
  - The parser ecosystem the roadmap needs: oxc and tree-sitter make consumer-TSX analysis (v1.1+) native territory, and align with the repo's existing oxc bets ([[0006-component-quality-stack]]).
  - Single static binary with fast cold start — agents invoke the tool per-question; startup latency is product quality.
  - dist for release automation (GitHub Releases, installer generation, attestations) — actively maintained, proven at scale by uv.
- **Engine/frontend split**: the query engine is a library crate; the CLI binary is a thin frontend over it. `urban mcp` (v2) becomes a second frontend, not a rearchitecture.
- **Knowledge home** — installed-first: the CLI answers from manifests, prose, and examples shipped inside the installed packages ([[0002-package-architecture]], [[package-anatomy]]), discovered via the `package.json` `"urban"` marker rather than hardcoded names. Drift is impossible by construction, and the marker is what lets a consumer's own components join the queryable graph later. Resolution behaviour and command surface are product territory: [[001-urban-cli]].
- **Versioning**: the CLI versions independently of the design-system packages ([[001-urban-cli]] story 21), on its own release train ([[0004-release-strategy]]). It launches at 0.x — breaking changes version as minors, the same convention as labs — until the command surface and compatibility contract prove out. The public API is the command surface: commands, flags, output contracts, exit codes ([clig.dev](https://clig.dev/) is the reference).
- **Compatibility contract**: the manifest's `schemaVersion` ([[package-anatomy]]) is the coupling point between the two version lines. The CLI declares a supported schema range; `doctor` reports too-old/too-new with the remedy. A package release that bumps the schema version and a CLI release that drops support for an old schema are both breaking events on their respective trains.
- **Release and distribution** — the [[0004-release-strategy]] binary train: intent files on the `urban` train, assembled by the same `/release` flow; merge cuts the hyphen tag (`urban-vX.Y.Z`); dist builds the artifact matrix into GitHub Releases with attestations. **Consumption is via mise** (`github` backend). The npm installer is deferred; crates.io is an optional secondary channel.

## Consequences

- A Rust toolchain enters the repo for a JS-facing product. Contained: `packages/urban` pins its own toolchain via mise, and the loose-coupling invariant means JS contributors never build it.
- No JS-native install path at launch — consumers without mise download from GitHub Releases by hand. Accepted; the deferred npm installer is the recorded remedy if the audience demands one.
- The engine/frontend split costs a little structure now and buys MCP serving later without rework.
- Knowledge reading is file parsing only (JSON manifest, markdown, source text) — no embedded JS runtime, keeping the binary small and the trust surface minimal.
- `schemaVersion` discipline becomes load-bearing from day one: the manifest schema must change consciously, because it is the compatibility contract two release trains pivot on.

## Open questions

- Schema-range policy: how wide a supported range, and the deprecation window when dropping old schemas → design alongside the manifest schema work (extractor, [[0006-component-quality-stack]]).
- crates.io channel timing — shared with [[0004-release-strategy]].
