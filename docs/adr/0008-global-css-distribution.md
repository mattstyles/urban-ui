---
status: accepted
date: 2026-07-08
tags: [adr, theme, css, packages]
---

# ADR-0008 — Global CSS distribution

## Context

- The design language commits to global CSS behaviours no component can carry: a browser-smoothing reset, the [[leading-trim]] law (`text-box-trim`, which every spacing value is tuned against), reduced-motion handling (one global implementation, honoured per [[product-framing]]), and `color-scheme`. StyleX deliberately has no global-styles API — element selectors, resets, and `@font-face` are out of its scope; its own docs pair it with a plain CSS file ordered before its output via cascade layers.
- [[0005-style-shipping-and-package-build]] establishes consumer-compiles StyleX and states that packages ship no CSS. That posture was about *compiled component* CSS; it did not anticipate static global CSS.
- Copy-paste distribution (documented snippet) drifts: the trim law is load-bearing for every theme's spacing, and agents-first consumption makes copy-then-diverge likelier, not less.
- Token-shaped globals need no CSS file at all: `defineVars` emits `:root` custom properties, so font/face vocabularies ride the normal token pipeline. Only `@font-face` (font loading) sits outside — deferred to flagship values work.

## Decision

- `@urban-ui/theme` ships **one static CSS file** (`@urban-ui/theme/global.css`), amending the letter of [[0005-style-shipping-and-package-build]] while keeping its spirit: no *compiled component* CSS ships; this file is static, content-stable, and versioned with the theme.
- The file declares **two cascade layers**, `reset` then `base`:
  - `reset` — the adapted Josh Comeau reset plus the animation-timing / `prefers-reduced-motion` snippet. Browser smoothing; a consumer with their own reset opinion can override this layer without breaking urban-ui.
  - `base` — library law: `text-box-trim` ([[leading-trim]]), `color-scheme`, and future global laws. Not optional; components and spacing values assume it.
- Consumers import the file in their CSS entry and configure StyleX to declare these layers first (`useCSSLayers: { before: ['reset', 'base'] }`), so all StyleX output wins over both layers deterministically.
- `urban doctor` verifies the file is imported and the layer ordering is configured.
- Font vocabularies ship as `defineVars` tokens, not CSS; `@font-face` loading is deferred to flagship values work.

## Consequences

- The leading-trim law and reduced-motion handling are versioned, updatable, and un-driftable — a theme upgrade carries global-law changes.
- Consumers gain one mandatory import and one bundler option beyond the ADR-0005 setup; doctor makes both checkable.
- The workbench must adopt the same wiring (`useCSSLayers` object form) — it currently uses `useCSSLayers: true`.
- Firefox's pending `text-box-trim` support means the base layer degrades gracefully looser until it ships; the design is tuned to the trimmed rendering.

## Open questions

- Whether `global.css` splits per-scheme or per-density content later — none anticipated; revisit only on evidence.
