import { fileURLToPath } from "node:url";
import stylex from "@stylexjs/unplugin";
import { stylexPluginOptions, workspaceSourceAliases } from "@urban-ui/config/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const workspaceRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig(({ command }) => ({
  plugins: [stylex.vite(stylexPluginOptions(command)), react()],
  resolve: {
    // Dev aliases workspace packages to their sources so a failing scene can
    // be debugged with HMR; production builds — what VRT screenshots — consume
    // built dist for consumer fidelity. Rationale lives with the helper.
    alias: workspaceSourceAliases(workspaceRoot, command),
  },
}));
