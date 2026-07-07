/**
 * The shared path model for VRT renderables.
 *
 * Scenes (`*.visual.tsx`) and examples (`examples/*.tsx`) are discovered by
 * convention (package-anatomy): tooling globs these shapes and never assumes
 * beyond them. This module is the single source of truth for turning a source
 * path into route and screenshot locations — imported by both the browser
 * registry (via import.meta.glob keys) and the node-side VRT scanner, so the
 * app and Playwright can never disagree about where a renderable lives.
 *
 * Screenshot naming schema (package-anatomy):
 *   packages/<pkg>/src/<component>/__screenshots__/<file-stem>/<Export>.png
 */

export type RenderableKind = "scene" | "example";

export interface RenderableMeta {
  kind: RenderableKind;
  /** Route key: package directory name under packages/. */
  pkg: string;
  /** Repo-relative package root, e.g. "packages/react". */
  pkgRoot: string;
  /** Component folder name under src/, e.g. "button". */
  component: string;
  /** Path under the component folder without extension, e.g. "button.visual" or "examples/basic". */
  fileStem: string;
  exportName: string;
}

/**
 * Parse a repo-relative source path (posix separators) into renderable
 * coordinates. Returns null for files that are neither scenes nor examples —
 * callers glob narrowly, but the parser stays defensive so a loosened glob
 * can't silently misclassify.
 */
export function parseRenderablePath(
  repoRelPath: string,
  exportName: string,
): RenderableMeta | null {
  const match = repoRelPath.match(/^packages\/([^/]+)\/src\/([^/]+)\/(.+)\.tsx$/);
  if (!match) {
    return null;
  }
  const [, pkg, component, fileStem] = match;
  if (fileStem === undefined || pkg === undefined || component === undefined) {
    return null;
  }
  const pkgRoot = `packages/${pkg}`;
  const kind: RenderableKind | null = fileStem.endsWith(".visual")
    ? "scene"
    : fileStem.startsWith("examples/")
      ? "example"
      : null;
  if (kind === null) {
    return null;
  }
  return { kind, pkg, pkgRoot, component, fileStem, exportName };
}

/** Stable hash-router path, e.g. "/scene/react/button/button.visual/Base". */
export function routeFor(meta: RenderableMeta): string {
  return `/${meta.kind}/${meta.pkg}/${meta.component}/${meta.fileStem}/${meta.exportName}`;
}

/** Repo-relative baseline path per the screenshot naming schema. */
export function screenshotPathFor(meta: RenderableMeta): string {
  return `${meta.pkgRoot}/src/${meta.component}/__screenshots__/${meta.fileStem}/${meta.exportName}.png`;
}
