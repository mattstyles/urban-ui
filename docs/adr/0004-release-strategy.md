---
status: accepted
date: 2026-07-06
tags: [adr, release, versioning, changelog, publishing]
---

# ADR-0004 — Release strategy

## Context

- The repository publishes npm packages in two tiers under `packages/` — a lockstep core train, and an independently versioned 0.x labs tier (`packages/labs`) — plus standalone CLI binaries from Rust/Go packages ([[0001-repository-structure]], [[0002-package-architecture]]).
- Working model: agents author most code; the human reviews pull requests. Every quality gate must be PR-reviewable and agent-self-serviceable — GitHub is the review dashboard.
- The release problem splits into two planes: the **meta plane** (capturing version intent, assembling changelogs) and the **publish plane** (tags, npm publish, GitHub Releases).
- Prior iterations used changesets end-to-end. Re-evaluated here: `changeset publish` ships broken `workspace:*` in bun repos, while `bun publish` rewrites the workspace protocol correctly at pack time; and the two-tier shape collapses the version math (max-bump over one fixed group plus one 0.x line) to a page of code — the same shape-collapses-complexity argument that removed the build orchestrator in [[0001-repository-structure]].
- Survey of AI-assisted release tooling (communique, copilot-release-notes, GitHub generated notes): all harvest merged PRs into post-hoc prose, and all pair with a separate mechanism for version math. None lets a model decide bumps, and no cargo-semver-checks equivalent exists for TypeScript — API-diff bump validation is custom-built anywhere, tractable here because component manifests are a constrained domain.

## Decision

We build the release cycle from skills and scripts rather than adopting changesets, on one principle: **deterministic mechanics are scripts** (in `internal/`, tested with `bun test` against fixtures), **judgment is skills** (agent-executed, output reviewed in PRs), and **CI enforces the contract between them**.

### Intent capture — per pull request

- Every PR touching published package source carries an **intent file** in `.changes/*.md`: changesets-shaped frontmatter mapping release train → bump level (`core: minor`, `labs: patch`), plus prose addressed to the design system *consumer* — it is the changelog entry, not a PR summary.
- Intent declares the **train, not the package**. The core train versions in lockstep, so a group-level bump suffices; per-package precision is recovered at assembly time from manifest diffs.
- The agent that authors the PR authors the intent, as part of the PR-authoring flow. The claimed semver impact and the changelog prose are reviewed in the same diff as the code.
- Intent lives on disk, not in PR descriptions. Files are frozen by the merge commit — what was reviewed is exactly what the release train consumes. PR bodies stay mutable after approval and CI checks do not re-run on body edits, so they are demoted to enrichment input (see Assembly). Pending-release state is `ls .changes/` — offline, scriptable, fixture-testable — and intent survives cherry-picks and reverts because it travels with the commit.
- CI gates, as scripts: package source touched with no intent file → fail; intent naming an untouched train → fail; a published manifest changed with no intent file → fail.
- The **semver oracle** is staged. Git-tracked component manifests (the ts-morph extractor built for [[0003-urban-cli]], see [[package-anatomy]]) follow api-extractor's API-report pattern: API changes surface in the PR diff, CI fails on stale manifests. v1 ships only the presence gate above; the full classifier — "intent says patch, manifest diff shows a removed export" — lands once the manifest schema stabilises. Until then bump levels are reviewed but unverified, which is parity with changesets.

### Assembly — at the release point

- Releases are deliberate. A train departs when a human invokes the `/release` skill (or dispatches the workflow manually) — never automatically on merge.
- A script computes versions: max bump across accumulated intents per train. Intent declares semantics (`major` = breaking); the script maps semantics to numbers by train state — a pre-1.0 train versions breaking changes as minors (labs permanently; core until it commits to 1.0, [[0002-package-architecture]]). Graduation out of labs is a component move to the core train, not a labs version event — it lands as a `minor` on both trains.
- The agent assembles a **release PR**: versions applied, intent files consumed, changelogs written, and machine-readable release meta emitted as JSON. The narrator synthesises from three sources — intent prose, manifest diffs, and the linked PRs' descriptions (motivation, migration detail, screenshots) — rather than concatenating entries.
- Changelogs land in **both** places: per-package `CHANGELOG.md` as the durable npm-visible record, and a release-level narrative that becomes the GitHub Release body.
- The release meta JSON is designed to be queryable by the `urban` CLI — releases join the knowledge graph ([[0003-urban-cli]]).
- The release PR is the review surface. Merge is the commitment point.

### Publish — on release-PR merge

- CI tags the train (one tag for the core train, one for labs), runs a per-package `bun publish --tolerate-republish` loop — idempotent, so partial failures re-run safely — and creates the GitHub Release carrying the narrative notes.
- `publint` + `@arethetypeswrong/cli` gate package shape before publish (ratified in [[0005-style-shipping-and-package-build]]).
- pkg.pr.new provides preview builds from PRs; there is no other prerelease channel (see Consequences).

### The binary train

- Each CLI (a Rust/Go package under `packages/`, e.g. `packages/urban`) is its own release train. Binaries never ride the npm train — the esbuild/biome-style npm installer is **explicitly deferred**, and stays cheap to add later (dist generates installer packages).
- CLI trains share the meta plane: an intent file names the CLI's train (`urban: minor`), and the same `/release` flow assembles its version bump and changelog into the release PR. Merging cuts a hyphen tag per CLI (`urban-v1.2.3`) — slash tags exist only to serve `go install`, which we do not support.
- The tag triggers the binary pipeline: dist (Rust) or GoReleaser (Go) builds the artifact matrix — OS/arch in filenames, `checksums.txt` — and publishes to **GitHub Releases**, the primary channel, with GitHub artifact attestations.
- **Consumption is via mise**, using the `github` backend (the ubi backend is deprecated), which verifies attestations by default. A registry short name (aqua-registry PR → mise registry PR) is a later nicety.
- crates.io is an optional secondary channel for Rust CLIs — `cargo publish` alongside the tag, when a cargo-native install path earns its keep.

### Libraries we keep

- `Bun.semver` for version comparison — no dependency at all.
- The changesets *file shape* (frontmatter map + prose body) without the library: human-legible in review, ~30 lines to parse, and an escape hatch back to the ecosystem if the custom cycle disappoints.
- Rejected: commit-message conventions and git-cliff-style log mining — intent files plus manifest diffs make commit archaeology redundant.

## Consequences

- We own the version math. Accepted because the two-tier shape keeps it small, and the scripts are ordinary tested code in `internal/`. The trade is our-scripts-our-bugs against a dependency whose publish path we would have to work around anyway.
- No prerelease machinery — no RC/beta trains, no snapshot state. Labs *is* the experimental channel and pkg.pr.new covers previews. Revisit when core faces a breaking release large enough to demand an RC period.
- Bump levels rest on review alone until the manifest classifier lands.
- Intent ceremony lands on agents; the human cost is reviewing one small file per PR — which is the point of the design.
- Release assembly needs nothing but the repository — no API access, no network — so the version math is testable against fixture directories. (The narrator reads linked PRs for enrichment, but a network-less assembly still produces a correct, if terser, release.)
- Installing a CLI requires mise (or a manual GitHub Releases download) until the crates.io or npm channels open. Accepted: mise is already this repo's spine, and the deferred npm installer is the recorded path if the CLI's JS-repo audience demands a native one.

## Open questions

- npm auth: bun-native granular token (simple; no provenance; 90-day expiry) vs npm CLI with OIDC trusted publishing + provenance. Watch bun #15601 (publish OIDC support).
- The manifest schema gates the full semver oracle → [[0003-urban-cli]].
- Release meta JSON schema — design alongside the urban CLI manifest work.
- Whether/when to open the crates.io channel for Rust CLIs; npm installer timing rides demand from JS-repo consumers.
