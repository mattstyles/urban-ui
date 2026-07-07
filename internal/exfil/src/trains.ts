/**
 * Release-train discovery ([[0004-release-strategy]]).
 *
 * Trains are derived from repository shape, never configured per package:
 * - `core` — every publishable npm package under packages/ except
 *   packages/labs, versioned in lockstep as one group.
 * - `labs` — packages/labs, the labs package ([[0002-package-architecture]]:
 *   one name everywhere), on its own 0.x line.
 * - One binary train per Rust/Go package under packages/ (Cargo.toml or
 *   go.mod), named by directory — e.g. packages/urban → train "urban".
 *   Binaries never ride the npm train.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

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
}

function readPackageJson(dir: string): PackageJson | null {
  const file = path.join(dir, "package.json");
  return existsSync(file) ? (JSON.parse(readFileSync(file, "utf8")) as PackageJson) : null;
}

function isBinaryPackage(dir: string): boolean {
  return existsSync(path.join(dir, "Cargo.toml")) || existsSync(path.join(dir, "go.mod"));
}

export function discoverTrains(repoRoot: string): Train[] {
  const trains: Train[] = [];
  const core: TrainPackage[] = [];
  const labs: TrainPackage[] = [];

  for (const dir of listDirs(path.join(repoRoot, "packages"))) {
    if (isBinaryPackage(dir)) {
      const name = path.basename(dir);
      trains.push({
        name,
        kind: "binary",
        packages: [{ name, dir, version: "0.0.0" }],
        launchVersion: LAUNCH_VERSIONS[name] ?? DEFAULT_LAUNCH_VERSION,
      });
      continue;
    }
    const pkg = readPackageJson(dir);
    if (pkg?.name && pkg.private !== true) {
      const train = path.basename(dir) === "labs" ? labs : core;
      train.push({ name: pkg.name, dir, version: pkg.version ?? "0.0.0" });
    }
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
