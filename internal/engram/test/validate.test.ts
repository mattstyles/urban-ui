import { describe, expect, it } from "bun:test";
import {
  checkStaleness,
  type DocContext,
  EntityRegistry,
  resolveWikiLinks,
  validateNameSpans,
} from "../src/validate.js";

const stableDoc: DocContext = {
  file: "packages/ui/src/chip/chip.md",
  from: "component:chip",
  tier: "stable",
};
const labsDoc: DocContext = {
  file: "packages/labs/src/gadget/gadget.md",
  from: "component:gadget",
  tier: "labs",
};

function registryWith(entries: [string, "stable" | "labs"][]): EntityRegistry {
  const registry = new EntityRegistry(new Set(["package-anatomy"]));
  for (const [name, tier] of entries) {
    registry.register(name, { pkg: `pkg-${name}`, tier, kind: "component" }, "urban-manifest.json");
  }
  return registry;
}

describe("EntityRegistry", () => {
  it("collects a collision across packages as an issue", () => {
    const registry = new EntityRegistry(new Set());
    registry.register(
      "chip",
      { pkg: "a", tier: "stable", kind: "component" },
      "a/urban-manifest.json",
    );
    registry.register(
      "chip",
      { pkg: "b", tier: "stable", kind: "pattern" },
      "b/urban-manifest.json",
    );
    expect(registry.issues).toHaveLength(1);
    expect(registry.issues[0]?.message).toContain("Name collision");
  });
});

describe("resolveWikiLinks", () => {
  it("resolves entities and repo docs to typed edges", () => {
    const registry = registryWith([["chip", "stable"]]);
    const { edges, issues } = resolveWikiLinks(
      stableDoc,
      [
        { value: "chip", line: 1 },
        { value: "package-anatomy", line: 2 },
      ],
      registry,
    );
    expect(issues).toEqual([]);
    expect(edges).toEqual([
      { from: "component:chip", to: "component:chip", type: "component" },
      { from: "component:chip", to: "repo-doc:package-anatomy", type: "repo-doc" },
    ]);
  });

  it("reports unresolved wiki-links", () => {
    const { edges, issues } = resolveWikiLinks(
      stableDoc,
      [{ value: "ghost", line: 7 }],
      registryWith([]),
    );
    expect(edges).toEqual([]);
    expect(issues[0]?.message).toContain("Unresolved wiki-link [[ghost]]");
    expect(issues[0]?.line).toBe(7);
  });

  it("enforces the labs direction rule", () => {
    const registry = registryWith([
      ["chip", "stable"],
      ["gadget", "labs"],
    ]);
    const stableIntoLabs = resolveWikiLinks(stableDoc, [{ value: "gadget", line: 3 }], registry);
    expect(stableIntoLabs.edges).toEqual([]);
    expect(stableIntoLabs.issues[0]?.message).toContain("Stable prose links into labs");

    const labsIntoStable = resolveWikiLinks(labsDoc, [{ value: "chip", line: 3 }], registry);
    expect(labsIntoStable.issues).toEqual([]);
    expect(labsIntoStable.edges).toHaveLength(1);
  });
});

describe("validateNameSpans", () => {
  it("accepts known names, the styling allowlist, and doc ignores", () => {
    const issues = validateNameSpans(
      stableDoc,
      [
        { value: "isDisabled", line: 1 },
        { value: "className", line: 2 },
        { value: "defineVars", line: 3 },
      ],
      new Set(["isDisabled"]),
      new Set(["defineVars"]),
    );
    expect(issues).toEqual([]);
  });

  it("flags unknown names with position", () => {
    const issues = validateNameSpans(
      stableDoc,
      [{ value: "isDissabled", line: 12 }],
      new Set(),
      new Set(),
    );
    expect(issues[0]?.message).toContain("Unknown name `isDissabled`");
    expect(issues[0]?.line).toBe(12);
  });
});

describe("checkStaleness", () => {
  it("flags missing and stale manifests, passes identical ones", () => {
    expect(checkStaleness("m.json", "{}\n", null)[0]?.message).toContain("Manifest missing");
    expect(checkStaleness("m.json", "{}\n", "{stale}\n")[0]?.message).toContain(
      "Manifest is stale",
    );
    expect(checkStaleness("m.json", "{}\n", "{}\n")).toEqual([]);
  });
});
