/**
 * Version math ([[0004-release-strategy]]): max bump across accumulated
 * intents per train; intent declares semantics, the train's state maps
 * semantics to numbers — a pre-1.0 train versions breaking changes as minors
 * (labs permanently; core until it commits to 1.0). A never-released train
 * (0.0.0) departs at its launch version.
 */

import type { Bump } from "./intent.js";
import { type Train, trainVersion } from "./trains.js";

const BUMP_RANK: Record<Bump, number> = { patch: 0, minor: 1, major: 2 };

export function maxBump(bumps: Bump[]): Bump {
  let max: Bump = "patch";
  for (const bump of bumps) {
    if (BUMP_RANK[bump] > BUMP_RANK[max]) {
      max = bump;
    }
  }
  return max;
}

interface Version {
  major: number;
  minor: number;
  patch: number;
}

export function parseVersion(text: string): Version {
  const match = text.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match || match[1] === undefined || match[2] === undefined || match[3] === undefined) {
    throw new Error(`Unparseable version "${text}" (expected major.minor.patch)`);
  }
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) };
}

/** Map intent semantics to a number by train state: pre-1.0 majors are minors. */
export function applySemantics(current: string, bump: Bump): string {
  const version = parseVersion(current);
  const effective: Bump = version.major === 0 && bump === "major" ? "minor" : bump;
  switch (effective) {
    case "major":
      return `${version.major + 1}.0.0`;
    case "minor":
      return `${version.major}.${version.minor + 1}.0`;
    case "patch":
      return `${version.major}.${version.minor}.${version.patch + 1}`;
  }
}

/** The version a train departs at, given the max bump over its intents. */
export function nextTrainVersion(train: Train, bump: Bump): string {
  const current = trainVersion(train);
  if (current === "0.0.0") {
    return train.launchVersion;
  }
  return applySemantics(current, bump);
}
