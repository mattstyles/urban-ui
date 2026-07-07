#!/usr/bin/env bun
/**
 * urban-extract — generate or verify urban manifests.
 *
 *   urban-extract generate   write urban-manifest.json for every urban package
 *   urban-extract check      regenerate in-memory; fail on drift or any
 *                            prose/graph/uniqueness violation (the CI gate)
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { runExtractor } from "./generate.js";

function findRepoRoot(start: string): string {
  let dir = start;
  while (true) {
    if (existsSync(path.join(dir, "bun.lock"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(`Repo root not found walking up from ${start} (no bun.lock)`);
    }
    dir = parent;
  }
}

const mode = process.argv[2];
if (mode !== "generate" && mode !== "check") {
  console.error("Usage: urban-extract <generate|check>");
  process.exit(2);
}

const repoRoot = findRepoRoot(process.cwd());
const result = runExtractor(repoRoot, mode);

for (const manifest of result.manifests) {
  console.log(`${mode === "generate" ? "wrote" : "checked"} ${manifest}`);
}
if (result.issues.length > 0) {
  console.error(`\n${result.issues.length} issue(s):`);
  for (const issue of result.issues) {
    console.error(
      `  ${issue.file}${issue.line === undefined ? "" : `:${issue.line}`} — ${issue.message}`,
    );
  }
  process.exit(1);
}
