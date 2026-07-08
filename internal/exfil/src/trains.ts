/**
 * Release-train discovery ([[0004-release-strategy]]).
 *
 * Trains are derived from repository shape, never configured per package —
 * the shape itself comes from @urban-ui/workspace so exfil and engram share
 * one view of the workspace:
 * - `core` — every publishable npm package under packages/ except
 *   packages/labs, versioned in lockstep as one group.
 * - `labs` — packages/labs, the labs package ([[0002-package-architecture]]:
 *   one name everywhere), on its own 0.x line.
 * - One binary train per Rust/Go package under packages/ (Cargo.toml or
 *   go.mod), named by directory — e.g. packages/urban → train "urban".
 *   Binaries never ride the npm train.
 *
 * A publishable npm package must also carry the package.json `"urban"`
 * marker ([[package-anatomy]]) — otherwise it would ride a release train
 * while staying invisible to the manifest pipeline. Discovery throws rather
 * than letting the two views silently diverge.
 */

import path from "node:path";
import { type NpmWorkspacePackage, workspacePackages } from "@urban-ui/workspace";

export type TrainKind = "npm" | "binary";

export interface TrainPackage {
  /** npm name for npm trains; directory name for binary trains. */
  name: string;
  /** Absolute package directory. */
  dir: string;
  version: string;
}

export interface Train {
  name: string;
  kind: TrainKind;
  packages: TrainPackage[];
  /** First-departure version when the train has never released (0.0.0). */
  launchVersion: string;
}

/** Core launches at 0.10.0 (001-repo-foundation); everything else at 0.1.0. */
const LAUNCH_VERSIONS: Record<string, string> = { core: "0.10.0" };
const DEFAULT_LAUNCH_VERSION = "0.1.0";

export function discoverTrains(repoRoot: string): Train[] {
  const trains: Train[] = [];
  const core: TrainPackage[] = [];
  const labs: TrainPackage[] = [];
  const unmarked: NpmWorkspacePackage[] = [];

  for (const pkg of workspacePackages(repoRoot)) {
    if (pkg.group !== "packages") {
      continue;
    }
    if (pkg.kind === "binary") {
      trains.push({
        name: pkg.name,
        kind: "binary",
        packages: [{ name: pkg.name, dir: pkg.dir, version: "0.0.0" }],
        launchVersion: LAUNCH_VERSIONS[pkg.name] ?? DEFAULT_LAUNCH_VERSION,
      });
      continue;
    }
    if (pkg.private) {
      continue;
    }
    if (pkg.urban === null) {
      unmarked.push(pkg);
      continue;
    }
    const train = path.basename(pkg.dir) === "labs" ? labs : core;
    train.push({ name: pkg.name, dir: pkg.dir, version: pkg.version });
  }

  if (unmarked.length > 0) {
    throw new Error(
      `Publishable package(s) missing the "urban" marker in package.json: ${unmarked
        .map((pkg) => `${pkg.name} (${path.relative(repoRoot, pkg.dir)})`)
        .join(", ")} — every published npm package must carry the marker so ` +
        `manifest tooling (engram) and release trains (exfil) see the same workspace.`,
    );
  }

  if (core.length > 0) {
    trains.push({
      name: "core",
      kind: "npm",
      packages: core,
      launchVersion: LAUNCH_VERSIONS["core"] ?? DEFAULT_LAUNCH_VERSION,
    });
  }
  if (labs.length > 0) {
    trains.push({
      name: "labs",
      kind: "npm",
      packages: labs,
      launchVersion: DEFAULT_LAUNCH_VERSION,
    });
  }
  return trains.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * The train's current version. npm trains version in lockstep — divergence
 * among members is corruption and throws rather than guessing.
 */
export function trainVersion(train: Train): string {
  const versions = new Set(train.packages.map((pkg) => pkg.version));
  if (versions.size !== 1) {
    throw new Error(
      `Train "${train.name}" is not in lockstep: ${train.packages
        .map((pkg) => `${pkg.name}@${pkg.version}`)
        .join(", ")}`,
    );
  }
  const version = train.packages[0]?.version;
  if (version === undefined) {
    throw new Error(`Train "${train.name}" has no packages`);
  }
  return version;
}
