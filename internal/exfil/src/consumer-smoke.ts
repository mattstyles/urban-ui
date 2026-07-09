/**
 * Consumer-compiles smoke test: install the packed @urban-ui/theme +
 * @urban-ui/react tarballs into a scratch Vite consumer with the one-line
 * unplugin config, build, and assert token-derived CSS reached the output.
 * This is the ADR-0005 contract verified from the exact artifact a consumer
 * would receive — no npm publish involved.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { packAndVerify } from "./publish.js";

const LABEL_PROBE = "Consumer smoke";

/** Where the probe token is declared — Button consumes the UI text ramp. */
const THEME_TOKENS_PATH = path.join("packages", "theme", "src", "text.stylex.ts");

function run(cwd: string, command: string, args: string[]): string {
  return execFileSync(command, args, { cwd, encoding: "utf8" });
}

/**
 * Extract the lineHeight.sm literal from the theme source, so the smoke
 * probe tracks theme changes instead of duplicating the value. lineHeight
 * values are chosen as the probe because they survive CSS minification
 * verbatim (no leading zero for lightningcss to strip, no colour-space
 * downlevelling as with oklch literals).
 */
export function extractTokenProbe(source: string): string | undefined {
  return source.match(/export const lineHeight[^}]*?\bsm:\s*"([^"]+)"/s)?.[1];
}

/** Read a devDependency version from a workspace package.json. */
export function devDependencyVersion(
  repoRoot: string,
  workspace: string,
  name: string,
): string | undefined {
  const pkg = JSON.parse(readFileSync(path.join(repoRoot, workspace, "package.json"), "utf8")) as {
    devDependencies?: Record<string, string>;
  };
  return pkg.devDependencies?.[name];
}

function catalogVersions(repoRoot: string): Record<string, string> {
  const rootPackage = JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8")) as {
    workspaces?: { catalog?: Record<string, string> };
  };
  return rootPackage.workspaces?.catalog ?? {};
}

export function consumerSmoke(repoRoot: string): { dir: string; issues: string[] } {
  const issues: string[] = [];

  const tokenProbe = extractTokenProbe(
    readFileSync(path.join(repoRoot, THEME_TOKENS_PATH), "utf8"),
  );
  if (tokenProbe === undefined) {
    issues.push(
      `Could not derive the token probe from ${THEME_TOKENS_PATH} — no \`lineHeight … sm: "…"\` literal found in the theme source`,
    );
  }

  const unpluginVersion = devDependencyVersion(
    repoRoot,
    path.join("packages", "react"),
    "@stylexjs/unplugin",
  );
  if (unpluginVersion === undefined) {
    issues.push(
      "Could not derive the @stylexjs/unplugin version from packages/react devDependencies",
    );
  }
  const pluginReactVersion = devDependencyVersion(
    repoRoot,
    path.join("apps", "workbench"),
    "@vitejs/plugin-react",
  );
  if (pluginReactVersion === undefined) {
    issues.push(
      "Could not derive the @vitejs/plugin-react version from apps/workbench devDependencies",
    );
  }
  const viteVersion = devDependencyVersion(repoRoot, path.join("apps", "workbench"), "vite");
  if (viteVersion === undefined) {
    issues.push("Could not derive the vite version from apps/workbench devDependencies");
  }
  if (
    tokenProbe === undefined ||
    unpluginVersion === undefined ||
    pluginReactVersion === undefined ||
    viteVersion === undefined
  ) {
    return { dir: "", issues };
  }

  const theme = packAndVerify(path.join(repoRoot, "packages", "theme"));
  const react = packAndVerify(path.join(repoRoot, "packages", "react"));
  issues.push(...theme.issues, ...react.issues);

  const catalog = catalogVersions(repoRoot);
  const dir = mkdtempSync(path.join(tmpdir(), "urban-consumer-"));
  mkdirSync(path.join(dir, "src"));

  writeFileSync(
    path.join(dir, "package.json"),
    `${JSON.stringify(
      {
        name: "urban-consumer-smoke",
        private: true,
        type: "module",
        dependencies: {
          "@stylexjs/stylex": catalog["@stylexjs/stylex"] ?? "^0.19.0",
          "@urban-ui/react": `file:${react.tarball}`,
          "@urban-ui/theme": `file:${theme.tarball}`,
          react: catalog["react"] ?? "^19.0.0",
          "react-dom": catalog["react-dom"] ?? "^19.0.0",
          "react-aria-components": catalog["react-aria-components"] ?? "^1.19.0",
        },
        devDependencies: {
          "@stylexjs/unplugin": unpluginVersion,
          "@vitejs/plugin-react": pluginReactVersion,
          vite: viteVersion,
        },
      },
      null,
      2,
    )}\n`,
  );

  writeFileSync(
    path.join(dir, "vite.config.ts"),
    [
      `import stylex from "@stylexjs/unplugin";`,
      `import react from "@vitejs/plugin-react";`,
      `import { defineConfig } from "vite";`,
      ``,
      `// The one-line consumer config from the README-to-be.`,
      `export default defineConfig({ plugins: [stylex.vite({ useCSSLayers: true }), react()] });`,
      ``,
    ].join("\n"),
  );

  writeFileSync(
    path.join(dir, "index.html"),
    `<!doctype html>\n<html lang="en"><head><meta charset="utf-8" /><title>consumer</title></head>\n<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n`,
  );

  writeFileSync(
    path.join(dir, "src", "main.tsx"),
    [
      `import { Button } from "@urban-ui/react/button";`,
      `import { createRoot } from "react-dom/client";`,
      ``,
      `createRoot(document.getElementById("root")!).render(<Button>${LABEL_PROBE}</Button>);`,
      ``,
    ].join("\n"),
  );

  run(dir, "bun", ["install"]);
  run(dir, "bun", ["x", "vite", "build"]);

  const assets = path.join(dir, "dist", "assets");
  const files = readdirSync(assets);
  const css = files
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(path.join(assets, file), "utf8"))
    .join("\n");
  const js = files
    .filter((file) => file.endsWith(".js"))
    .map((file) => readFileSync(path.join(assets, file), "utf8"))
    .join("\n");

  if (!css.includes(tokenProbe)) {
    issues.push(
      `Compiled consumer CSS lacks the theme token value ${tokenProbe} (derived from ${THEME_TOKENS_PATH}) — cross-package StyleX compilation failed`,
    );
  }
  if (!js.includes(LABEL_PROBE)) {
    issues.push(`Consumer bundle lacks the rendered Button label "${LABEL_PROBE}"`);
  }
  return { dir, issues };
}
