#!/usr/bin/env bun
/**
 * exfil — the deterministic half of the release cycle
 * ([[0004-release-strategy]]: mechanics are scripts, judgment is skills).
 *
 *   exfil status              pending intents and computed next versions
 *   exfil gate --base <ref>   intent CI gates over the diff against <ref>
 *   exfil assemble            apply versions, changelogs, meta; consume intents
 *   exfil publish             depart untagged releases (--rehearsal to dry-run)
 *   exfil consumer-smoke      packed tarballs compile in a scratch consumer
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { findRepoRoot } from "@urban-ui/workspace";
import { defineCommand, runMain } from "citty";
import { assembleRelease, releaseStatus } from "./assemble.js";
import { consumerSmoke } from "./consumer-smoke.js";
import { runGates } from "./gates.js";
import { CHANGES_DIR, parseIntent } from "./intent.js";
import { planDepartures, rehearse } from "./publish.js";
import { discoverTrains } from "./trains.js";

function git(repoRoot: string, args: string[]): string {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
}

const status = defineCommand({
  meta: {
    name: "status",
    description: "Pending intents and computed next versions per train",
  },
  run() {
    const repoRoot = findRepoRoot(process.cwd());
    const { status: trainStatus, errors } = releaseStatus(repoRoot);
    for (const train of trainStatus) {
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
  },
});

const gate = defineCommand({
  meta: {
    name: "gate",
    description: "Intent CI gates over the diff against a base ref",
  },
  args: {
    base: {
      type: "string",
      description: "Git ref to diff against",
      required: true,
    },
  },
  run({ args }) {
    const repoRoot = findRepoRoot(process.cwd());
    const trains = discoverTrains(repoRoot);
    const changedFiles = git(repoRoot, ["diff", "--name-only", `${args.base}...HEAD`])
      .split("\n")
      .filter((line) => line.length > 0);
    const addedIntentFiles = git(repoRoot, [
      "diff",
      "--name-only",
      "--diff-filter=A",
      `${args.base}...HEAD`,
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
  },
});

const assemble = defineCommand({
  meta: {
    name: "assemble",
    description: "Apply versions, changelogs, and release meta; consume intents",
  },
  run() {
    const repoRoot = findRepoRoot(process.cwd());
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
  },
});

const publish = defineCommand({
  meta: {
    name: "publish",
    description: "Depart untagged releases: npm publish, tag, GitHub Release",
  },
  args: {
    rehearsal: {
      type: "boolean",
      description: "Pack and verify everything short of npm publish and Release creation",
      default: false,
    },
  },
  run({ args }) {
    const repoRoot = findRepoRoot(process.cwd());
    if (args.rehearsal) {
      const report = rehearse(repoRoot);
      for (const verification of report.verifications) {
        console.log(`packed ${verification.package} → ${verification.tarball} (rewrites verified)`);
      }
      if (report.departures.length === 0) {
        console.log(
          "No releases/ meta present — no departures pending; rehearsed against current packages.",
        );
      }
      for (const departure of report.departures) {
        const state = departure.tagged ? "already tagged" : "PENDING";
        console.log(
          `departure ${departure.train} v${departure.version} → tag ${departure.tag} (${state})`,
        );
        console.log(`  release body: ${departure.narrativePath}`);
        console.log(
          `  packages: ${departure.packages.map((pkg) => `${pkg.name}@${pkg.version}`).join(", ")}`,
        );
      }
      if (report.issues.length > 0) {
        console.error(`\nRehearsal failed (${report.issues.length} issue(s)):`);
        for (const issue of report.issues) {
          console.error(`  - ${issue}`);
        }
        process.exit(1);
      }
      console.log(
        "\nRehearsal passed — everything short of npm publish and Release creation verified.",
      );
      return;
    }

    // Real departures: idempotent by construction — --tolerate-republish
    // lets a partial failure re-run safely, tags and Releases are skipped
    // when they already exist.
    const pending = planDepartures(repoRoot).filter((departure) => !departure.tagged);
    if (pending.length === 0) {
      console.log("No untagged departures in releases/ — nothing to publish.");
      return;
    }
    const trains = discoverTrains(repoRoot);
    for (const departure of pending) {
      const train = trains.find((candidate) => candidate.name === departure.train);
      if (train?.kind === "npm") {
        for (const pkg of train.packages) {
          console.log(`publishing ${pkg.name}@${departure.version}`);
          execFileSync("bun", ["publish", "--tolerate-republish"], {
            cwd: pkg.dir,
            stdio: "inherit",
          });
        }
      } else {
        console.log(
          `binary train ${departure.train}: tagging only — the artifact pipeline lands with the first CLI package`,
        );
      }
      git(repoRoot, ["tag", departure.tag]);
      git(repoRoot, ["push", "origin", departure.tag]);
      execFileSync(
        "gh",
        [
          "release",
          "create",
          departure.tag,
          "--title",
          `${departure.train} v${departure.version}`,
          "--notes-file",
          path.join(repoRoot, departure.narrativePath),
        ],
        { cwd: repoRoot, stdio: "inherit" },
      );
      console.log(`departed ${departure.train} v${departure.version} (${departure.tag})`);
    }
  },
});

const consumerSmokeCommand = defineCommand({
  meta: {
    name: "consumer-smoke",
    description: "Install packed tarballs into a scratch Vite consumer and build",
  },
  run() {
    const repoRoot = findRepoRoot(process.cwd());
    const result = consumerSmoke(repoRoot);
    if (result.issues.length > 0) {
      console.error(`Consumer smoke failed (${result.issues.length} issue(s)):`);
      for (const issue of result.issues) {
        console.error(`  - ${issue}`);
      }
      process.exit(1);
    }
    console.log(
      `Consumer smoke passed — packed tarballs compile and render in a scratch Vite app (${result.dir})`,
    );
  },
});

const main = defineCommand({
  meta: {
    name: "exfil",
    description: "Release mechanics — the deterministic half of the release cycle",
  },
  subCommands: {
    status,
    gate,
    assemble,
    publish,
    "consumer-smoke": consumerSmokeCommand,
  },
});

runMain(main);
