import { createFileRoute } from "@tanstack/react-router";
import { TextPage } from "../../features/scales/text-page.js";

export const Route = createFileRoute("/scales/text")({
  component: TextPage,
});
