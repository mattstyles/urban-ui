import { fileURLToPath } from "node:url";
import stylex from "@stylexjs/unplugin";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { stylexPluginOptions, workspaceSourceAliases } from "@urban-ui/config/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const workspaceRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig(({ command }) => ({
  // GitHub Pages serves the workbench from /<repo>/ — the deploy workflow
  // sets WORKBENCH_BASE; local dev and preview stay at "/".
  base: process.env.WORKBENCH_BASE ?? "/",
  plugins: [
    // File-based routing: generates src/routeTree.gen.ts (gitignored) from
    // src/routes/. Must come before react() so route files are transformed
    // against an up-to-date tree.
    tanstackRouter({ target: "react" }),
    stylex.vite(stylexPluginOptions({ command })),
    react(),
  ],
  resolve: {
    // Dev aliases workspace packages to their sources so edits in packages/*
    // HMR straight into the workbench without a rebuild; production builds
    // consume built dist — consumer fidelity. Rationale lives with the helper.
    alias: workspaceSourceAliases({ workspaceRoot, command }),
  },
}));
