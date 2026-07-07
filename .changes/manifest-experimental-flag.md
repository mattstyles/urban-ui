---
core: patch
---

Component manifests (`urban-manifest.json`) now carry an `experimental` flag
per component: `false` across `@urban-ui/react`, `true` for labs components —
tooling reading manifests can distinguish the tiers.
