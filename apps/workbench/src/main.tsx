import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen.js";
import "./index.css";

// Browser history; deep-link refreshes on GitHub Pages are covered by the
// 404.html fallback the deploy workflow ships. basepath tracks Vite's base —
// "/" locally, "/<repo>/" on Pages (WORKBENCH_BASE).
const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = document.getElementById("root");
if (!root) {
  throw new Error("Workbench root element missing");
}

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
