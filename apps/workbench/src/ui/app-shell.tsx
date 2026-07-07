import * as stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";
import { colors, space } from "@urban-ui/theme/tokens.stylex";
import type { ReactNode } from "react";

const sections = [
  { to: "/primitives", label: "Primitives" },
  { to: "/scales", label: "Scales" },
  { to: "/playground", label: "Playground" },
  { to: "/labs", label: "Labs" },
] as const;

const styles = stylex.create({
  shell: {
    backgroundColor: colors.surface,
    color: colors.text,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    alignItems: "baseline",
    display: "flex",
    gap: space.lg,
    paddingBlock: space.md,
    paddingInline: space.lg,
  },
  title: {
    color: colors.text,
    fontWeight: 600,
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    gap: space.md,
  },
  link: {
    color: colors.accent,
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
  },
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingBlock: space.md,
    paddingInline: space.lg,
  },
});

/**
 * App chrome: header with top-level section navigation, wrapping the routed
 * page content.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div {...stylex.props(styles.shell)}>
      <header {...stylex.props(styles.header)}>
        <Link to="/" {...stylex.props(styles.title)}>
          Urban UI workbench
        </Link>
        <nav {...stylex.props(styles.nav)}>
          {sections.map((section) => (
            <Link key={section.to} to={section.to} {...stylex.props(styles.link)}>
              {section.label}
            </Link>
          ))}
        </nav>
      </header>
      <main {...stylex.props(styles.main)}>{children}</main>
    </div>
  );
}
