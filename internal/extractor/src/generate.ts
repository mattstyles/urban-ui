/**
 * Orchestration: discover urban packages, extract every surface, resolve the
 * knowledge graph, validate, and (in generate mode) write manifests.
 *
 * One run covers all packages — uniqueness and the labs direction rule are
 * cross-package properties, so there is no single-package mode.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { Project } from "ts-morph";
import { type DiscoveredPackage, discoverRepoDocs, discoverUrbanPackages } from "./discover.js";
import { extractComponentFromIndex } from "./extract-props.js";
import {
  type ComponentEntry,
  type GraphEdge,
  type Manifest,
  SCHEMA_VERSION,
  serializeManifest,
} from "./manifest.js";
import { parseProse } from "./prose.js";
import { extractTokenGroups } from "./tokens.js";
import {
  checkStaleness,
  type DocContext,
  EntityRegistry,
  manifestNameUniverse,
  resolveWikiLinks,
  validateNameSpans,
  type ValidationIssue,
} from "./validate.js";

export type Mode = "generate" | "check";

export interface RunResult {
  issues: ValidationIssue[];
  /** Repo-relative manifest paths written (generate) or verified (check). */
  manifests: string[];
}

const MANIFEST_FILENAME = "urban-manifest.json";

interface AuthoredDoc {
  context: DocContext;
  /** Absolute path. */
  absolutePath: string;
  /** Extra names this doc may reference beyond the global universe. */
  localNames: Set<string>;
}

function buildManifest(
  pkg: DiscoveredPackage,
  repoRoot: string,
): { manifest: Manifest; issues: ValidationIssue[] } {
  const issues: ValidationIssue[] = [];
  const project = new Project({ tsConfigFilePath: pkg.tsconfig });

  const components: ComponentEntry[] = [];
  for (const component of pkg.components) {
    try {
      const extracted = extractComponentFromIndex(project, component.indexFile);
      components.push({
        name: component.name,
        displayName: extracted.displayName,
        experimental: pkg.tier === "labs",
        exportPath: `${pkg.name}/${component.name}`,
        doc: component.doc,
        propsType: extracted.propsType,
        props: extracted.props,
        propGroups: extracted.propGroups,
        examples: component.examples,
      });
    } catch (error) {
      issues.push({
        file: path.relative(repoRoot, component.indexFile),
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const manifest: Manifest = {
    schemaVersion: SCHEMA_VERSION,
    package: pkg.name,
    tier: pkg.tier,
    components: components.sort((a, b) => a.name.localeCompare(b.name)),
    patterns: pkg.patterns,
    tokenGroups: extractTokenGroups(project, pkg.dir, pkg.tokenSources),
    docs: pkg.docs,
    graph: [], // filled after cross-package resolution
  };
  return { manifest, issues };
}

function authoredDocsFor(
  pkg: DiscoveredPackage,
  manifest: Manifest,
  repoRoot: string,
): AuthoredDoc[] {
  const docs: AuthoredDoc[] = [];
  for (const component of manifest.components) {
    if (!component.doc) {
      continue;
    }
    const localNames = new Set<string>();
    for (const prop of component.props) {
      localNames.add(prop.name);
    }
    docs.push({
      context: {
        file: path.relative(repoRoot, path.join(pkg.dir, component.doc)),
        from: `component:${component.name}`,
        tier: pkg.tier,
      },
      absolutePath: path.join(pkg.dir, component.doc),
      localNames,
    });
  }
  for (const pattern of manifest.patterns) {
    docs.push({
      context: {
        file: path.relative(repoRoot, path.join(pkg.dir, pattern.path)),
        from: `pattern:${pattern.name}`,
        tier: pkg.tier,
      },
      absolutePath: path.join(pkg.dir, pattern.path),
      localNames: new Set(),
    });
  }
  for (const doc of manifest.docs) {
    docs.push({
      context: {
        file: path.relative(repoRoot, path.join(pkg.dir, doc.path)),
        from: `doc:${doc.name}`,
        tier: pkg.tier,
      },
      absolutePath: path.join(pkg.dir, doc.path),
      localNames: new Set(),
    });
  }
  return docs;
}

export function runExtractor(repoRoot: string, mode: Mode): RunResult {
  const issues: ValidationIssue[] = [];
  const packages = discoverUrbanPackages(repoRoot);
  if (packages.length === 0) {
    return {
      issues: [
        {
          file: "package.json",
          message: 'No packages carry the "urban" marker — nothing to extract',
        },
      ],
      manifests: [],
    };
  }

  // Pass 1: extract every package's manifest (graph still empty).
  const built = packages.map((pkg) => {
    const result = buildManifest(pkg, repoRoot);
    issues.push(...result.issues);
    return { pkg, manifest: result.manifest };
  });

  // Pass 2: global registry — uniqueness across components/patterns/token-groups.
  const registry = new EntityRegistry(discoverRepoDocs(repoRoot));
  for (const { pkg, manifest } of built) {
    const manifestFile = path.relative(repoRoot, path.join(pkg.dir, MANIFEST_FILENAME));
    for (const component of manifest.components) {
      registry.register(
        component.name,
        { pkg: pkg.name, tier: pkg.tier, kind: "component" },
        manifestFile,
      );
    }
    for (const pattern of manifest.patterns) {
      registry.register(
        pattern.name,
        { pkg: pkg.name, tier: pkg.tier, kind: "pattern" },
        manifestFile,
      );
    }
    for (const group of manifest.tokenGroups) {
      registry.register(
        group.name,
        { pkg: pkg.name, tier: pkg.tier, kind: "token-group" },
        manifestFile,
      );
    }
  }
  issues.push(...registry.issues);

  // Pass 3: prose — wiki-links become graph edges; name spans are validated.
  const globalUniverse = new Set<string>();
  for (const { manifest } of built) {
    for (const name of manifestNameUniverse(manifest)) {
      globalUniverse.add(name);
    }
  }
  for (const { pkg, manifest } of built) {
    const edges: GraphEdge[] = [];
    for (const doc of authoredDocsFor(pkg, manifest, repoRoot)) {
      const prose = parseProse(readFileSync(doc.absolutePath, "utf8"));
      const resolved = resolveWikiLinks(doc.context, prose.wikiLinks, registry);
      edges.push(...resolved.edges);
      issues.push(...resolved.issues);
      const universe = new Set([...globalUniverse, ...doc.localNames]);
      issues.push(...validateNameSpans(doc.context, prose.nameSpans, universe, prose.ignored));
    }
    manifest.graph = edges.sort((a, b) => `${a.from} ${a.to}`.localeCompare(`${b.from} ${b.to}`));
  }

  // Pass 4: write or verify.
  const manifests: string[] = [];
  for (const { pkg, manifest } of built) {
    const absolutePath = path.join(pkg.dir, MANIFEST_FILENAME);
    const relativePath = path.relative(repoRoot, absolutePath);
    const serialized = serializeManifest(manifest);
    if (mode === "generate") {
      writeFileSync(absolutePath, serialized);
    } else {
      const actual = existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : null;
      issues.push(...checkStaleness(relativePath, serialized, actual));
    }
    manifests.push(relativePath);
  }

  return { issues, manifests };
}
