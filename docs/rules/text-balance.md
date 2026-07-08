---
slug: text-balance
stratum: language
strictness: default
enforcement: review
---

# text-balance

Classify text by what it balances against: its environment → UI scale; itself → editorial scale.

## Rationale

UI text is an element among elements — it sizes against neighbouring controls and panels, favouring density. Editorial text is a self-contained reading experience — body-anchored, internally rhythmic, generous. Single-scale systems fail exactly here: editorial headers need far more differentiation from body than panel headings need from labels. The test settles boundary cases mechanically: an error message balances against its field → UI; long-form you actually read → editorial.

## Examples

### Incorrect

Rendering a settings description with `editorial.body`.

### Correct

Error messages, field descriptions, tooltips → UI scale; a changelog entry → editorial.

## Evidence

Recorded at founding (urban-ui-727); the two-scale decision.
