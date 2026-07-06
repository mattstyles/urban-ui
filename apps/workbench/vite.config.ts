import stylex from "@stylexjs/unplugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    // Before the react plugin to preserve Fast Refresh. The unplugin
    // auto-discovers StyleX packages in node_modules (@urban-ui/theme,
    // @urban-ui/react) — the consumer-compiles contract of ADR-0005.
    stylex.vite({
      useCSSLayers: true,
    }),
    react(),
  ],
});
