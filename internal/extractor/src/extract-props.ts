/**
 * Prop-surface extraction through the TypeScript checker (ts-morph riding the
 * TS 6.x API — the [[0006-component-quality-stack]] decision; migrate to the
 * TS 7 programmatic API when it stabilises, tracked in watch-items).
 *
 * The checker fully expands wrapped react-aria surfaces (intersections,
 * `Omit`) — the shape that kills react-docgen and react-docgen-typescript.
 * Pass-through DOM interfaces are collapsed into named groups; everything
 * else is enumerated with its resolved type text and upstream JSDoc.
 */

import { Node, type Project, SymbolFlags, ts, type Type } from "ts-morph";
import type { PropEntry, PropGroupEntry } from "./manifest.js";

/**
 * Declaring interfaces collapsed into prop groups instead of enumerated:
 * the undocumented pass-through DOM surface (63 event handlers + global
 * attributes) that would drown the interesting props in every manifest.
 */
const COLLAPSED_INTERFACES = new Set(["GlobalDOMEvents", "GlobalDOMAttributes"]);

export interface ExtractedComponent {
  displayName: string;
  propsType: string | null;
  props: PropEntry[];
  propGroups: PropGroupEntry[];
}

interface ResolvedComponentDeclaration {
  paramType: Type;
  location: Node;
  propsType: string | null;
}

function resolveComponentDeclaration(decl: Node): ResolvedComponentDeclaration | null {
  // Shape dispatch: plain function declarations and const-arrow components.
  // Anything else (forwardRef, memo) needs explicit support here — fail
  // loudly at the call site rather than guessing.
  if (Node.isFunctionDeclaration(decl)) {
    const param = decl.getParameters()[0];
    if (!param) {
      return null;
    }
    return {
      paramType: param.getType(),
      location: param,
      propsType: param.getTypeNode()?.getText() ?? null,
    };
  }
  if (Node.isVariableDeclaration(decl)) {
    const initializer = decl.getInitializer();
    if (initializer && Node.isArrowFunction(initializer)) {
      const param = initializer.getParameters()[0];
      if (!param) {
        return null;
      }
      return {
        paramType: param.getType(),
        location: param,
        propsType: param.getTypeNode()?.getText() ?? null,
      };
    }
  }
  return null;
}

/**
 * Extract the component exported from a component folder's index.ts: the
 * first capitalized export with a component shape. The folder anatomy is one
 * component per folder, so multiple component-shaped exports are an error.
 */
export function extractComponentFromIndex(
  project: Project,
  indexFilePath: string,
): ExtractedComponent {
  const indexFile = project.getSourceFileOrThrow(indexFilePath);
  const candidates: { displayName: string; resolved: ResolvedComponentDeclaration }[] = [];
  for (const [exportName, declarations] of indexFile.getExportedDeclarations()) {
    if (!/^[A-Z]/.test(exportName)) {
      continue;
    }
    const decl = declarations[0];
    const resolved = decl ? resolveComponentDeclaration(decl) : null;
    if (resolved) {
      candidates.push({ displayName: exportName, resolved });
    }
  }
  if (candidates.length === 0) {
    throw new Error(
      `No component-shaped export reachable from ${indexFilePath} — ` +
        `extract-props.ts supports function declarations and const-arrow components`,
    );
  }
  if (candidates.length > 1) {
    throw new Error(
      `Multiple component-shaped exports in ${indexFilePath} ` +
        `(${candidates.map((c) => c.displayName).join(", ")}) — one component per folder`,
    );
  }
  const candidate = candidates[0];
  if (!candidate) {
    throw new Error(`unreachable: candidates[0] missing for ${indexFilePath}`);
  }
  const { displayName, resolved } = candidate;

  const checker = project.getTypeChecker();
  const rawChecker = checker.compilerObject;
  const props: PropEntry[] = [];
  const groups = new Map<string, string[]>();

  for (const symbol of resolved.paramType.getProperties()) {
    const name = symbol.getName();
    const parent = symbol.getDeclarations()[0]?.getParent();
    const declaredIn =
      parent && (Node.isInterfaceDeclaration(parent) || Node.isTypeAliasDeclaration(parent))
        ? (parent.getName() ?? "<anonymous>")
        : (parent?.getKindName() ?? "<unknown>");

    if (COLLAPSED_INTERFACES.has(declaredIn)) {
      const group = groups.get(declaredIn) ?? [];
      group.push(name);
      groups.set(declaredIn, group);
      continue;
    }

    const propType = checker.getTypeOfSymbolAtLocation(symbol, resolved.location);
    const typeText = propType.getText(
      resolved.location,
      ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | ts.TypeFormatFlags.NoTruncation,
    );
    if (propType.isAny() || typeText === "error") {
      throw new Error(
        `Prop "${name}" on "${displayName}" resolved to ${typeText} — extraction is degrading, ` +
          `fix the extractor rather than committing a lossy manifest`,
      );
    }
    props.push({
      name,
      type: typeText,
      optional: (symbol.getFlags() & SymbolFlags.Optional) !== 0,
      description: ts
        .displayPartsToString(symbol.compilerSymbol.getDocumentationComment(rawChecker))
        .trim(),
      declaredIn,
    });
  }

  props.sort((a, b) => a.name.localeCompare(b.name));
  const propGroups: PropGroupEntry[] = [...groups.entries()]
    .map(([name, members]) => ({
      name,
      count: members.length,
      props: members.sort((a, b) => a.localeCompare(b)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { displayName, propsType: resolved.propsType, props, propGroups };
}
