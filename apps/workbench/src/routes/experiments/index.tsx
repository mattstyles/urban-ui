import { createFileRoute } from "@tanstack/react-router";
import { ExperimentsPage } from "../../features/experiments/page.js";

export const Route = createFileRoute("/experiments/")({
  component: ExperimentsPage,
});
