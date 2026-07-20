import * as stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";
import { accent, neutral } from "@urban-ui/theme/color.stylex";
import { gap, size } from "@urban-ui/theme/space.stylex";
import { fontSize, textVoice } from "@urban-ui/theme/text.stylex";
import { Page } from "../../ui/page.js";

const experiments = [
  {
    to: "/experiments/spacing-1",
    title: "Spacing-1 — positional descent",
    blurb:
      "A working prototype of the descent-ladder spacing mechanic (option A), pushed through the pressure cases: deep nesting, edges, density, reuse.",
  },
] as const;

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: gap.container,
  },
  entry: {
    display: "flex",
    flexDirection: "column",
    gap: size.xs,
  },
  link: {
    color: accent.ink,
    fontSize: fontSize.md,
    textDecorationLine: {
      default: "none",
      ":hover": "underline",
    },
  },
  blurb: {
    color: neutral.inkSecondary,
    fontFamily: textVoice.family,
    fontSize: fontSize.sm,
    fontWeight: textVoice.weight,
    letterSpacing: textVoice.tracking,
  },
});

export function ExperimentsPage() {
  return (
    <Page
      title="Experiments"
      description="Freeform explorations — unbound from the system's spacing tokens and components (colour excepted). Pressure tests that inform the system before anything hardens."
    >
      <div {...stylex.props(styles.list)}>
        {experiments.map((experiment) => (
          <div key={experiment.to} {...stylex.props(styles.entry)}>
            <Link to={experiment.to} {...stylex.props(styles.link)}>
              {experiment.title}
            </Link>
            <span {...stylex.props(styles.blurb)}>{experiment.blurb}</span>
          </div>
        ))}
      </div>
    </Page>
  );
}
