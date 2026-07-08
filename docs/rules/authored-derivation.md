---
slug: authored-derivation
stratum: contract
strictness: default
enforcement: review
---

# authored-derivation

Derived colour values (`color-mix`, curve transforms) are authoring tools; results SHOULD land as authored group values, not runtime dependencies.

## Rationale

Group completeness is the coherence guarantee — a theme's identity must not depend on runtime math whose output nobody reviewed. Deriving (a glow gradient mixed from `glow` and `fill`, a first-draft light scheme transformed from dark) is encouraged at authoring time; the derived value is then committed, reviewable, and tunable by eye.

This rule targets *novel values* computed from arbitrary inputs. A runtime `color-mix` over semantic tokens at a call site — an emphasis wash per [[emphasis-pair]], a scrim assembled per [[shade-tint-derive-only]] — is not a derivation in this sense: those mixes *are* the sanctioned grammar, every input is a governed token, and the recipe itself is the reviewed artifact.

## Examples

### Incorrect

A component curve-transforming the raw seed at runtime to invent a wash colour no group ever declared.

### Correct

A lab route deriving candidate values; the chosen result written into the group.

## Evidence

Recorded at founding (urban-ui-727), from the glow-gradient and light-scheme-derivation discussions.
