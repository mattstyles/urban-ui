---
tags: [conventions, packages, knowledge]
---

# Package anatomy

The contract for what every publishable package contains. This anatomy is load-bearing: it is what makes packages legible to agents, to repo tooling (extractor, validators, the workbench playground, the VRT app), and to the `urban` CLI ([[001-urban-cli]]). Tooling globs by these conventions and never assumes beyond them.

## Package layout

```
packages/react/
├── package.json          # "urban" manifest marker; peers: react, react-aria-components, stylex
├── mise.toml             # tasks: build, test, typecheck, vrt (sources/outputs declared)
├── philosophy.md         # system-level decision rules                → shipped
├── patterns/             # composition recipes that don't export code → shipped
│   └── forms.md
└── src/
    └── button/           # one folder per component
```

- **theme** mirrors this minus components: token sources (`*.stylex.ts`), token docs, root philosophy for token usage.
- **labs** mirrors the component level only — no `patterns/` (a labs experiment needing a patterns entry is a graduation smell).

## Component folder anatomy

```
src/button/
├── button.tsx            # implementation                      → shipped (dist)
├── button.md             # authored guidance (template below)  → shipped
├── button.test.tsx       # behavioural + pattern tests         — repo-only
├── *.visual.tsx          # visual scenes (glob; 1+ files,      — repo-only
│                         #   or visual/ subfolder)
├── __screenshots__/      # committed VRT baselines             — repo-only
├── examples/             # minimal teaching examples           → shipped
│   └── basic.tsx
└── index.ts
```

There is no spec file: **the spec is a working draft in the epic bead** (the `breakdown` flow creates the epic + child issues). Beads track work and are never a knowledge source — closed beads are retained but not read ([[0007-working-model]]). Durable spec content graduates on completion: behavioural requirements → tests, usage intent → `button.md`, planned examples/scenes → their files, design decisions worth keeping → ADRs ([[adr]]). The spec template lives with the spec skill: overview, anatomy tree, API sketch, behaviour & states, styling plan, a11y contract, decisions & open questions, graduation checklist.

## Authored guidance (`<component>.md`)

The **why/when layer only**. The manifest is *what* (facts — no prop tables in prose); examples are *show* (no duplicated code). Sections:

- **Purpose** — one paragraph
- **When to use / when not** — decision guidance; wiki-link alternatives (links become graph edges)
- **Composition** — what it sits inside, what goes inside it
- **Prop intent** — semantics of variant/tone choices, defaults philosophy
- **Behaviour notes** — semantics not expressible in types
- **Anti-patterns** — the mistakes you'd correct in review
- **Examples** — sparse pointers: each example named, one line on what it teaches

Every component/prop/token/example name referenced in prose is validated against the manifest in CI.

## Examples

- Plain consumer code: real imports via the package's public exports, no framework idioms — the primary reader is an LLM learning usage.
- Pedagogy over coverage: demonstrate each axis once; never enumerate matrices.
- Verified four ways, all via the generated VRT app bridge: typecheck (against public exports), real-browser render, axe pass, committed screenshot.

## Visual scenes (`*.visual.tsx`)

- Coverage over pedagogy: exhaustive state/prop matrices (`crossProps` helper in `internal/`), stress cases, interaction states.
- **One export = one screenshot, and exports are logical groupings** — one scene per axis (states, colour, size, content stress), composing its members in a single capture with a caption naming each. Per-state exports create baseline churn and review fatigue; grouped scenes make an axis one reviewable image. Adding a member changes only that group's baseline; a new axis is a new export, so groups never reshuffle each other.
- Screenshot naming schema: `src/<component>/__screenshots__/<file-stem>/<export-name>.png` — stable paths keep PR image diffs meaningful.
- Overlay scenes capture at viewport level (portals escape element roots).
- Scene baselines are the **regression gate**; example baselines are **review evidence** (expected to change with legitimate visual change).

## Manifest

- Generated at build (ts-morph extractor in `internal/`); never authored, never contains prose.
- Single discovery entrypoint: `package.json` → `"urban": { "manifest": ... }`; the manifest indexes every doc, pattern, and example with published paths.
- Carries typed graph edges extracted from wiki-links in authored prose. Direction rule: labs may link into stable; **stable never links into labs**.
- `schemaVersion`ed; name uniqueness across components/patterns/token-groups enforced at build.
- Doubles as the semver oracle ([[0004-release-strategy]]) and the validation spine for all authored content.

## Definition of done (per component)

spec bead accepted → implement + document + examples → tests pass → scenes + baselines committed → manifest generates; prose/example/graph validation passes → release intent filed (`.changes/`, [[0004-release-strategy]]). Every gate is PR-reviewable and agent-self-serviceable.

Related: [[0001-repository-structure]], [[0002-package-architecture]], [[0005-style-shipping-and-package-build]], [[0006-component-quality-stack]], [[001-urban-cli]].
