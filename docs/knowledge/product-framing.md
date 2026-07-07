---
tags: [knowledge, product, design-language]
---

# Product framing

What urban-ui is for. This is the frame future PRDs sit inside: PRDs add features and functionality to the system; this record holds the needle and the standing decisions that scope them. Distilled from the use-case interrogation for the design-language work (urban-ui-727); the design language and tokenisation layer get their own records ([[design-language]], [[theme-contract]] — forthcoming).

## The needle

An unconstrained learning vehicle — a design system with genuine aesthetic ambition, built agent-first, proven by first-party apps that are themselves learning experiences. Adoption is not the goal; expressive range and craft are.

## Standing decisions

### Audience

First-party ecosystem drives every design decision; public consumers adopt the flavour. Flair is a separable layer over a neutral-capable baseline: "de-cyberpunked" is possible-but-unsupported, never a tested goal.

### Primary archetype

Game-adjacent UI at 4X/RTS information density — Football Manager, Stellaris, Civilization are the reference points. Interactive controls, panels, and layouts are the core surface; editorial content is supported-secondary. Density and flair are one target, not two poles: the primary archetype is simultaneously the flair-maximal and density-maximal case.

### Game UI is real

Both app-chrome and in-game UI are named use-cases, leaning game UI. Materials are defined to survive arbitrary backdrops — an engineering contract (contrast guarantees via scrim/blur/opacity floors), not a styling choice. This also serves high-aesthetic OS-style applications (the linux-ricing bar: translucent, glowing, daily-driver legible). No engine integration or frame budgets in v1; gamepad navigation is deferred but stated ([[watch-items]]).

### Coherence model

The invariant is the contract, not the values. The theme schema (density, radii, motion, layers, color systems as *slots*) and the primitive prop grammar (`variant`, `material`, `shape`, …) are system-defined; every value behind them is theme-configurable. Coherence emerges from shared vocabulary, strong defaults, and guidelines; deviation is the consumer's dial. Flair is expressed per-component through props; theme-steered flair is an open design question for the theme contract.

### Agents-first, human-legible

Docs and guidelines are written for AI agents building apps under human direction: machine-navigable structure, explicit decision rules over prose vibes, examples as executable truth. Humans hold the taste layer — visual comparison and aesthetic judgment stay human. Because guidelines are the coherence-enforcement mechanism and agents amplify them literally, vague guidance is a correctness bug, not a docs-quality issue.

### Accessibility

WCAG AA contrast is the floor for functional content, and it is the *material's* job to guarantee it. Flair never solely carries meaning: a glow may accent a focus ring, never be it. Reduced-motion and reduced-transparency are theme-contract capabilities from day one. Beyond-AA is a non-goal.

### Proving ground

Workbench playground sub-pages held to app standards — full screens, real data shapes, real backdrops: a 4X-style management screen (dense table + panels + overlays over a moody backdrop), later an editorial-themed probe. Agent-built from the guidelines alone, human-reviewed — that loop is the system test for both the design language and the agents-first claim.

### Scope boundary

Primitives plus surface/layout primitives (Panel/Surface, stacks, grids, split layouts, scroll areas) are the priority core — for this archetype, layout is the product as much as controls are. The composed tier stays small and earns its place (data table, command palette): a composed component ships only when the pattern recurs, has real behavioral complexity, and its API is smaller than the guideline explaining it. Everything composed must be constructable by consumers from the design language — composed is convenience, never capability. App-semantic patterns stay guidelines + playground examples. Charts are out of core per the extraction rule ([[0002-package-architecture]]).

### Themes

One flagship theme ships — the cyberpunk identity — dark-first as the working canon: design, VRT baselines, and playground screens run dark by default. Color scheme is a first-degree contract dimension, so light mode is systemically supported even while it trails in polish; flair tokens must define their light-scheme degradation ("undefined in light mode" is not an allowed answer).

### History

v2 exists because styling technology kept dying under previous iterations (stitches, then vanilla-extract) and because agent-built UI is the gap being plugged. The response is to own the contract: the theme schema should outlive any particular styling technology. Previous iterations were generic; v2 is aesthetic-forward — the flair layer is new, unproven territory, hence the proving ground.

### Platform

Desktop-web-first: pointer + keyboard are the designed-for input modes; density and hover patterns get to assume them. RSC compatibility and mobile/touch are soft goals — achievable by design (CSS-variable-carried theming, graceful narrow-viewport degradation) but not focused on.

## Open threads

Owned by the design-language and tokenisation records when they land:

- Theme-steered component flair vs per-component props (the RSC/context tension)
- Material system mechanics: blur/scrim/opacity-floor math behind the contrast guarantee
- The actual theme contract slots: density, layers, motion grammar, color derivation
- Light-scheme degradation rules for glow/material tokens
