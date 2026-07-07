/**
 * Node-side renderable scanner — the VRT suite's view of the same convention
 * the browser registry (src/registry.ts) reads through import.meta.glob.
 *
 * Named exports are extracted statically so Playwright can generate one test
 * per export at load time, before any browser exists. Renderable exports must
 * therefore be top-level declarations with capitalized names:
 *
 *   export function Base() { ... }
 *   export const Disabled = () => { ... }
 *
 * Re-exports and computed export maps are deliberately unsupported — one
 * export = one screenshot only stays reviewable when the export is visible in
 * the file that owns the baseline.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "tinyglobby";
import { parseRenderablePath, type RenderableMeta, routeFor, screenshotPathFor } from "./paths.js";

const repoRoot = fileURLToPath(new URL("../../..", import.meta.url));

export const RENDERABLE_GLOBS = [
  "packages/*/src/**/*.visual.tsx",
  "packages/*/src/**/examples/*.tsx",
  "labs/src/**/*.visual.tsx",
  "labs/src/**/examples/*.tsx",
];

const EXPORT_PATTERN = /^export\s+(?:async\s+)?(?:function|const)\s+([A-Z][A-Za-z0-9_]*)/gm;

export interface ScannedRenderable extends RenderableMeta {
  route: string;
  /** Repo-relative baseline path, e.g. "packages/react/src/button/__screenshots__/button.visual/Base.png". */
  screenshotPath: string;
}

export function scanRenderables(): ScannedRenderable[] {
  const files = globSync(RENDERABLE_GLOBS, { cwd: repoRoot });
  const entries: ScannedRenderable[] = [];
  for (const file of files) {
    const source = readFileSync(path.join(repoRoot, file), "utf8");
    for (const match of source.matchAll(EXPORT_PATTERN)) {
      const exportName = match[1];
      if (exportName === undefined) {
        continue;
      }
      const meta = parseRenderablePath(file, exportName);
      if (meta === null) {
        continue;
      }
      entries.push({ ...meta, route: routeFor(meta), screenshotPath: screenshotPathFor(meta) });
    }
  }
  // oxlint-disable-next-line unicorn/no-array-sort -- local array, mutation is fine; toSorted needs lib es2023
  return entries.sort((a, b) => a.route.localeCompare(b.route));
}
