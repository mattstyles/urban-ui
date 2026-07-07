---
name: release
description: Assemble a reviewable release PR — versions computed from accumulated .changes/ intents, changelogs written, narrative synthesized, release meta emitted. Use when the user says "cut a release", "release the core train", "assemble a release", or invokes /release. Releases are deliberate; never run this automatically on merge.
---

# Release assembly

Deterministic mechanics are scripts (`internal/exfil`, fixture-tested);
judgment — the release narrative — is yours. The release PR is the review
surface and merge is the commitment point ([[0004-release-strategy]]).

## Flow

1. **Preflight** — on a clean `main`, run:

   ```bash
   bun run exfil status
   ```

   If no train has pending intents, stop and say so. Confirm with the user
   which train(s) they expect to depart if the status disagrees with them.

2. **Branch** — `release/<train>-<next-version>` (both trains departing →
   `release/<date-slug>`).

3. **Assemble** — run:

   ```bash
   bun run exfil assemble
   ```

   This applies versions to every train member, prepends per-package
   `CHANGELOG.md` sections from intent prose, consumes the intent files, and
   emits `releases/<train>-<version>.json` plus a narrative skeleton
   `releases/<train>-<version>.md`.

4. **Narrate** — replace the skeleton body with a release narrative that will
   become the GitHub Release body. Synthesize from three sources; do not
   concatenate entries:
   - the intent prose (consumer-addressed, already reviewed),
   - manifest diffs (`git diff main -- '**/urban-manifest.json'`) for the
     factual API surface changes,
   - linked PR descriptions (`gh pr list --search <sha>` / `gh pr view`) for
     motivation, migration detail, and screenshots — best effort only: if
     offline, the narrative from intents + manifests alone is still correct.

5. **Verify** — `mise run manifest-check` and `hk check --all` must pass;
   changelog and version diffs should match the status output from step 1.

6. **PR** — commit everything (versions, changelogs, consumed intents,
   releases/ meta + narrative) and open a PR titled
   `Release: <train> v<version>` describing what departs and why now.
   Merging the release PR is what triggers the publish plane — do not merge
   without the user's say-so.
