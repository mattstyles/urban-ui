/**
 * Token-group extraction: exported `stylex.defineVars` bindings in
 * `*.stylex.ts` sources become manifest token groups with their keys.
 */

import path from "node:path";
import { Node, type Project } from "ts-morph";
import type { TokenGroupEntry } from "./manifest.js";

export function extractTokenGroups(
  project: Project,
  pkgDir: string,
  tokenSourcePaths: string[],
): TokenGroupEntry[] {
  const groups: TokenGroupEntry[] = [];
  for (const sourcePath of tokenSourcePaths) {
    const sourceFile = project.getSourceFileOrThrow(sourcePath);
    for (const variable of sourceFile.getVariableDeclarations()) {
      if (!variable.isExported()) {
        continue;
      }
      const initializer = variable.getInitializer();
      if (
        !initializer ||
        !Node.isCallExpression(initializer) ||
        !initializer.getExpression().getText().endsWith("defineVars")
      ) {
        continue;
      }
      const argument = initializer.getArguments()[0];
      if (!argument || !Node.isObjectLiteralExpression(argument)) {
        continue;
      }
      const tokens = argument
        .getProperties()
        .filter(Node.isPropertyAssignment)
        .map((property) => property.getName())
        .sort((a, b) => a.localeCompare(b));
      groups.push({
        name: variable.getName(),
        path: path.relative(pkgDir, sourcePath),
        tokens,
      });
    }
  }
  return groups.sort((a, b) => a.name.localeCompare(b.name));
}
