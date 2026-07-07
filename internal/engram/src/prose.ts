/**
 * Authored-prose parsing: wiki-links, name-shaped code spans, and the
 * frontmatter escape hatch.
 *
 * The validation contract (enforced by validate.ts):
 * - Every `[[wiki-link]]` must resolve to a known entity — a manifest entity
 *   (component, pattern, token group) or a repo doc under docs/. Resolved
 *   links become typed graph edges in the manifest.
 * - Every single-identifier code span (`likeThis`) must be a known name:
 *   a component, prop, example, pattern, token group, token, or public type.
 *   Multi-word, punctuated, or path-like spans (`cursor: pointer`,
 *   `react-aria-components`, `src/button`) are free text and never checked.
 * - A doc can exempt spans it knows are not names via frontmatter:
 *   `prose-ignore: [word, another]`.
 */

const WIKI_LINK_PATTERN = /\[\[([^\]]+)\]\]/g;
const CODE_SPAN_PATTERN = /`([^`\n]+)`/g;
const IDENTIFIER_PATTERN = /^[A-Za-z][A-Za-z0-9]*$/;

export interface ProseReference {
  value: string;
  line: number;
}

export interface ParsedProse {
  wikiLinks: ProseReference[];
  /** Single-identifier code spans — candidate name references. */
  nameSpans: ProseReference[];
  /** Frontmatter `prose-ignore` entries. */
  ignored: Set<string>;
}

function lineOf(source: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (source[i] === "\n") {
      line += 1;
    }
  }
  return line;
}

function parseFrontmatterIgnores(source: string): Set<string> {
  const ignored = new Set<string>();
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
  const ignoreLine = frontmatter?.[1]?.match(/^prose-ignore:\s*\[([^\]]*)\]/m);
  if (ignoreLine?.[1]) {
    for (const entry of ignoreLine[1].split(",")) {
      const trimmed = entry.trim();
      if (trimmed.length > 0) {
        ignored.add(trimmed);
      }
    }
  }
  return ignored;
}

export function parseProse(source: string): ParsedProse {
  // Fenced code blocks are code, not prose — strip them (keeping line count
  // intact) so their contents produce neither spans nor links.
  const withoutFences = source.replace(/^```[\s\S]*?^```/gm, (block) =>
    block.replace(/[^\n]/g, " "),
  );

  const wikiLinks: ProseReference[] = [];
  for (const match of withoutFences.matchAll(WIKI_LINK_PATTERN)) {
    const value = match[1]?.trim();
    if (value) {
      wikiLinks.push({ value, line: lineOf(withoutFences, match.index) });
    }
  }

  const nameSpans: ProseReference[] = [];
  for (const match of withoutFences.matchAll(CODE_SPAN_PATTERN)) {
    const value = match[1]?.trim();
    if (value && IDENTIFIER_PATTERN.test(value)) {
      nameSpans.push({ value, line: lineOf(withoutFences, match.index) });
    }
  }

  return { wikiLinks, nameSpans, ignored: parseFrontmatterIgnores(source) };
}
