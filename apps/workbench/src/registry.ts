/**
 * The browser-side renderable registry: every scene (`*.visual.tsx`) and
 * example (`examples/*.tsx`) across packages, keyed by stable route.
 *
 * Modules load eagerly — the workbench is small by design and eager loading
 * keeps scene routes render-complete on first paint, which is what the VRT
 * suite screenshots. The node-side scanner (tooling/scan.ts) reads the same
 * convention for Playwright; both defer to tooling/paths.ts for coordinates.
 */

import type { ComponentType } from "react";
import { parseRenderablePath, type RenderableMeta, routeFor } from "../tooling/paths.js";

export interface RenderableEntry extends RenderableMeta {
  route: string;
  Component: ComponentType;
}

const modules = {
  ...import.meta.glob("../../../packages/*/src/**/*.visual.tsx", { eager: true }),
  ...import.meta.glob("../../../packages/*/src/**/examples/*.tsx", { eager: true }),
  ...import.meta.glob("../../../labs/src/**/*.visual.tsx", { eager: true }),
  ...import.meta.glob("../../../labs/src/**/examples/*.tsx", { eager: true }),
} as Record<string, Record<string, unknown>>;

function collect(): RenderableEntry[] {
  const entries: RenderableEntry[] = [];
  for (const [key, mod] of Object.entries(modules)) {
    const repoRelPath = key.replace(/^(\.\.\/)+/, "");
    for (const [exportName, value] of Object.entries(mod)) {
      if (typeof value !== "function" || !/^[A-Z]/.test(exportName)) {
        continue;
      }
      const meta = parseRenderablePath(repoRelPath, exportName);
      if (meta === null) {
        continue;
      }
      entries.push({ ...meta, route: routeFor(meta), Component: value as ComponentType });
    }
  }
  // oxlint-disable-next-line unicorn/no-array-sort -- local array, mutation is fine; toSorted needs lib es2023
  return entries.sort((a, b) => a.route.localeCompare(b.route));
}

export const renderables = collect();

export function findRenderable(route: string): RenderableEntry | undefined {
  return renderables.find((entry) => entry.route === route);
}
