import * as stylex from "@stylexjs/stylex";
import { Link, useLocation } from "@tanstack/react-router";
import { accent, neutral } from "@urban-ui/theme/color.stylex";
import { gap, inset, size } from "@urban-ui/theme/space.stylex";
import { fontSize, headingVoice, lineHeight, textVoice } from "@urban-ui/theme/text.stylex";
import type { ReactNode } from "react";

/**
 * The scales page's own layout: a centred frame with the page header across
 * the top and a sticky rail of concerns beside the inventory. Page layouts
 * are per-page decisions — this one belongs to scales, not the shell.
 */

// One concern per theme-contract domain, so the navigation reads as the
// contract's table of contents rather than an arbitrary content split.
const concerns = [
  { to: "/scales/colour", label: "Colour" },
  { to: "/scales/text", label: "Text" },
  { to: "/scales/space", label: "Space" },
  { to: "/scales/shape", label: "Shape" },
] as const;

// Layout widths are workbench decisions, not tokens — the shared sizing
// vocabulary (content widths, control sizes) is a pending design pass
// (urban-ui-6yb); these get re-expressed against it when it lands.
const FRAME_MAX_WIDTH = 1180;
const RAIL_WIDTH = 160;

const styles = stylex.create({
  frame: {
    display: "flex",
    flexDirection: "column",
    gap: gap.container,
    marginInline: "auto",
    maxWidth: FRAME_MAX_WIDTH,
    width: "100%",
  },
  // A header sits tighter to its content than peers sit to each other
  // (header-proximity): sm sits below the frame's container gap.
  header: {
    display: "flex",
    flexDirection: "column",
    gap: size.sm,
  },
  title: {
    fontFamily: headingVoice.family,
    fontSize: fontSize.xl,
    fontWeight: headingVoice.weight,
    letterSpacing: headingVoice.tracking,
    lineHeight: lineHeight.xl,
  },
  description: {
    color: neutral.inkSecondary,
    fontFamily: textVoice.family,
    fontSize: fontSize.md,
    fontWeight: textVoice.weight,
    letterSpacing: textVoice.tracking,
    lineHeight: lineHeight.md,
  },
  body: {
    alignItems: "start",
    display: "grid",
    gap: gap.plane,
    gridTemplateColumns: `${RAIL_WIDTH}px minmax(0, 1fr)`,
  },
  rail: {
    display: "flex",
    flexDirection: "column",
    gap: size.xs,
    position: "sticky",
    top: inset.container,
  },
  railLabel: {
    color: neutral.inkTertiary,
    fontFamily: "monospace",
    fontSize: fontSize.xs,
    letterSpacing: "0.08em",
    paddingBlockEnd: size.xs,
    textTransform: "uppercase",
  },
  // Edge grammar on the active item: line advances (edge band), so the
  // current concern carries an advancing edge; the rest hold the border's
  // receded rail.
  railLink: {
    borderInlineStartColor: {
      default: neutral.border,
      ":hover": neutral.line,
    },
    borderInlineStartStyle: "solid",
    borderInlineStartWidth: "2px",
    color: {
      default: neutral.inkSecondary,
      ":hover": neutral.ink,
    },
    paddingBlock: size.xs,
    paddingInlineStart: size.md,
    textDecoration: "none",
  },
  railLinkActive: {
    borderInlineStartColor: accent.line,
    color: accent.ink,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
});

export function ScalesLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div {...stylex.props(styles.frame)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>Scales</h1>
        <p {...stylex.props(styles.description)}>
          The theme contract's token groups, inventoried live: every member reads its value off the
          DOM, and every legibility pairing is annotated against the AA floor.
        </p>
      </header>
      <div {...stylex.props(styles.body)}>
        <nav {...stylex.props(styles.rail)}>
          <span {...stylex.props(styles.railLabel)}>domains</span>
          {concerns.map((concern) => (
            <Link
              key={concern.to}
              to={concern.to}
              {...stylex.props(
                styles.railLink,
                pathname.startsWith(concern.to) && styles.railLinkActive,
              )}
            >
              {concern.label}
            </Link>
          ))}
        </nav>
        <div {...stylex.props(styles.content)}>{children}</div>
      </div>
    </div>
  );
}
