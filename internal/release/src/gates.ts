/**
 * The intent CI gates ([[0004-release-strategy]]), as pure functions over a
 * changed-file list and the PR's added intents — git handling stays in the
 * CLI so every rule is fixture-testable:
 *
 * 1. Published package source touched with no intent naming that train.
 * 2. An added intent naming a train the PR does not touch.
 * 3. A published manifest changed with no intent (surfaced with its own
 *    message — manifest drift is the semver oracle's input).
 */

import path from "node:path";
import type { Intent } from "./intent.js";
import type { Train } from "./trains.js";

export interface GateIssue {
  message: string;
}

/** Repo-only files inside a published package that never reach consumers. */
const REPO_ONLY_PATTERN = /(\.test\.[a-z]+$|\.visual\.tsx$|\/__screenshots__\/)/;

interface Classified {
  train: string;
  manifest: boolean;
}

/** Classify a repo-relative changed file as shipped surface of a train. */
export function classifyShippedFile(
  file: string,
  trains: Train[],
  repoRoot: string,
): Classified | null {
  for (const train of trains) {
    for (const pkg of train.packages) {
      const pkgPrefix = `${path.relative(repoRoot, pkg.dir)}/`;
      if (!file.startsWith(pkgPrefix)) {
        continue;
      }
      const inside = file.slice(pkgPrefix.length);
      if (inside === "urban-manifest.json") {
        return { train: train.name, manifest: true };
      }
      if (REPO_ONLY_PATTERN.test(inside)) {
        return null;
      }
      if (
        inside.startsWith("src/") ||
        inside.startsWith("patterns/") ||
        inside === "package.json" ||
        (inside.endsWith(".md") && !inside.includes("/"))
      ) {
        return { train: train.name, manifest: false };
      }
      return null;
    }
  }
  return null;
}

export function runGates(
  changedFiles: string[],
  addedIntents: Intent[],
  trains: Train[],
  repoRoot: string,
): GateIssue[] {
  const issues: GateIssue[] = [];

  const touched = new Map<string, { files: string[]; manifests: string[] }>();
  for (const file of changedFiles) {
    const classified = classifyShippedFile(file, trains, repoRoot);
    if (!classified) {
      continue;
    }
    const entry = touched.get(classified.train) ?? { files: [], manifests: [] };
    entry.files.push(file);
    if (classified.manifest) {
      entry.manifests.push(file);
    }
    touched.set(classified.train, entry);
  }

  const intentTrains = new Set(addedIntents.flatMap((intent) => Object.keys(intent.bumps)));

  for (const [train, entry] of [...touched.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    if (intentTrains.has(train)) {
      continue;
    }
    if (entry.manifests.length > 0) {
      issues.push({
        message:
          `Manifest changed without release intent: ${entry.manifests.join(", ")} — ` +
          `the public surface of train "${train}" moved; add a .changes/*.md naming it`,
      });
    }
    const sourceFiles = entry.files.filter((file) => !entry.manifests.includes(file));
    if (sourceFiles.length > 0) {
      issues.push({
        message:
          `Published source touched without release intent for train "${train}": ` +
          `${sourceFiles.slice(0, 5).join(", ")}${sourceFiles.length > 5 ? ", …" : ""} — ` +
          `add a .changes/*.md with "${train}: <patch|minor|major>" and consumer-facing prose`,
      });
    }
  }

  for (const train of [...intentTrains].sort((a, b) => a.localeCompare(b))) {
    if (!touched.has(train)) {
      issues.push({
        message:
          `Intent names untouched train "${train}" — this PR changes none of its published ` +
          `surface; drop the entry or move the intent to the PR that does`,
      });
    }
  }

  return issues;
}
