import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { devDependencyVersion, extractAccentToken } from "./consumer-smoke.js";

const REPO_ROOT = path.join(import.meta.dirname, "..", "..", "..");

describe("extractAccentToken", () => {
  it("pulls the accent literal, not accentText", () => {
    const source = [
      `export const colors = stylex.defineVars({`,
      `  surface: "#ffffff",`,
      `  accent: "#123abc",`,
      `  accentText: "#ffffff",`,
      `});`,
    ].join("\n");
    expect(extractAccentToken(source)).toBe("#123abc");
  });

  it("returns undefined when no accent literal exists", () => {
    expect(extractAccentToken(`const nope = "#4f46e5";`)).toBeUndefined();
  });

  it("derives a probe from the real theme source", () => {
    const source = readFileSync(
      path.join(REPO_ROOT, "packages", "theme", "src", "tokens.stylex.ts"),
      "utf8",
    );
    expect(extractAccentToken(source)).toMatch(/^#[0-9a-fA-F]{3,8}$/);
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
