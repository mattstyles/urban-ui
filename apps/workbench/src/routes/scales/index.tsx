import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scales/")({
  beforeLoad: () => {
    throw redirect({ to: "/scales/colour" });
  },
});
