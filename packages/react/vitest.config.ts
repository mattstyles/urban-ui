import stylex from "@stylexjs/unplugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    // Components call stylex.create/props at module scope — the compile must
    // run before jsdom executes them or the StyleX runtime throws.
    stylex.vite(),
  ],
  test: {
    environment: "jsdom",
    // Globals so @testing-library/react auto-cleans between tests; test files
    // still import describe/expect/it explicitly.
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    server: {
      deps: {
        // stylex#1399: token imports resolve to built dist inside
        // node_modules; inline @urban-ui packages so the StyleX transform
        // sees their defineVars calls instead of externalizing them.
        inline: [/@urban-ui\//],
      },
    },
  },
});
