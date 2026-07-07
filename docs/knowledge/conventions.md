---
tags: [knowledge, conventions]
---

# Conventions

Repo-wide conventions that don't belong to any single package or record. Flat list; each entry is one rule, with a clarifying sentence only where the rule alone could be misread.

- **Categorise by intent, not by kind.** No utility buckets (`utils/`, `helpers/`, `tooling/`) — a module or package is named for the question it answers (`internal/workspace`: "what packages exist here?"), never for the shape of the code inside it.
