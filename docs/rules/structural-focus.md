---
slug: structural-focus
stratum: language
strictness: law
---

# structural-focus

Focus is indicated structurally — a ring drawn from `static.focus` with `focus-visible` semantics. Emission or colour shifts never substitute.

## Rationale

Keyboard-first desktop archetype plus react-aria makes focus a first-class rendered state with a legal floor (visible focus is an AA requirement). On an emissive surface, "more glow" is indistinguishable from hover — the failure [[flair-never-sole-carrier]] exists to prevent. One app-wide focus colour keeps the indicator recognisable across every scale and material.

## Examples

### Incorrect

Focus expressed as emission level `hot`.

### Correct

A `static.focus` ring, optionally garnished with glow.

## Evidence

Session-1 Decision 6 ([[product-framing]]); mechanised in urban-ui-727. Ring width/offset tokens tracked in urban-ui-6yb.
