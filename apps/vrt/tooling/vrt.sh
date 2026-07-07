#!/usr/bin/env bash
# VRT entrypoint — rendering happens ONLY inside the pinned Playwright
# container (ADR-0006), so baselines rasterize identically on every machine
# and in CI. Usage:
#
#   mise run '//apps/vrt:vrt'              # verify against baselines
#   mise run '//apps/vrt:vrt' -- --update  # regenerate baselines
#
# In CI the job itself runs inside the container (see .github/workflows/
# ci.yml) and calls vrt-inner.sh directly; this wrapper is the local path.
set -euo pipefail

cd "$(dirname "$0")/../../.."

# The image tag follows the installed @playwright/test version — bumping the
# dependency bumps the container in lockstep.
PLAYWRIGHT_VERSION="$(cd apps/vrt && bun -p 'require("@playwright/test/package.json").version')"
IMAGE="mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble"

# The host tree is bind-mounted, but every workspace node_modules is shadowed
# by a named volume: host installs are macOS-native and must never mix with
# the container's linux installs. Volumes persist, so repeat runs skip most
# of the install cost.
MOUNTS=(
  -v "$PWD:/work"
  -v "urban-ui-vrt-nm-root:/work/node_modules"
  -v "urban-ui-vrt-bun-cache:/root/.bun/install/cache"
)
for dir in apps/* packages/* internal/*; do
  [[ -f "$dir/package.json" ]] || continue
  MOUNTS+=(-v "urban-ui-vrt-nm-${dir//\//-}:/work/$dir/node_modules")
done

docker run --rm --init --ipc=host "${MOUNTS[@]}" -w /work "$IMAGE" \
  bash apps/vrt/tooling/vrt-inner.sh "$@"

# Losslessly recompress fresh baselines (ADR-0006: oxipng on write). Pixel
# comparison is unaffected; this only trims committed bytes.
if [[ "${1:-}" == "--update" ]]; then
  if command -v oxipng >/dev/null 2>&1; then
    find packages -path '*/__screenshots__/*.png' \
      -exec oxipng --opt 4 --strip safe --quiet {} +
  else
    echo "warn: oxipng not found — baselines committed unoptimized (mise install provides it)" >&2
  fi
fi
