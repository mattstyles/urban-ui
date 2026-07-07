/**
 * The validation spine: name uniqueness, wiki-link resolution, the labs
 * direction rule, prose name checking, and manifest staleness.
 *
 * Every issue is collected (never thrown) so CI reports the full set in one
 * run; any issue fails the gate.
 */

import type { GraphEdge, Manifest, Tier } from "./manifest.js";
import type { ProseReference } from "./prose.js";

export interface ValidationIssue {
  /** Repo-relative file the issue points at. */
  file: string;
  line?: number;
  message: string;
}

interface EntityRecord {
  pkg: string;
  tier: Tier;
  kind: "component" | "pattern" | "token-group";
}

/**
 * Global entity registry: components, patterns, and token groups share one
 * name universe across every urban package — uniqueness is what lets prose
 * reference a name without qualification ([[package-anatomy]]).
 */
export class EntityRegistry {
  private readonly entities = new Map<string, EntityRecord>();
  readonly issues: ValidationIssue[] = [];

  constructor(private readonly repoDocs: Set<string>) {}

  register(name: string, record: EntityRecord, file: string): void {
    const existing = this.entities.get(name);
    if (existing) {
      this.issues.push({
        file,
        message:
          `Name collision: "${name}" (${record.kind} in ${record.pkg}) already registered ` +
          `as ${existing.kind} in ${existing.pkg} — component, pattern, and token-group ` +
          `names are one global namespace`,
      });
      return;
    }
    this.entities.set(name, record);
  }

  /** Resolve a wiki-link target to a typed edge target, or null. */
  resolve(target: string): { to: string; type: GraphEdge["type"]; tier: Tier | null } | null {
    const entity = this.entities.get(target);
    if (entity) {
      return { to: `${entity.kind}:${target}`, type: entity.kind, tier: entity.tier };
    }
    if (this.repoDocs.has(target)) {
      return { to: `repo-doc:${target}`, type: "repo-doc", tier: null };
    }
    return null;
  }
}

export interface DocContext {
  /** Repo-relative path for issue reporting. */
  file: string;
  /** Edge source id, e.g. "component:button". */
  from: string;
  /** Tier of the owning package — drives the labs direction rule. */
  tier: Tier;
}

export function resolveWikiLinks(
  doc: DocContext,
  links: ProseReference[],
  registry: EntityRegistry,
): { edges: GraphEdge[]; issues: ValidationIssue[] } {
  const edges: GraphEdge[] = [];
  const issues: ValidationIssue[] = [];
  for (const link of links) {
    const resolved = registry.resolve(link.value);
    if (!resolved) {
      issues.push({
        file: doc.file,
        line: link.line,
        message: `Unresolved wiki-link [[${link.value}]] — not a component, pattern, token group, or repo doc`,
      });
      continue;
    }
    // Direction rule: labs may link into stable; stable never links into labs.
    if (doc.tier === "stable" && resolved.tier === "labs") {
      issues.push({
        file: doc.file,
        line: link.line,
        message: `Stable prose links into labs: [[${link.value}]] — labs may link into stable, never the reverse`,
      });
      continue;
    }
    edges.push({ from: doc.from, to: resolved.to, type: resolved.type });
  }
  return { edges, issues };
}

/**
 * Styling props deliberately excluded from every public surface (ADR-0005:
 * styling is owned by the system) — prose legitimately names them when
 * explaining the exclusion.
 */
const STYLING_ALLOWLIST = ["className", "style"];

export function validateNameSpans(
  doc: DocContext,
  spans: ProseReference[],
  universe: Set<string>,
  ignored: Set<string>,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  for (const span of spans) {
    if (
      universe.has(span.value) ||
      ignored.has(span.value) ||
      STYLING_ALLOWLIST.includes(span.value)
    ) {
      continue;
    }
    issues.push({
      file: doc.file,
      line: span.line,
      message:
        `Unknown name \`${span.value}\` — single-identifier code spans must be a known ` +
        `component, prop, example, pattern, token group, token, or type ` +
        `(or listed in the doc's \`prose-ignore\` frontmatter)`,
    });
  }
  return issues;
}

export function checkStaleness(
  manifestPath: string,
  expected: string,
  actual: string | null,
): ValidationIssue[] {
  if (actual === null) {
    return [
      {
        file: manifestPath,
        message: "Manifest missing — run `mise run manifest` and commit the result",
      },
    ];
  }
  if (actual !== expected) {
    return [
      {
        file: manifestPath,
        message: "Manifest is stale — regenerate with `mise run manifest` and commit the result",
      },
    ];
  }
  return [];
}

/** The prose-referenceable name universe contributed by one manifest. */
export function manifestNameUniverse(manifest: Manifest): Set<string> {
  const names = new Set<string>();
  for (const component of manifest.components) {
    names.add(component.name);
    names.add(component.displayName);
    if (component.propsType) {
      names.add(component.propsType);
    }
    for (const prop of component.props) {
      names.add(prop.name);
    }
    for (const group of component.propGroups) {
      for (const prop of group.props) {
        names.add(prop);
      }
    }
    for (const example of component.examples) {
      names.add(example.name);
      for (const exportName of example.exports) {
        names.add(exportName);
      }
    }
  }
  for (const pattern of manifest.patterns) {
    names.add(pattern.name);
  }
  for (const group of manifest.tokenGroups) {
    names.add(group.name);
    for (const token of group.tokens) {
      names.add(token);
    }
  }
  return names;
}
