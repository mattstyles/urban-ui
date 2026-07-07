import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../features/home/page.js";

export const Route = createFileRoute("/")({
  component: HomePage,
});
