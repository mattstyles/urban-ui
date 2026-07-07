/**
 * Shared Vite configuration for applications consuming the @urban-ui packages.
 *
 * This module encodes what a consumer app must configure — the StyleX
 * compilation step and, for in-repo apps, dev-time source aliases — so the
 * workspace apps (workbench, VRT) stay in lockstep. It is the seed of the
 * eventual "getting started" documentation.
 *
 * Deliberately dependency-free and structurally typed: consumers own their
 * own `vite` and `@stylexjs/unplugin` installs and spread these plain
 * objects/arrays into their own `defineConfig`.
 */

/**
 * Options for the StyleX compiler — pass to `stylex.vite(...)` from
 * `@stylexjs/unplugin`, registered *before* `react()` to preserve Fast
 * Refresh. The unplugin auto-discovers StyleX packages in node_modules
 * (@urban-ui/theme, @urban-ui/react) — the consumer-compiles contract of
 * ADR-0005.
 */
export function stylexPluginOptions(command: "build" | "serve") {
  return {
    useCSSLayers: true,
    // Readable debug class names while developing.
    dev: command === "serve",
    devMode: "full",
  } as const;
}

/**
 * Serve-only aliases pointing @urban-ui package specifiers at their workspace
 * sources — for `resolve.alias` in the in-repo apps.
 *
 * Dev aliases the packages to source so edits in packages/* HMR straight into
 * the app without a rebuild; production builds get no aliases and resolve the
 * built dist through package exports — consumer fidelity. Deliberately NOT a
 * global `source` resolve condition: third-party packages
 * (react-aria-components) declare `source` conditions pointing at files absent
 * from their published tarballs, which breaks resolution outright.
 *
 * @param workspaceRoot Absolute path to the repository root. Compute it at
 *   the call site — `fileURLToPath(new URL("../..", import.meta.url))` — Vite
 *   bundles config files and rewrites `import.meta.url` to the config file's
 *   own path, so it cannot be derived reliably in here.
 */
export function workspaceSourceAliases(workspaceRoot: string, command: "build" | "serve") {
  if (command !== "serve") {
    return [];
  }
  // Plain string joins keep this module free of node builtins (and therefore
  // of @types/node); Vite accepts forward-slash paths on every platform.
  const packagesDir = `${workspaceRoot.replace(/[/\\]+$/, "")}/packages`;
  const pkg = (...segments: string[]) => [packagesDir, ...segments].join("/");
  return [
    {
      find: /^@urban-ui\/theme$/,
      replacement: pkg("theme", "src", "index.ts"),
    },
    {
      // tokens.stylex is deliberately NOT aliased: StyleX hashes var
      // names from the defining module's identity, and the compiler
      // resolves token imports in *other* files through package
      // exports to dist. Serving the source tokens module would
      // define source-hashed vars that no compiled rule references —
      // classes apply but every var() is undefined (unstyled page).
      find: /^@urban-ui\/theme\/(?!tokens\.stylex$)(.+)$/,
      replacement: pkg("theme", "src", "$1.ts"),
    },
    {
      find: /^@urban-ui\/react$/,
      replacement: pkg("react", "src", "index.ts"),
    },
    {
      find: /^@urban-ui\/react\/(.+)$/,
      replacement: pkg("react", "src", "$1", "index.ts"),
    },
    {
      find: /^@urban-ui\/labs$/,
      replacement: pkg("labs", "src", "index.ts"),
    },
    {
      find: /^@urban-ui\/labs\/(.+)$/,
      replacement: pkg("labs", "src", "$1", "index.ts"),
    },
  ];
}
