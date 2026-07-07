---
tags: [knowledge, conventions]
---

# Conventions

Repo-wide conventions that don't belong to any single package or record. Flat list; each entry is one rule, with a clarifying sentence only where the rule alone could be misread.

- **Categorise by intent, not by kind.** No utility buckets (`utils/`, `helpers/`, `tooling/`) — a module or package is named for the question it answers (`internal/workspace`: "what packages exist here?"), never for the shape of the code inside it.
- **Prefer single-arity functions.** A function that needs more than one value takes a single object with named fields, not a parameter list.
- **Colocate tests with implementation.** `src/thing.test.ts` sits beside `src/thing.ts` — no separate `test/` trees for test files (fixture directories may still stand alone).
