/**
 * Manifest schema (v1) and stable serialization.
 *
 * The manifest is the machine-readable index of a package's public surface
 * ([[package-anatomy]]): generated, never authored, never prose. It is the
 * validation spine for authored content and the future data source for the
 * `urban` CLI, discovered through the `"urban"` marker in package.json.
 */

export const SCHEMA_VERSION = 1;

export type Tier = "stable" | "labs";

export interface PropEntry {
  name: string;
  type: string;
  optional: boolean;
  /** JSDoc description; empty string when the upstream declaration has none. */
  description: string;
  /** Declaring interface, e.g. "AriaBaseButtonProps" — provenance for tooling. */
  declaredIn: string;
}

export interface PropGroupEntry {
  /** Declaring interface collapsed as a group, e.g. "GlobalDOMEvents". */
  name: string;
  count: number;
  /** Prop names inside the collapsed group, sorted. */
  props: string[];
}

export interface ExampleEntry {
  /** File stem — the name prose refers to, e.g. "basic". */
  name: string;
  /** Published path within the package, e.g. "src/button/examples/basic.tsx". */
  path: string;
  /** Capitalized component exports rendered by the workbench. */
  exports: string[];
}

export interface ComponentEntry {
  /** Folder name under src/ — the canonical, prose-referenceable name. */
  name: string;
  /** Exported symbol, e.g. "Button". */
  displayName: string;
  /** Labs-tier components are experimental; graduation flips this to false. */
  experimental: boolean;
  /** Public subpath consumers import, e.g. "@urban-ui/react/button". */
  exportPath: string;
  /** Published path of the authored guidance doc, e.g. "src/button/button.md". */
  doc: string | null;
  /** Exported prop type name, e.g. "ButtonProps". */
  propsType: string | null;
  props: PropEntry[];
  propGroups: PropGroupEntry[];
  examples: ExampleEntry[];
}

export interface PatternEntry {
  /** File stem under patterns/, e.g. "forms". */
  name: string;
  /** Published path, e.g. "patterns/forms.md". */
  path: string;
}

export interface TokenGroupEntry {
  /** Exported defineVars binding, e.g. "colors". */
  name: string;
  /** Source path within the package, e.g. "src/tokens.stylex.ts". */
  path: string;
  /** Token keys, sorted, e.g. ["accent", "accentText", "surface", "text"]. */
  tokens: string[];
}

export interface DocEntry {
  /** File stem, e.g. "philosophy". */
  name: string;
  /** Published path, e.g. "philosophy.md". */
  path: string;
}

/** A wiki-link in authored prose, resolved to a typed target. */
export interface GraphEdge {
  /** Source entity, e.g. "component:button" or "doc:philosophy". */
  from: string;
  /** Resolved target, e.g. "component:button", "token-group:colors", "repo-doc:package-anatomy". */
  to: string;
  /** Target kind. */
  type: "component" | "pattern" | "token-group" | "repo-doc";
}

export interface Manifest {
  schemaVersion: typeof SCHEMA_VERSION;
  package: string;
  tier: Tier;
  components: ComponentEntry[];
  patterns: PatternEntry[];
  tokenGroups: TokenGroupEntry[];
  docs: DocEntry[];
  graph: GraphEdge[];
}

/**
 * Deterministic serialization — the staleness gate diffs bytes, so key order
 * and formatting must be stable across runs and machines. Callers sort all
 * arrays before assembly; JSON.stringify preserves the schema's key order.
 */
export function serializeManifest(manifest: Manifest): string {
  return `${JSON.stringify(manifest, null, 2)}\n`;
}
