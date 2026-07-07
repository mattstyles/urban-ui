#!/usr/bin/env bun
/**
 * engram — generate or verify urban manifests, the package's stored knowledge.
 *
 *   engram generate   write urban-manifest.json for every urban package
 *   engram check      regenerate in-memory; fail on drift or any
 *                     prose/graph/uniqueness violation (the CI gate)
 */

import { findRepoRoot } from "@urban-ui/workspace";
import { defineCommand, runMain } from "citty";
import { runExtractor } from "./generate.js";

function extract(mode: "generate" | "check"): void {
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
}

const main = defineCommand({
  meta: {
    name: "engram",
    description: "Manifest extractor and prose validator — generates urban-manifest.json",
  },
  subCommands: {
    generate: defineCommand({
      meta: {
        name: "generate",
        description: "Write urban-manifest.json for every urban package",
      },
      run() {
        extract("generate");
      },
    }),
    check: defineCommand({
      meta: {
        name: "check",
        description:
          "Regenerate in-memory; fail on drift or any prose/graph/uniqueness violation (the CI gate)",
      },
      run() {
        extract("check");
      },
    }),
  },
});

runMain(main);
