import { createFileRoute } from "@tanstack/react-router";
import { ButtonPage } from "../../features/primitives/button/page.js";

export const Route = createFileRoute("/primitives/button")({
  component: ButtonPage,
});
