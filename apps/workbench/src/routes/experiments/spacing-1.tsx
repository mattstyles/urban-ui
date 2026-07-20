import { createFileRoute } from "@tanstack/react-router";
import { SpacingOneExperiment } from "../../features/experiments/spacing-1/page.js";

export const Route = createFileRoute("/experiments/spacing-1")({
  component: SpacingOneExperiment,
});
