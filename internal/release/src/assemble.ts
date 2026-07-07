/**
 * Release assembly ([[0004-release-strategy]]): compute versions from
 * accumulated intents, apply them, write changelogs, consume the intents,
 * and emit machine-readable release meta. Deterministic and offline — the
 * narrative synthesis (intent prose × manifest diffs × linked PRs) is the
 * /release skill's judgment call and happens in the release PR, not here.
 */

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { type Intent, loadIntents } from "./intent.js";
import { discoverTrains, type Train, trainVersion } from "./trains.js";
import { maxBump, nextTrainVersion } from "./versions.js";

export const RELEASES_DIR = "releases";
export const META_SCHEMA_VERSION = 1;

export interface AssembledTrain {
  train: string;
  kind: Train["kind"];
  previousVersion: string;
  version: string;
  bump: string;
  packages: { name: string; version: string }[];
  intents: Intent[];
}

export interface AssembleResult {
  assembled: AssembledTrain[];
  written: string[];
  errors: string[];
}

/**
 * Surgical version replacement — package.json key order and formatting are
 * owned by oxfmt; a parse/stringify round-trip would fight it.
 */
function bumpPackageJsonVersion(file: string, version: string): void {
  const source = readFileSync(file, "utf8");
  const updated = source.replace(/"version":\s*"[^"]*"/, `"version": "${version}"`);
  if (updated === source) {
    throw new Error(`No version field found in ${file}`);
  }
  writeFileSync(file, updated);
}

function changelogSection(version: string, intents: Intent[], train: string): string {
  const entries = intents
    .map((intent) => {
      const bump = intent.bumps[train];
      const body = intent.prose.split("\n").join("\n  ");
      return `- **${bump}** — ${body}`;
    })
    .join("\n");
  return `## ${version}\n\n${entries}\n`;
}

function prependChangelog(pkgDir: string, pkgName: string, section: string): string {
  const file = path.join(pkgDir, "CHANGELOG.md");
  const existing = existsSync(file) ? readFileSync(file, "utf8") : `# ${pkgName}\n\n`;
  const headerMatch = existing.match(/^# [^\n]+\n\n/);
  const header = headerMatch?.[0] ?? `# ${pkgName}\n\n`;
  const rest = existing.slice(header.length);
  writeFileSync(file, `${header}${section}\n${rest}`.replace(/\n{3,}$/, "\n"));
  return file;
}

export function assembleRelease(repoRoot: string): AssembleResult {
  const trains = discoverTrains(repoRoot);
  const { intents, errors } = loadIntents(repoRoot, trains);
  if (errors.length > 0) {
    return { assembled: [], written: [], errors };
  }
  if (intents.length === 0) {
    return {
      assembled: [],
      written: [],
      errors: ["No pending intents in .changes/ — nothing to release"],
    };
  }

  const written: string[] = [];
  const assembled: AssembledTrain[] = [];

  for (const train of trains) {
    const trainIntents = intents.filter((intent) => intent.bumps[train.name] !== undefined);
    if (trainIntents.length === 0) {
      continue;
    }
    const bump = maxBump(
      trainIntents.map((intent) => intent.bumps[train.name]).filter((b) => b !== undefined),
    );
    const previousVersion = trainVersion(train);
    const version = nextTrainVersion(train, bump);

    if (train.kind === "npm") {
      const section = changelogSection(version, trainIntents, train.name);
      for (const pkg of train.packages) {
        bumpPackageJsonVersion(path.join(pkg.dir, "package.json"), version);
        written.push(path.relative(repoRoot, path.join(pkg.dir, "package.json")));
        written.push(path.relative(repoRoot, prependChangelog(pkg.dir, pkg.name, section)));
      }
    }
    // Binary trains version in their own manifests (Cargo.toml / go.mod);
    // wiring that write lands with the first CLI package. Meta still records
    // the departure so the release PR reviews it.

    assembled.push({
      train: train.name,
      kind: train.kind,
      previousVersion,
      version,
      bump,
      packages: train.packages.map((pkg) => ({ name: pkg.name, version })),
      intents: trainIntents,
    });
  }

  mkdirSync(path.join(repoRoot, RELEASES_DIR), { recursive: true });
  for (const entry of assembled) {
    const stem = `${entry.train}-${entry.version}`;
    const metaPath = path.join(RELEASES_DIR, `${stem}.json`);
    const narrativePath = path.join(RELEASES_DIR, `${stem}.md`);
    writeFileSync(
      path.join(repoRoot, metaPath),
      `${JSON.stringify(
        {
          schemaVersion: META_SCHEMA_VERSION,
          train: entry.train,
          kind: entry.kind,
          previousVersion: entry.previousVersion,
          version: entry.version,
          bump: entry.bump,
          packages: entry.packages,
          intents: entry.intents,
          narrative: narrativePath,
        },
        null,
        2,
      )}\n`,
    );
    written.push(metaPath);
    if (!existsSync(path.join(repoRoot, narrativePath))) {
      writeFileSync(
        path.join(repoRoot, narrativePath),
        `# ${entry.train} v${entry.version}\n\n` +
          `<!-- Narrative for the GitHub Release body. /release synthesizes it from intent\n` +
          `prose, manifest diffs, and linked PR descriptions — do not concatenate entries. -->\n`,
      );
      written.push(narrativePath);
    }
  }

  // Intents are consumed by the release — the merge commit freezes what was
  // reviewed, and pending state goes back to an empty .changes/.
  for (const intent of intents) {
    rmSync(path.join(repoRoot, intent.file));
  }

  return { assembled, written, errors: [] };
}

export interface TrainStatus {
  train: string;
  currentVersion: string;
  pendingIntents: number;
  bump: string | null;
  nextVersion: string | null;
}

export function releaseStatus(repoRoot: string): { status: TrainStatus[]; errors: string[] } {
  const trains = discoverTrains(repoRoot);
  const { intents, errors } = loadIntents(repoRoot, trains);
  const status = trains.map((train) => {
    const trainIntents = intents.filter((intent) => intent.bumps[train.name] !== undefined);
    const bump =
      trainIntents.length > 0
        ? maxBump(
            trainIntents.map((intent) => intent.bumps[train.name]).filter((b) => b !== undefined),
          )
        : null;
    return {
      train: train.name,
      currentVersion: trainVersion(train),
      pendingIntents: trainIntents.length,
      bump,
      nextVersion: bump ? nextTrainVersion(train, bump) : null,
    };
  });
  return { status, errors };
}
