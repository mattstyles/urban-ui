/**
 * Package and anatomy discovery — filesystem-level, convention-driven
 * ([[package-anatomy]]): tooling globs by these shapes and never assumes
 * beyond them.
 *
 * A package participates when its package.json carries the `"urban"` marker.
 * Tier comes from location: labs/ is the labs train, packages/ is stable.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import type { DocEntry, ExampleEntry, PatternEntry, Tier } from "./manifest.js";

/**
 * Renderable-export convention shared with the workbench scanner
 * (apps/workbench/tooling/scan.ts): top-level `export function Name` /
 * `export const Name =` with a capitalized name.
 */
const EXPORT_PATTERN = /^export\s+(?:async\s+)?(?:function|const)\s+([A-Z][A-Za-z0-9_]*)/gm;

export interface DiscoveredComponent {
  /** Folder name under src/ — canonical name. */
  name: string;
  /** Absolute path to the component folder. */
  dir: string;
  /** Absolute path to src/<name>/index.ts. */
  indexFile: string;
  /** Published doc path within the package, or null. */
  doc: string | null;
  examples: ExampleEntry[];
}

export interface DiscoveredPackage {
  /** npm name, e.g. "@urban-ui/react". */
  name: string;
  /** Absolute package directory. */
  dir: string;
  tier: Tier;
  tsconfig: string;
  components: DiscoveredComponent[];
  patterns: PatternEntry[];
  /** Package-level authored docs (*.md at the package root). */
  docs: DocEntry[];
  /** Absolute paths of *.stylex.ts token sources under src/. */
  tokenSources: string[];
}

function listDirs(parent: string): string[] {
  if (!existsSync(parent)) {
    return [];
  }
  return readdirSync(parent)
    .map((entry) => path.join(parent, entry))
    .filter((entry) => statSync(entry).isDirectory())
    .sort((a, b) => a.localeCompare(b));
}

function scanExampleExports(filePath: string): string[] {
  const source = readFileSync(filePath, "utf8");
  const names = [...source.matchAll(EXPORT_PATTERN)]
    .map((match) => match[1])
    .filter((name): name is string => name !== undefined);
  return names.sort((a, b) => a.localeCompare(b));
}

function discoverComponent(pkgDir: string, componentDir: string): DiscoveredComponent | null {
  const name = path.basename(componentDir);
  const indexFile = path.join(componentDir, "index.ts");
  const implementation = path.join(componentDir, `${name}.tsx`);
  if (!existsSync(indexFile) || !existsSync(implementation)) {
    return null;
  }

  const docFile = path.join(componentDir, `${name}.md`);
  const examplesDir = path.join(componentDir, "examples");
  const examples: ExampleEntry[] = existsSync(examplesDir)
    ? readdirSync(examplesDir)
        .filter((file) => file.endsWith(".tsx"))
        .sort((a, b) => a.localeCompare(b))
        .map((file) => ({
          name: file.replace(/\.tsx$/, ""),
          path: path.relative(pkgDir, path.join(examplesDir, file)),
          exports: scanExampleExports(path.join(examplesDir, file)),
        }))
    : [];

  return {
    name,
    dir: componentDir,
    indexFile,
    doc: existsSync(docFile) ? path.relative(pkgDir, docFile) : null,
    examples,
  };
}

function discoverPackage(dir: string, tier: Tier): DiscoveredPackage | null {
  const packageJsonPath = path.join(dir, "package.json");
  if (!existsSync(packageJsonPath)) {
    return null;
  }
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {
    name?: string;
    urban?: unknown;
  };
  if (packageJson.urban === undefined || packageJson.name === undefined) {
    return null;
  }

  const srcDir = path.join(dir, "src");
  const components = listDirs(srcDir)
    .map((componentDir) => discoverComponent(dir, componentDir))
    .filter((component): component is DiscoveredComponent => component !== null);

  const patterns: PatternEntry[] = existsSync(path.join(dir, "patterns"))
    ? readdirSync(path.join(dir, "patterns"))
        .filter((file) => file.endsWith(".md"))
        .sort((a, b) => a.localeCompare(b))
        .map((file) => ({ name: file.replace(/\.md$/, ""), path: `patterns/${file}` }))
    : [];

  const docs: DocEntry[] = readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({ name: file.replace(/\.md$/, ""), path: file }));

  const tokenSources = existsSync(srcDir)
    ? readdirSync(srcDir)
        .filter((file) => file.endsWith(".stylex.ts"))
        .sort((a, b) => a.localeCompare(b))
        .map((file) => path.join(srcDir, file))
    : [];

  return {
    name: packageJson.name,
    dir,
    tier,
    tsconfig: path.join(dir, "tsconfig.json"),
    components,
    patterns,
    docs,
    tokenSources,
  };
}

export function discoverUrbanPackages(repoRoot: string): DiscoveredPackage[] {
  const discovered: DiscoveredPackage[] = [];
  for (const dir of listDirs(path.join(repoRoot, "packages"))) {
    const pkg = discoverPackage(dir, "stable");
    if (pkg) {
      discovered.push(pkg);
    }
  }
  for (const dir of listDirs(path.join(repoRoot, "labs"))) {
    const pkg = discoverPackage(dir, "labs");
    if (pkg) {
      discovered.push(pkg);
    }
  }
  return discovered.sort((a, b) => a.name.localeCompare(b.name));
}

/** Repo-level docs (docs/**\/*.md) — the wiki-link target universe beyond manifests. */
export function discoverRepoDocs(repoRoot: string): Set<string> {
  const stems = new Set<string>();
  const walk = (dir: string) => {
    if (!existsSync(dir)) {
      return;
    }
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (entry.endsWith(".md")) {
        stems.add(entry.replace(/\.md$/, ""));
      }
    }
  };
  walk(path.join(repoRoot, "docs"));
  return stems;
}
