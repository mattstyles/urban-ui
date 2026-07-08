---
slug: composed-constructable
stratum: language
strictness: default
---

# composed-constructable

Every composed component MUST be constructable by consumers from primitives and the design language — composed is convenience, never capability.

## Rationale

If a composed component can't be rebuilt from the documented system, the primitive layer has a gap — the composed tier was hiding it. The construction path has to be documented anyway (agents-first docs), which keeps the composed tier small and honest: it ships recurrence and behavioural complexity, not secret powers.

## Examples

### Incorrect

A command palette relying on private internals no consumer could reach.

### Correct

The shipped command palette as a documented composition of overlay, input, and list primitives.

## Evidence

Session-1 Decision 8 ([[product-framing]]).
