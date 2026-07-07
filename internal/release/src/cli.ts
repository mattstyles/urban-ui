#!/usr/bin/env bun
/**
 * release-tool — the deterministic half of the release cycle
 * ([[0004-release-strategy]]: mechanics are scripts, judgment is skills).
 *
 *   release-tool status              pending intents and computed next versions
 *   release-tool gate --base <ref>   intent CI gates over the diff against <ref>
 *   release-tool assemble            apply versions, changelogs, meta; consume intents
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { assembleRelease, releaseStatus } from "./assemble.js";
import { runGates } from "./gates.js";
import { CHANGES_DIR, parseIntent } from "./intent.js";
import { discoverTrains } from "./trains.js";

function findRepoRoot(start: string): string {
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

function git(repoRoot: string, args: string[]): string {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
}

const repoRoot = findRepoRoot(process.cwd());
const [, , command, ...rest] = process.argv;

switch (command) {
  case "status": {
    const { status, errors } = releaseStatus(repoRoot);
    for (const train of status) {
      const pending =
        train.pendingIntents > 0
          ? `${train.pendingIntents} intent(s) → ${train.bump} → ${train.nextVersion}`
          : "no pending intents";
      console.log(`${train.train}: ${train.currentVersion} — ${pending}`);
    }
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exit(1);
    }
    break;
  }

  case "gate": {
    const baseFlag = rest.indexOf("--base");
    const base = baseFlag !== -1 ? rest[baseFlag + 1] : undefined;
    if (!base) {
      console.error("Usage: release-tool gate --base <ref>");
      process.exit(2);
    }
    const trains = discoverTrains(repoRoot);
    const changedFiles = git(repoRoot, ["diff", "--name-only", `${base}...HEAD`])
      .split("\n")
      .filter((line) => line.length > 0);
    const addedIntentFiles = git(repoRoot, [
      "diff",
      "--name-only",
      "--diff-filter=A",
      `${base}...HEAD`,
      "--",
      `${CHANGES_DIR}/*.md`,
    ])
      .split("\n")
      .filter((line) => line.length > 0 && !line.endsWith("README.md"));

    const parseErrors: string[] = [];
    const addedIntents = addedIntentFiles.flatMap((file) => {
      const result = parseIntent(file, readFileSync(path.join(repoRoot, file), "utf8"), trains);
      parseErrors.push(...result.errors);
      return result.intent ? [result.intent] : [];
    });

    const issues = runGates(changedFiles, addedIntents, trains, repoRoot);
    const failures = [...parseErrors, ...issues.map((issue) => issue.message)];
    if (failures.length > 0) {
      console.error(`Intent gate failed (${failures.length} issue(s)):`);
      for (const failure of failures) {
        console.error(`  - ${failure}`);
      }
      process.exit(1);
    }
    console.log(
      `Intent gate passed — ${changedFiles.length} changed file(s), ${addedIntents.length} intent(s) added`,
    );
    break;
  }

  case "assemble": {
    const result = assembleRelease(repoRoot);
    if (result.errors.length > 0) {
      console.error(result.errors.join("\n"));
      process.exit(1);
    }
    for (const entry of result.assembled) {
      console.log(`${entry.train}: ${entry.previousVersion} → ${entry.version} (${entry.bump})`);
    }
    for (const file of result.written) {
      console.log(`  wrote ${file}`);
    }
    break;
  }

  default: {
    console.error("Usage: release-tool <status|gate --base <ref>|assemble>");
    process.exit(2);
  }
}
