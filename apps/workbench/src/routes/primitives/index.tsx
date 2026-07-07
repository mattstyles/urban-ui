import { createFileRoute } from "@tanstack/react-router";
import { PrimitivesPage } from "../../features/primitives/page.js";

export const Route = createFileRoute("/primitives/")({
  component: PrimitivesPage,
});
