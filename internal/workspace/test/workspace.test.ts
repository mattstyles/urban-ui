import { describe, expect, it } from "bun:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { findRepoRoot, workspacePackages } from "../src/index.js";

const FIXTURE = path.join(import.meta.dirname, "fixtures", "repo");

describe("findRepoRoot", () => {
  it("walks up from a nested directory to the bun.lock root", () => {
    expect(findRepoRoot(path.join(FIXTURE, "packages", "aster"))).toBe(FIXTURE);
    expect(findRepoRoot(FIXTURE)).toBe(FIXTURE);
  });

  it("throws when no bun.lock exists on the walk", () => {
    const orphan = mkdtempSync(path.join(tmpdir(), "urban-workspace-"));
    expect(() => findRepoRoot(orphan)).toThrow("no bun.lock");
  });
});

describe("workspacePackages", () => {
  const packages = workspacePackages(FIXTURE);

  it("enumerates every group, skipping directories without a manifest", () => {
    expect(packages.map((pkg) => `${pkg.group}:${pkg.name}:${pkg.kind}`)).toEqual([
      "apps:@fix/site:npm",
      "internal:@fix/tool:npm",
      "packages:@fix/aster:npm",
      "packages:@fix/tooling:npm",
      "packages:@fix/unmarked:npm",
      "packages:urban:binary",
    ]);
  });

  it("reports publishability via the private flag and defaults the version", () => {
    const site = packages.find((pkg) => pkg.name === "@fix/site");
    expect(site).toMatchObject({ kind: "npm", private: true, version: "0.0.0" });
    const aster = packages.find((pkg) => pkg.name === "@fix/aster");
    expect(aster).toMatchObject({ kind: "npm", private: false, version: "0.1.0" });
  });

  it("surfaces the urban marker, null when absent", () => {
    const aster = packages.find((pkg) => pkg.name === "@fix/aster");
    expect(aster?.kind === "npm" && aster.urban).toEqual({ manifest: "./urban-manifest.json" });
    const unmarked = packages.find((pkg) => pkg.name === "@fix/unmarked");
    expect(unmarked?.kind === "npm" && unmarked.urban).toBeNull();
  });

  it("identifies binary packages by Cargo.toml/go.mod and names them by directory", () => {
    const urban = packages.find((pkg) => pkg.name === "urban");
    expect(urban).toMatchObject({
      kind: "binary",
      dir: path.join(FIXTURE, "packages", "urban"),
      group: "packages",
    });
  });

  it("returns absolute package directories", () => {
    for (const pkg of packages) {
      expect(path.isAbsolute(pkg.dir)).toBe(true);
    }
  });
});
