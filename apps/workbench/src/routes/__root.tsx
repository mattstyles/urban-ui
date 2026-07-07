import * as stylex from "@stylexjs/stylex";
import { createRootRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { colors } from "@urban-ui/theme/tokens.stylex";
import { AppShell } from "../ui/app-shell.js";

const styles = stylex.create({
  link: {
    color: colors.accent,
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
