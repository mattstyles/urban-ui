import { createFileRoute } from "@tanstack/react-router";
import { SpacePage } from "../../features/scales/space-page.js";

export const Route = createFileRoute("/scales/space")({
  component: SpacePage,
});
