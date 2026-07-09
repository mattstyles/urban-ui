import { createFileRoute } from "@tanstack/react-router";
import { ColourPage } from "../../features/scales/colour-page.js";

export const Route = createFileRoute("/scales/colour")({
  component: ColourPage,
});
