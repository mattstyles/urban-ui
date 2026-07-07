/**
 * Publish plane ([[0004-release-strategy]]): tag naming, departure planning
 * from releases/ meta, and the rehearsal that exercises everything short of
 * `npm publish` and GitHub Release creation — pack each package, verify the
 * workspace and catalog protocol rewrites from the actual tarball, gate
 * shape with publint + attw, and run `bun publish --dry-run`.
 *
 * The real loop is idempotent by construction: `--tolerate-republish` makes
 * a partial-failure re-run safe.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { RELEASES_DIR } from "./assemble.js";
import { discoverTrains, type Train } from "./trains.js";

/** Hyphen tags per train: core-v1.2.3, labs-v0.3.0, urban-v0.1.0. */
export function tagNameFor(train: string, version: string): string {
  return `${train}-v${version}`;
}

export interface Departure {
  train: string;
  kind: Train["kind"];
  version: string;
  tag: string;
  tagged: boolean;
  packages: { name: string; version: string }[];
  narrativePath: string;
  metaPath: string;
}

function run(cwd: string, command: string, args: string[]): string {
  return execFileSync(command, args, { cwd, encoding: "utf8" });
}

/** Read releases/ meta and mark which departures are already tagged. */
export function planDepartures(repoRoot: string): Departure[] {
  const dir = path.join(repoRoot, RELEASES_DIR);
  if (!existsSync(dir)) {
    return [];
  }
  const departures: Departure[] = [];
  for (const entry of readdirSync(dir).sort((a, b) => a.localeCompare(b))) {
    if (!entry.endsWith(".json")) {
      continue;
    }
    const meta = JSON.parse(readFileSync(path.join(dir, entry), "utf8")) as {
      train: string;
      kind: Train["kind"];
      version: string;
      packages: { name: string; version: string }[];
      narrative: string;
    };
    const tag = tagNameFor(meta.train, meta.version);
    const tagged = run(repoRoot, "git", ["tag", "--list", tag]).trim().length > 0;
    departures.push({
      train: meta.train,
      kind: meta.kind,
      version: meta.version,
      tag,
      tagged,
      packages: meta.packages,
      narrativePath: meta.narrative,
      metaPath: `${RELEASES_DIR}/${entry}`,
    });
  }
  return departures;
}

export interface PackVerification {
  package: string;
  tarball: string;
  issues: string[];
}

/**
 * Pack one package and verify the artifact a consumer would install: the
 * workspace:* and catalog: protocols must be rewritten to real ranges.
 */
export function packAndVerify(pkgDir: string): PackVerification {
  const pkgName = (
    JSON.parse(readFileSync(path.join(pkgDir, "package.json"), "utf8")) as { name: string }
  ).name;
  const dest = mkdtempSync(path.join(tmpdir(), "urban-pack-"));
  run(pkgDir, "bun", ["pm", "pack", "--destination", dest]);
  const tarball = readdirSync(dest).find((file) => file.endsWith(".tgz"));
  if (!tarball) {
    return { package: pkgName, tarball: "<none>", issues: ["bun pm pack produced no tarball"] };
  }
  const packedJson = run(dest, "tar", ["-xzOf", tarball, "package/package.json"]);
  const issues: string[] = [];
  if (packedJson.includes("workspace:")) {
    issues.push("workspace:* survived into the packed package.json — consumers cannot resolve it");
  }
  if (packedJson.includes("catalog:")) {
    issues.push("catalog: survived into the packed package.json — consumers cannot resolve it");
  }
  return { package: pkgName, tarball: path.join(dest, tarball), issues };
}

export interface RehearsalReport {
  verifications: PackVerification[];
  departures: Departure[];
  issues: string[];
}

/**
 * Everything short of publish and Release creation, against the packages as
 * they stand. Runs per npm-train member: pack + rewrite verification, shape
 * gates (publint + attw via the package's check-package script), and
 * `bun publish --dry-run`.
 */
export function rehearse(repoRoot: string): RehearsalReport {
  const issues: string[] = [];
  const verifications: PackVerification[] = [];

  for (const train of discoverTrains(repoRoot)) {
    if (train.kind !== "npm") {
      continue;
    }
    for (const pkg of train.packages) {
      const verification = packAndVerify(pkg.dir);
      verifications.push(verification);
      issues.push(...verification.issues.map((issue) => `${verification.package}: ${issue}`));
      try {
        run(pkg.dir, "bun", ["run", "check-package"]);
      } catch (error) {
        issues.push(
          `${pkg.name}: publint/attw failed — ${error instanceof Error ? error.message : String(error)}`,
        );
      }
      try {
        run(pkg.dir, "bun", ["publish", "--dry-run"]);
      } catch (error) {
        issues.push(
          `${pkg.name}: bun publish --dry-run failed — ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  }

  return { verifications, departures: planDepartures(repoRoot), issues };
}
