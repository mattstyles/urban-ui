---
slug: authored-derivation
stratum: contract
strictness: default
---

# authored-derivation

Derived colour values (`color-mix`, curve transforms) are authoring tools; results SHOULD land as authored group values, not runtime dependencies.

## Rationale

Group completeness is the coherence guarantee — a theme's identity must not depend on runtime math whose output nobody reviewed. Deriving (a glow gradient mixed from `glow` and `fill`, a first-draft light scheme transformed from dark) is encouraged at authoring time; the derived value is then committed, reviewable, and tunable by eye.

## Examples

### Incorrect

A component computing its hover wash at runtime from arbitrary inputs.

### Correct

A lab route deriving candidate values; the chosen result written into the group.

## Evidence

Recorded at founding (urban-ui-727), from the glow-gradient and light-scheme-derivation discussions.
