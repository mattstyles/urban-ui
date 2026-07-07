import path from "node:path";
import { fileURLToPath } from "node:url";
import stylex from "@stylexjs/unplugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const workspaceRoot = fileURLToPath(new URL("../..", import.meta.url));
const pkg = (...segments: string[]) => path.join(workspaceRoot, "packages", ...segments);

export default defineConfig(({ command }) => ({
  plugins: [
    // Before the react plugin to preserve Fast Refresh. The unplugin
    // auto-discovers StyleX packages in node_modules (@urban-ui/theme,
    // @urban-ui/react) — the consumer-compiles contract of ADR-0005.
    stylex.vite({
      useCSSLayers: true,
      // Readable debug class names while developing.
      dev: command === "serve",
      devMode: "full",
    }),
    react(),
  ],
  resolve: {
    // Dev aliases workspace packages to their sources so a failing scene can
    // be debugged with HMR; production builds — what VRT screenshots — consume
    // built dist for consumer fidelity. Deliberately NOT a global `source`
    // resolve condition: third-party packages (react-aria-components) declare
    // `source` conditions pointing at files absent from their published
    // tarballs, which breaks resolution outright.
    alias:
      command === "serve"
        ? [
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
          ]
        : [],
  },
}));
