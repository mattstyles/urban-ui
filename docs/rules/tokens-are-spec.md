---
slug: tokens-are-spec
stratum: contract
strictness: law
---

# tokens-are-spec

Tokens are implementation-independent: the contract is a specification; CSS custom properties, JS values, or documented conventions are carriers.

## Rationale

Previous iterations died with their styling technology (stitches, vanilla-extract). The schema must outlive any carrier — StyleX is one implementation of the system, not the system. Some contract members (e.g. the `profile` vocabulary) may never be CSS values at all.

## Examples

### Incorrect

Designing a token that only makes sense as a StyleX var (e.g. encoding behaviour in a carrier-specific hack).

### Correct

Defining `profile: square · straight · round` as a vocabulary, carried today by the shape generator's API.

## Evidence

Recorded at founding (urban-ui-727); dependency-churn scar tissue in [[product-framing]].
