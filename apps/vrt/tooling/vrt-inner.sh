#!/usr/bin/env bash
# Runs INSIDE the pinned Playwright container: install (linux-native), build
# the VRT app and its packages, then run the VRT + axe suite. Invoked by
# tooling/vrt.sh locally and directly by the CI container job.
set -euo pipefail

cd "$(dirname "$0")/../../.."

# Keep in sync with the bun pin in the root mise.toml.
command -v bun >/dev/null 2>&1 || npm install --global bun@1.3.14

bun install --frozen-lockfile

# No mise inside the container — run the canonical package scripts in
# dependency order (theme → react → labs → vrt app).
(cd packages/theme && bun run build)
(cd packages/react && bun run build)
(cd packages/labs && bun run build)
(cd apps/vrt && bun run build)

cd apps/vrt
if [[ "${1:-}" == "--update" ]]; then
  bunx playwright test --update-snapshots
else
  bunx playwright test
fi
