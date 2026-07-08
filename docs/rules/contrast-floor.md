---
slug: contrast-floor
stratum: language
strictness: law
enforcement: machine
---

# contrast-floor

WCAG AA contrast is the floor for functional content — text, controls, focus indicators — and it is the material's job to guarantee it.

## Rationale

Materials are where legibility is decided: `solid` guarantees via the `fill`×`onFill` pairing; `glass` via its scrim/opacity floor over arbitrary backdrops. Making the guarantee a material property turns per-component contrast review into a checkable token-level contract — which matters when reviewers are agents who can verify a stated number but can't eyeball "is this readable".

## Examples

### Incorrect

A glass panel whose legibility depends on the page behind it happening to be dark.

### Correct

Glass carrying a scrim floor that holds marks-band AA over a worst-case backdrop.

## Evidence

Session-1 Decision 6 ([[product-framing]]); mechanised in urban-ui-727.
