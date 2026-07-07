import { describe, expect, it } from "bun:test";
import { parseProse } from "../src/prose.js";

describe("parseProse", () => {
  it("extracts wiki-links with line numbers", () => {
    const prose = parseProse("# Doc\n\nSee [[package-anatomy]] and [[button]].\n");
    expect(prose.wikiLinks.map((link) => link.value)).toEqual(["package-anatomy", "button"]);
    expect(prose.wikiLinks[0]?.line).toBe(3);
  });

  it("treats only single-identifier code spans as name candidates", () => {
    const prose = parseProse(
      "Uses `isDisabled` and `cursor: pointer` and `react-aria-components` and `src/button`.\n",
    );
    expect(prose.nameSpans.map((span) => span.value)).toEqual(["isDisabled"]);
  });

  it("ignores fenced code blocks entirely", () => {
    const prose = parseProse("```tsx\nconst x = `notAName`;\n[[not-a-link]]\n```\n\n`realName`\n");
    expect(prose.wikiLinks).toEqual([]);
    expect(prose.nameSpans.map((span) => span.value)).toEqual(["realName"]);
    expect(prose.nameSpans[0]?.line).toBe(6);
  });

  it("reads prose-ignore frontmatter", () => {
    const prose = parseProse(
      "---\ntags: [x]\nprose-ignore: [defineVars, createTheme]\n---\n\n`defineVars`\n",
    );
    expect(prose.ignored).toEqual(new Set(["defineVars", "createTheme"]));
  });
});
