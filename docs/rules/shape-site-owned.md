---
slug: shape-site-owned
stratum: language
strictness: default
enforcement: review
---

# shape-site-owned

Geometry application is site-owned: which deformations an element carries, where, and at what aspect are design decisions at the site — never theme-global rules.

## Rationale

Geometry is composition, and composition is site-dependent — a large button may earn a top notch its smaller sibling doesn't; one panel family chamfers top-left, another bottom-right. A theme dictating "all corners rounded" or "all panels notched" makes every silhouette a reskin instead of a design. Themes own the *vocabulary* (the `depth` ramp, `profile` defaults are values); sites own the *application*. Recurring recipes become named presets, earned by recurrence.

## Examples

### Incorrect

A theme token that forces a notch onto every container.

### Correct

A Card family choosing its own chamfer placement, with depths drawn from the ramp.

## Evidence

Recorded at founding (urban-ui-727), correcting an over-reach toward theme-owned profiles.
