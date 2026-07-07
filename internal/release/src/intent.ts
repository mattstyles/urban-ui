/**
 * Intent files: `.changes/*.md` in the changesets file shape — frontmatter
 * mapping release train → bump level, prose body addressed to the design
 * system consumer (it becomes the changelog entry, not a PR summary).
 *
 *   ---
 *   core: minor
 *   ---
 *
 *   Button gains an `isPending` state ...
 *
 * Intent declares the train, not the package; per-package precision is
 * recovered at assembly from manifest diffs ([[0004-release-strategy]]).
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Train } from "./trains.js";

export const BUMP_LEVELS = ["patch", "minor", "major"] as const;
export type Bump = (typeof BUMP_LEVELS)[number];

export interface Intent {
  /** Repo-relative file path, e.g. ".changes/button-pending.md". */
  file: string;
  bumps: Record<string, Bump>;
  /** Consumer-addressed changelog prose (trimmed). */
  prose: string;
}

export interface IntentParseResult {
  intent: Intent | null;
  errors: string[];
}

export const CHANGES_DIR = ".changes";

function isBump(value: string): value is Bump {
  return (BUMP_LEVELS as readonly string[]).includes(value);
}

export function parseIntent(file: string, source: string, trains: Train[]): IntentParseResult {
  const errors: string[] = [];
  const match = source.trimStart().match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match || match[1] === undefined || match[2] === undefined) {
    return { intent: null, errors: [`${file}: missing frontmatter block (--- train: bump ---)`] };
  }

  const bumps: Record<string, Bump> = {};
  const trainNames = new Set(trains.map((train) => train.name));
  for (const rawLine of match[1].split("\n")) {
    const line = rawLine.trim();
    if (line.length === 0) {
      continue;
    }
    const entry = line.match(/^([A-Za-z][A-Za-z0-9-]*):\s*(\S+)$/);
    if (!entry || entry[1] === undefined || entry[2] === undefined) {
      errors.push(`${file}: malformed frontmatter line "${line}" (expected "train: bump")`);
      continue;
    }
    const [, train, bump] = entry;
    if (!trainNames.has(train)) {
      errors.push(
        `${file}: unknown train "${train}" (known: ${[...trainNames].sort((a, b) => a.localeCompare(b)).join(", ")})`,
      );
      continue;
    }
    if (!isBump(bump)) {
      errors.push(`${file}: invalid bump "${bump}" for train "${train}" (patch | minor | major)`);
      continue;
    }
    if (bumps[train] !== undefined) {
      errors.push(`${file}: duplicate train "${train}"`);
      continue;
    }
    bumps[train] = bump;
  }

  if (Object.keys(bumps).length === 0 && errors.length === 0) {
    errors.push(`${file}: frontmatter names no trains`);
  }
  const prose = match[2].trim();
  if (prose.length === 0) {
    errors.push(`${file}: empty prose — the intent body is the consumer-facing changelog entry`);
  }

  return errors.length > 0
    ? { intent: null, errors }
    : { intent: { file, bumps, prose }, errors: [] };
}

export function loadIntents(
  repoRoot: string,
  trains: Train[],
): { intents: Intent[]; errors: string[] } {
  const dir = path.join(repoRoot, CHANGES_DIR);
  if (!existsSync(dir)) {
    return { intents: [], errors: [] };
  }
  const intents: Intent[] = [];
  const errors: string[] = [];
  for (const entry of readdirSync(dir).sort((a, b) => a.localeCompare(b))) {
    if (!entry.endsWith(".md") || entry === "README.md") {
      continue;
    }
    const file = `${CHANGES_DIR}/${entry}`;
    const result = parseIntent(file, readFileSync(path.join(dir, entry), "utf8"), trains);
    if (result.intent) {
      intents.push(result.intent);
    }
    errors.push(...result.errors);
  }
  return { intents, errors };
}
