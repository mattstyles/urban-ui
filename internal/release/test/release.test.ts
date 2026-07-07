import { describe, expect, it } from "bun:test";
import { cpSync, existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { assembleRelease, releaseStatus } from "../src/assemble.js";
import { runGates } from "../src/gates.js";
import { loadIntents, parseIntent } from "../src/intent.js";
import { discoverTrains, type Train, trainVersion } from "../src/trains.js";
import { applySemantics, maxBump, nextTrainVersion } from "../src/versions.js";

const FIXTURE = path.join(import.meta.dirname, "fixtures", "repo");

function materialize(): string {
  const dir = mkdtempSync(path.join(tmpdir(), "urban-release-"));
  cpSync(FIXTURE, dir, { recursive: true });
  return dir;
}

describe("discoverTrains", () => {
  const trains = discoverTrains(FIXTURE);

  it("derives core, labs, and binary trains from repository shape", () => {
    expect(trains.map((train) => `${train.name}:${train.kind}`)).toEqual([
      "core:npm",
      "labs:npm",
      "urban:binary",
    ]);
  });

  it("excludes private packages from the core train", () => {
    const core = trains.find((train) => train.name === "core");
    expect(core?.packages.map((pkg) => pkg.name)).toEqual(["@fix/react", "@fix/theme"]);
  });

  it("gives core its launch version and enforces lockstep", () => {
    const core = trains.find((train) => train.name === "core");
    expect(core?.launchVersion).toBe("0.10.0");
    expect(trainVersion(core as Train)).toBe("0.0.0");
    const diverged: Train = {
      ...(core as Train),
      packages: [
        { name: "a", dir: "/a", version: "0.1.0" },
        { name: "b", dir: "/b", version: "0.2.0" },
      ],
    };
    expect(() => trainVersion(diverged)).toThrow("not in lockstep");
  });
});

describe("parseIntent", () => {
  const trains = discoverTrains(FIXTURE);

  it("parses the changesets shape including multi-train graduation", () => {
    const result = parseIntent(
      "x.md",
      "---\ncore: minor\nlabs: major\n---\n\nGraduated.\n",
      trains,
    );
    expect(result.errors).toEqual([]);
    expect(result.intent?.bumps).toEqual({ core: "minor", labs: "major" });
    expect(result.intent?.prose).toBe("Graduated.");
  });

  it("accepts the binary-train shape for the future CLI", () => {
    const result = parseIntent("x.md", "---\nurban: minor\n---\n\nNew subcommand.\n", trains);
    expect(result.errors).toEqual([]);
    expect(result.intent?.bumps).toEqual({ urban: "minor" });
  });

  it("rejects unknown trains, bad bumps, duplicates, and empty prose", () => {
    expect(parseIntent("x.md", "---\nghost: minor\n---\n\np\n", trains).errors[0]).toContain(
      'unknown train "ghost"',
    );
    expect(parseIntent("x.md", "---\ncore: huge\n---\n\np\n", trains).errors[0]).toContain(
      'invalid bump "huge"',
    );
    expect(
      parseIntent("x.md", "---\ncore: minor\ncore: patch\n---\n\np\n", trains).errors[0],
    ).toContain("duplicate train");
    expect(parseIntent("x.md", "---\ncore: minor\n---\n\n\n", trains).errors[0]).toContain(
      "empty prose",
    );
    expect(parseIntent("x.md", "no frontmatter", trains).errors[0]).toContain(
      "missing frontmatter",
    );
  });

  it("loads fixture intents, skipping the README", () => {
    const { intents, errors } = loadIntents(FIXTURE, trains);
    expect(errors).toEqual([]);
    expect(intents.map((intent) => intent.file)).toEqual([
      ".changes/button-pending.md",
      ".changes/fix-radius.md",
      ".changes/graduation.md",
    ]);
  });
});

describe("version math", () => {
  it("takes the max bump per train", () => {
    expect(maxBump(["patch", "major", "minor"])).toBe("major");
    expect(maxBump(["patch", "patch"])).toBe("patch");
  });

  it("maps pre-1.0 majors to minors, and respects real majors after 1.0", () => {
    expect(applySemantics("0.10.0", "major")).toBe("0.11.0");
    expect(applySemantics("0.10.1", "minor")).toBe("0.11.0");
    expect(applySemantics("0.10.1", "patch")).toBe("0.10.2");
    expect(applySemantics("1.2.3", "major")).toBe("2.0.0");
    expect(applySemantics("1.2.3", "minor")).toBe("1.3.0");
  });

  it("departs never-released trains at their launch version", () => {
    const trains = discoverTrains(FIXTURE);
    const core = trains.find((train) => train.name === "core") as Train;
    expect(nextTrainVersion(core, "patch")).toBe("0.10.0");
  });

  it("graduation intent produces minors on both 0.x trains", () => {
    const trains = discoverTrains(FIXTURE);
    const labs = trains.find((train) => train.name === "labs") as Train;
    // labs at 0.2.0, intent says major → 0.x maps it to a minor.
    expect(nextTrainVersion(labs, "major")).toBe("0.3.0");
  });
});

describe("runGates", () => {
  const trains = discoverTrains(FIXTURE);
  const intent = { file: ".changes/x.md", bumps: { core: "minor" as const }, prose: "p" };

  it("fails published source touched without intent", () => {
    const issues = runGates(["packages/react/src/button/button.tsx"], [], trains, FIXTURE);
    expect(issues[0]?.message).toContain('without release intent for train "core"');
  });

  it("fails an intent naming an untouched train", () => {
    const issues = runGates(["docs/adr/0004-release-strategy.md"], [intent], trains, FIXTURE);
    expect(issues[0]?.message).toContain('Intent names untouched train "core"');
  });

  it("fails a manifest change without intent, with its own message", () => {
    const issues = runGates(["packages/react/urban-manifest.json"], [], trains, FIXTURE);
    expect(issues[0]?.message).toContain("Manifest changed without release intent");
  });

  it("ignores repo-only files and private packages", () => {
    expect(
      runGates(
        [
          "packages/react/src/button/button.test.tsx",
          "packages/react/src/button/button.visual.tsx",
          "packages/react/src/button/__screenshots__/button.visual/Base.png",
          "packages/tooling/src/index.ts",
          "apps/workbench/src/app.tsx",
        ],
        [],
        trains,
        FIXTURE,
      ),
    ).toEqual([]);
  });

  it("passes when the touched train is covered by an added intent", () => {
    expect(runGates(["packages/theme/src/tokens.stylex.ts"], [intent], trains, FIXTURE)).toEqual(
      [],
    );
  });
});

describe("assembleRelease", () => {
  const repo = materialize();
  const result = assembleRelease(repo);

  it("computes launch and mapped versions per train", () => {
    expect(result.errors).toEqual([]);
    expect(
      result.assembled.map(
        (entry) => `${entry.train} ${entry.previousVersion}→${entry.version} (${entry.bump})`,
      ),
    ).toEqual(["core 0.0.0→0.10.0 (minor)", "labs 0.2.0→0.3.0 (major)"]);
  });

  it("applies versions to every lockstep member", () => {
    for (const pkg of ["react", "theme"]) {
      const json = JSON.parse(
        readFileSync(path.join(repo, `packages/${pkg}/package.json`), "utf8"),
      );
      expect(json.version).toBe("0.10.0");
    }
    const labs = JSON.parse(readFileSync(path.join(repo, "packages/labs/package.json"), "utf8"));
    expect(labs.version).toBe("0.3.0");
  });

  it("writes changelogs with bump-labelled consumer prose", () => {
    const changelog = readFileSync(path.join(repo, "packages/react/CHANGELOG.md"), "utf8");
    expect(changelog).toContain("# @fix/react");
    expect(changelog).toContain("## 0.10.0");
    expect(changelog).toContain("- **minor** — Button gains a pending state.");
    expect(changelog).toContain("- **patch** — Control radius corrected on compact buttons.");
  });

  it("emits release meta JSON and a narrative skeleton", () => {
    const meta = JSON.parse(readFileSync(path.join(repo, "releases/core-0.10.0.json"), "utf8"));
    expect(meta.schemaVersion).toBe(1);
    expect(meta.packages).toEqual([
      { name: "@fix/react", version: "0.10.0" },
      { name: "@fix/theme", version: "0.10.0" },
    ]);
    expect(meta.intents).toHaveLength(3);
    expect(existsSync(path.join(repo, "releases/core-0.10.0.md"))).toBe(true);
    expect(existsSync(path.join(repo, "releases/labs-0.3.0.json"))).toBe(true);
  });

  it("consumes intents; a second assemble has nothing to do", () => {
    expect(existsSync(path.join(repo, ".changes/button-pending.md"))).toBe(false);
    expect(existsSync(path.join(repo, ".changes/README.md"))).toBe(true);
    expect(assembleRelease(repo).errors[0]).toContain("No pending intents");
  });

  it("reports status from pending intents", () => {
    const fresh = materialize();
    const { status } = releaseStatus(fresh);
    const core = status.find((entry) => entry.train === "core");
    expect(core).toEqual({
      train: "core",
      currentVersion: "0.0.0",
      pendingIntents: 3,
      bump: "minor",
      nextVersion: "0.10.0",
    });
  });
});
