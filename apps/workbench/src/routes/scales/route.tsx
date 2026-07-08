import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ScalesLayout } from "../../features/scales/layout.js";

export const Route = createFileRoute("/scales")({
  component: () => (
    <ScalesLayout>
      <Outlet />
    </ScalesLayout>
  ),
});
