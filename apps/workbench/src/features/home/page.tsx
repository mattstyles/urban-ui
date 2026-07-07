import * as stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";
import { colors, radii, space } from "@urban-ui/theme/tokens.stylex";
import { Page } from "../../ui/page.js";

const sections = [
  {
    to: "/primitives",
    label: "Primitives",
    summary: "Individual component demos — Button and friends, used as a real consumer would.",
  },
  {
    to: "/scales",
    label: "Scales",
    summary: "Theme scale groups — colour, space, radii. Shape to be defined.",
  },
  {
    to: "/playground",
    label: "Playground",
    summary: "Ad-hoc experiments and compositions, one page per experiment.",
  },
  {
    to: "/labs",
    label: "Labs",
    summary: "Structured experiments with knobs for tweaking values live.",
  },
] as const;

const styles = stylex.create({
  grid: {
    display: "grid",
    gap: space.md,
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  },
  card: {
    borderColor: colors.accent,
    borderRadius: radii.control,
    borderStyle: "solid",
    borderWidth: "1px",
    color: colors.text,
    display: "flex",
    flexDirection: "column",
    gap: space.sm,
    padding: space.md,
    textDecoration: "none",
  },
  cardTitle: {
    color: colors.accent,
    fontWeight: 600,
  },
  cardSummary: {
    margin: 0,
  },
});

export function HomePage() {
  return (
    <Page
      title="Urban UI workbench"
      description="Dev playground for Urban UI — every page here consumes the packages like a real app."
    >
      <div {...stylex.props(styles.grid)}>
        {sections.map((section) => (
          <Link key={section.to} to={section.to} {...stylex.props(styles.card)}>
            <span {...stylex.props(styles.cardTitle)}>{section.label}</span>
            <p {...stylex.props(styles.cardSummary)}>{section.summary}</p>
          </Link>
        ))}
      </div>
    </Page>
  );
}
