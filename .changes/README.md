# Release intent files

Every PR touching published package source carries an intent file here —
CI enforces it ([[0004-release-strategy]]). The file is the changelog entry:
frontmatter maps release **train** → bump level, and the prose is addressed
to the design system *consumer*, not a PR summary.

```md
---
core: minor
---

Button gains an `isPending` state that disables press events while showing
progress. Existing buttons are unaffected.
```

- Trains, not packages: `core` (everything under packages/ except
  packages/labs, lockstep), `labs` (packages/labs, its own 0.x line), and one
  train per CLI binary (e.g. `urban`). Graduation names two trains:
  `core: minor`, `labs: major`.
- Bump declares *semantics* (`major` = breaking); pre-1.0 trains version
  breaking changes as minors — the mapping happens at assembly.
- Filename is a short kebab slug of the change (`button-pending-state.md`).
- Pending release state is `ls .changes/`. Files are consumed by `/release`.
