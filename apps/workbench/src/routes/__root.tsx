import * as stylex from "@stylexjs/stylex";
import { createRootRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { neutral } from "@urban-ui/theme/color.stylex";
import { AppShell } from "../ui/app-shell.js";

const styles = stylex.create({
  link: {
    color: neutral.ink,
    textDecorationLine: "underline",
  },
});

function RootLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

function NotFound() {
  const { pathname } = useLocation();
  return (
    <>
      <h1>No page at {pathname}</h1>
      <Link to="/" {...stylex.props(styles.link)}>
        Back to home
      </Link>
    </>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
