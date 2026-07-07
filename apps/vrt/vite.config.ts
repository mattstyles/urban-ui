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
      // Dev serves package *sources* (aliases below), so the StyleX compiler
      // must resolve token imports to the same source files — it has its own
      // resolver that would otherwise walk package exports to dist.
      ...(command === "serve" && {
        aliases: {
          "@urban-ui/theme/tokens.stylex": [pkg("theme", "src", "tokens.stylex.ts")],
        },
      }),
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
              find: /^@urban-ui\/theme\/(.+)$/,
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
