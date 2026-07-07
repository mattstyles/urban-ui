/**
 * Workspace shape — the one place that answers "what is this repository made
 * of?" ([[0001-repository-structure]]): where the repo root is, which
 * packages exist, which are publishable, and which carry the package.json
 * `"urban"` marker ([[package-anatomy]]).
 *
 * Consumers (engram's manifest discovery, exfil's release trains) derive
 * their views by filtering this single enumeration, so they can never
 * silently diverge on what a "package" is.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

/** Top-level workspace groups, mirroring the root package.json workspaces globs. */
export const WORKSPACE_GROUPS = ["apps", "internal", "packages"] as const;
export type WorkspaceGroup = (typeof WORKSPACE_GROUPS)[number];

/** The package.json `"urban"` marker — opts a package into the manifest pipeline. */
export interface UrbanMarker {
  /** Manifest path within the package, e.g. "./urban-manifest.json". */
  manifest?: string;
}

export interface NpmWorkspacePackage {
  kind: "npm";
  /** npm name from package.json, e.g. "@urban-ui/react". */
  name: string;
  /** Absolute package directory. */
  dir: string;
  /** Top-level directory the package lives under. */
  group: WorkspaceGroup;
  version: string;
  /** package.json `"private": true` — never published. */
  private: boolean;
  /** The `"urban"` marker, or null when the package does not carry one. */
  urban: UrbanMarker | null;
}

/** A Rust/Go package (Cargo.toml or go.mod) — no package.json, named by directory. */
export interface BinaryWorkspacePackage {
  kind: "binary";
  /** Directory basename — binaries have no npm name. */
  name: string;
  /** Absolute package directory. */
  dir: string;
  /** Top-level directory the package lives under. */
  group: WorkspaceGroup;
}

export type WorkspacePackage = NpmWorkspacePackage | BinaryWorkspacePackage;

/** Walk up from `start` to the directory holding bun.lock — the repo root. */
export function findRepoRoot(start: string): string {
  let dir = start;
  while (!existsSync(path.join(dir, "bun.lock"))) {
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(`Repo root not found walking up from ${start} (no bun.lock)`);
    }
    dir = parent;
  }
  return dir;
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

interface PackageJson {
  name?: string;
  version?: string;
  private?: boolean;
  urban?: UrbanMarker;
}

function discoverEntry(dir: string, group: WorkspaceGroup): WorkspacePackage | null {
  if (existsSync(path.join(dir, "Cargo.toml")) || existsSync(path.join(dir, "go.mod"))) {
    return { kind: "binary", name: path.basename(dir), dir, group };
  }
  const packageJsonPath = path.join(dir, "package.json");
  if (!existsSync(packageJsonPath)) {
    return null;
  }
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as PackageJson;
  if (packageJson.name === undefined) {
    return null;
  }
  return {
    kind: "npm",
    name: packageJson.name,
    dir,
    group,
    version: packageJson.version ?? "0.0.0",
    private: packageJson.private === true,
    urban: packageJson.urban ?? null,
  };
}

/**
 * Enumerate every workspace package — one pass, one source of truth.
 * Entries come back grouped by workspace group, sorted by path within each;
 * directories without a package.json (and no Cargo.toml/go.mod) are skipped.
 */
export function workspacePackages(repoRoot: string): WorkspacePackage[] {
  const packages: WorkspacePackage[] = [];
  for (const group of WORKSPACE_GROUPS) {
    for (const dir of listDirs(path.join(repoRoot, group))) {
      const entry = discoverEntry(dir, group);
      if (entry) {
        packages.push(entry);
      }
    }
  }
  return packages;
}
