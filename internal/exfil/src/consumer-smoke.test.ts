import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { devDependencyVersion, extractTokenProbe } from "./consumer-smoke.js";

const REPO_ROOT = path.join(import.meta.dirname, "..", "..", "..");

describe("extractTokenProbe", () => {
  it("pulls lineHeight.sm, not fontSize.sm", () => {
    const source = [
      `export const fontSize = stylex.defineVars({`,
      `  sm: "0.875rem",`,
      `});`,
      ``,
      `export const lineHeight = stylex.defineVars({`,
      `  xs: "1rem",`,
      `  sm: "1.25rem",`,
      `});`,
    ].join("\n");
    expect(extractTokenProbe(source)).toBe("1.25rem");
  });

  it("returns undefined when no lineHeight literal exists", () => {
    expect(extractTokenProbe(`const nope = "1.25rem";`)).toBeUndefined();
  });

  it("derives a minification-stable probe from the real theme source", () => {
    const source = readFileSync(
      path.join(REPO_ROOT, "packages", "theme", "src", "text.stylex.ts"),
      "utf8",
    );
    // Must not start with "0." — lightningcss strips the leading zero and
    // the byte-for-byte CSS assertion would miss it.
    expect(extractTokenProbe(source)).toMatch(/^[1-9][\d.]*(px|rem)$/);
  });
});

describe("devDependencyVersion", () => {
  it("reads declared versions from workspace package.json files", () => {
    expect(
      devDependencyVersion(REPO_ROOT, path.join("packages", "react"), "@stylexjs/unplugin"),
    ).toMatch(/^\d/);
    expect(devDependencyVersion(REPO_ROOT, path.join("apps", "workbench"), "vite")).toMatch(/^\d/);
  });

  it("returns undefined for undeclared dependencies", () => {
    expect(
      devDependencyVersion(REPO_ROOT, path.join("packages", "react"), "not-a-real-dependency"),
    ).toBeUndefined();
  });
});
