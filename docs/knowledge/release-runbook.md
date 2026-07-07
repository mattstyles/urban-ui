---
tags: [knowledge, release, publishing]
---

# Release runbook

How a train departs, end to end. The mechanics are scripts in
`internal/release` ([[0004-release-strategy]]: deterministic mechanics are
scripts, judgment is skills); this record is the operator's contract.

## The cycle

1. **Intent rides every PR** — a `.changes/*.md` file (train → bump
   frontmatter, consumer-addressed prose). CI's `intent-gate` job blocks PRs
   that touch published surface without one, name an untouched train, or
   change a manifest silently.
2. **`/release` assembles** — versions from max-bump per train (pre-1.0
   majors become minors; first departures use launch floors), per-package
   `CHANGELOG.md`, `releases/<train>-<version>.json` meta, a narrative for
   the Release body, intents consumed. The release PR is the review surface.
3. **Merging the release PR departs the train** — the Publish workflow fires
   on `releases/**` landing on main: per-package `bun publish
   --tolerate-republish` (idempotent — partial failures re-run safely), one
   hyphen tag per train (`core-v0.10.0`, `labs-v0.2.0`, `urban-v1.2.3`), a
   GitHub Release carrying the narrative.

## Rehearsal

Everything short of `npm publish` and Release creation, runnable any time:

```bash
mise run publish-rehearsal   # pack, verify workspace:/catalog: rewrites from
                             # the tarball, publint + attw, bun publish --dry-run
mise run consumer-smoke      # install the packed tarballs into a scratch Vite
                             # consumer (one-line unplugin config), build,
                             # assert token CSS + Button reach the output
```

The Publish workflow runs both before any real departure, and
`workflow_dispatch` in `rehearsal` mode (the default) runs only them.

## The first real departure

**Is a decision, not a change.** Everything is rehearsed; nothing has
published. When there is content worth `0.10.0`:

1. Confirm `NPM_TOKEN` exists as a repo secret (npm auth is an open
   question — watch bun #15601 for OIDC/provenance; a granular token is the
   interim answer, [[watch-items]]).
2. Run `/release`, review the release PR (versions, changelogs, narrative,
   meta), merge it.
3. The Publish workflow departs the train. No code changes required — only
   the merge.

## Previews

pkg.pr.new builds installable previews from every PR (`preview.yml`) — the
stand-in for a prerelease channel by design. One-time setup: install the
pkg.pr.new GitHub App on this repository; until then the publish step is
`continue-on-error` and PRs are not blocked.
