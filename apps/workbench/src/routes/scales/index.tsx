import { createFileRoute } from "@tanstack/react-router";
import { ScalesPage } from "../../features/scales/page.js";

export const Route = createFileRoute("/scales/")({
  component: ScalesPage,
});
