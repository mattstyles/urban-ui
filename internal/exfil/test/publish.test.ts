import { describe, expect, it } from "bun:test";
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { assembleRelease } from "../src/assemble.js";
import { planDepartures, tagNameFor } from "../src/publish.js";

const FIXTURE = path.join(import.meta.dirname, "fixtures", "repo");

function git(cwd: string, args: string[]): void {
  execFileSync("git", args, { cwd, encoding: "utf8" });
}

/** Materialize the fixture as a git repo so tag lookups work. */
function materializeGitRepo(): string {
  const dir = mkdtempSync(path.join(tmpdir(), "urban-publish-"));
  cpSync(FIXTURE, dir, { recursive: true });
  git(dir, ["init", "--quiet"]);
  git(dir, ["-c", "user.email=t@t", "-c", "user.name=t", "commit", "--allow-empty", "-qm", "init"]);
  return dir;
}

describe("tagNameFor", () => {
  it("uses hyphen tags per train", () => {
    expect(tagNameFor("core", "0.10.0")).toBe("core-v0.10.0");
    expect(tagNameFor("labs", "0.3.0")).toBe("labs-v0.3.0");
    expect(tagNameFor("urban", "1.2.3")).toBe("urban-v1.2.3");
  });
});

describe("planDepartures", () => {
  it("returns nothing before any release is assembled", () => {
    const repo = materializeGitRepo();
    expect(planDepartures(repo)).toEqual([]);
  });

  it("plans assembled departures and marks tagged ones done", () => {
    const repo = materializeGitRepo();
    const assembled = assembleRelease(repo);
    expect(assembled.errors).toEqual([]);

    const before = planDepartures(repo);
    expect(before.map((departure) => `${departure.tag}:${departure.tagged}`)).toEqual([
      "core-v0.10.0:false",
      "labs-v0.3.0:false",
    ]);
    expect(before[0]?.packages).toEqual([
      { name: "@fix/react", version: "0.10.0" },
      { name: "@fix/theme", version: "0.10.0" },
    ]);
    expect(before[0]?.narrativePath).toBe("releases/core-0.10.0.md");

    git(repo, ["tag", "core-v0.10.0"]);
    const after = planDepartures(repo);
    expect(after.find((departure) => departure.train === "core")?.tagged).toBe(true);
    expect(after.find((departure) => departure.train === "labs")?.tagged).toBe(false);
  });
});
