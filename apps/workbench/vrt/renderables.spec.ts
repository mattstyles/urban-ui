import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { scanRenderables } from "../tooling/scan.js";
import { disabledAxeRules } from "./axe-exceptions.js";

/**
 * One test per renderable export: screenshot against the committed baseline
 * (scene baselines are the regression gate, example baselines are review
 * evidence), then axe on the same rendered page.
 */
const entries = scanRenderables();

if (entries.length === 0) {
  // An empty scan means the convention moved and the globs rotted — fail
  // loudly rather than green-lighting a suite that verifies nothing.
  throw new Error(
    "No scenes or examples found — check tooling/scan.ts globs against package anatomy",
  );
}

for (const entry of entries) {
  test(`${entry.kind} ${entry.route}`, async ({ page }) => {
    await page.goto(`/#${entry.route}`);
    await page.locator("[data-scene-ready]").waitFor();
    // Path segments (not a joined string): Playwright sanitizes a string
    // name, flattening directories out of the naming schema.
    await expect(page.locator("[data-scene-root]")).toHaveScreenshot(
      entry.screenshotPath.split("/"),
    );
    const results = await new AxeBuilder({ page }).disableRules(disabledAxeRules(entry)).analyze();
    expect(results.violations).toEqual([]);
  });
}
