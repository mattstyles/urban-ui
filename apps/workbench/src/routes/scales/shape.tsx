import { createFileRoute } from "@tanstack/react-router";
import { ShapePage } from "../../features/scales/shape-page.js";

export const Route = createFileRoute("/scales/shape")({
  component: ShapePage,
});
