import { describe, expect, it } from "bun:test";
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { runExtractor } from "../src/generate.js";
import type { Manifest } from "../src/manifest.js";

/** Copy a fixture repo to a temp dir so generate mode can write manifests. */
function materialize(fixture: string): string {
  const dir = mkdtempSync(path.join(tmpdir(), `urban-extractor-${fixture}-`));
  cpSync(path.join(import.meta.dirname, "fixtures", fixture), dir, { recursive: true });
  return dir;
}

describe("runExtractor on the valid fixture", () => {
  const repo = materialize("valid");
  const result = runExtractor(repo, "generate");
  const manifest = JSON.parse(
    readFileSync(path.join(repo, "packages/ui/urban-manifest.json"), "utf8"),
  ) as Manifest;

  it("reports no issues and writes the manifest", () => {
    expect(result.issues).toEqual([]);
    expect(result.manifests).toEqual(["packages/ui/urban-manifest.json"]);
  });

  it("extracts the prop surface with JSDoc and optionality", () => {
    const chip = manifest.components[0];
    expect(chip?.name).toBe("chip");
    expect(chip?.displayName).toBe("Chip");
    expect(chip?.propsType).toBe("ChipProps");
    expect(chip?.exportPath).toBe("@fixture/ui/chip");
    expect(chip?.props).toEqual([
      {
        name: "count",
        type: "number | undefined",
        optional: true,
        description: "How many.",
        declaredIn: "ChipProps",
      },
      {
        name: "label",
        type: "string",
        optional: false,
        description: "The label.",
        declaredIn: "ChipProps",
      },
    ]);
  });

  it("indexes examples with published paths and exports", () => {
    expect(manifest.components[0]?.examples).toEqual([
      { name: "basic", path: "src/chip/examples/basic.tsx", exports: ["Basic"] },
    ]);
  });

  it("extracts token groups from defineVars sources", () => {
    expect(manifest.tokenGroups).toEqual([
      { name: "palette", path: "src/vars.stylex.ts", tokens: ["base", "contrast"] },
    ]);
  });

  it("turns wiki-links into typed graph edges", () => {
    expect(manifest.graph).toEqual([
      { from: "component:chip", to: "repo-doc:fixture-doc", type: "repo-doc" },
    ]);
  });

  it("check passes on fresh manifests and fails on tampered ones", () => {
    expect(runExtractor(repo, "check").issues).toEqual([]);
    const manifestPath = path.join(repo, "packages/ui/urban-manifest.json");
    writeFileSync(manifestPath, `${readFileSync(manifestPath, "utf8")}\n`);
    const stale = runExtractor(repo, "check");
    expect(stale.issues.map((issue) => issue.message).join("\n")).toContain("Manifest is stale");
  });
});

describe("runExtractor on the invalid fixture", () => {
  const repo = materialize("invalid");
  const messages = runExtractor(repo, "generate")
    .issues.map((issue) => `${issue.file} ${issue.message}`)
    .join("\n");

  it("flags the cross-package name collision", () => {
    expect(messages).toContain("Name collision");
    expect(messages).toContain('"chip"');
  });

  it("flags unresolved wiki-links", () => {
    expect(messages).toContain("Unresolved wiki-link [[ghost]]");
  });

  it("enforces the labs direction rule, one way only", () => {
    expect(messages).toContain("Stable prose links into labs");
    // gamma's labs doc links into stable chip — that direction is fine.
    expect(messages).not.toContain("gadget.md Stable prose links into labs");
  });

  it("flags unknown name spans", () => {
    expect(messages).toContain("Unknown name `unknownName`");
  });
});
