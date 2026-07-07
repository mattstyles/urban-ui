import { createFileRoute } from "@tanstack/react-router";
import { LabsPage } from "../../features/labs/page.js";

export const Route = createFileRoute("/labs/")({
  component: LabsPage,
});
