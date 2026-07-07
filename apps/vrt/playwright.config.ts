import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));

/**
 * VRT + axe suite (ADR-0006). Runs ONLY inside the pinned Playwright
 * container — tooling/vrt.sh locally, the container job in CI — so
 * rasterization is identical everywhere. Baselines are committed co-located
 * with each component; the test passes the repo-relative baseline path as the
 * screenshot name, so the template below is just root + name.
 */
export default defineConfig({
  testDir: "./vrt",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Determinism is the point: a retry that passes would mask flake.
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  snapshotPathTemplate: `${repoRoot}{arg}{ext}`,
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixels: 0,
    },
  },
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        deviceScaleFactor: 1,
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  webServer: {
    // Explicit IPv4 host: in the container "localhost" can resolve to ::1
    // only, and Playwright polls the IPv4 URL below.
    command: "bunx vite preview --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});
