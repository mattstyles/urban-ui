import * as stylex from "@stylexjs/stylex";
import { accent, neutral, surface } from "@urban-ui/theme/color.stylex";
import { gap, inset, size } from "@urban-ui/theme/space.stylex";
import { fontSize } from "@urban-ui/theme/text.stylex";
import { Section } from "./color-sections.js";

/**
 * Specimens for the space domain: the shared size ramp, and the gap/inset
 * trios keyed to the layer model. Bars and boxes are sized directly by the
 * tokens, so a density re-pitch re-draws this page.
 */

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: gap.container,
  },
  row: {
    alignItems: "center",
    display: "flex",
    gap: gap.container,
  },
  meta: {
    color: neutral.inkTertiary,
    fontFamily: "monospace",
    fontSize: fontSize.xs,
    minWidth: "11rem",
  },
  bar: (width: string) => ({
    backgroundColor: accent.fill,
    height: "0.75rem",
    width,
  }),
  pair: (separation: string) => ({
    display: "flex",
    gap: separation,
  }),
  block: {
    backgroundColor: neutral.fill,
    height: "1.5rem",
    width: "3rem",
  },
  insetBox: (padding: string) => ({
    backgroundColor: surface.raised,
    display: "inline-block",
    padding,
  }),
  insetContent: {
    backgroundColor: neutral.subtle,
    color: neutral.ink,
    paddingBlock: size.xs,
    paddingInline: size.sm,
  },
});

const STEPS = ["xs", "sm", "md", "lg", "xl"] as const;
const LEVELS = ["plane", "container", "control"] as const;

export function SpaceSection() {
  return (
    <Section
      title="space"
      description="gap (between siblings) and inset (content → edge) as layer-keyed trios over the shared size ramp. Margins do not exist (no-margin); every value is tuned to the trimmed rendering."
    >
      <div {...stylex.props(styles.list)}>
        {STEPS.map((step) => (
          <div key={step} {...stylex.props(styles.row)}>
            <span {...stylex.props(styles.meta)}>size.{step}</span>
            <span {...stylex.props(styles.bar(size[step]))} />
          </div>
        ))}
        {LEVELS.map((level) => (
          <div key={`gap-${level}`} {...stylex.props(styles.row)}>
            <span {...stylex.props(styles.meta)}>gap.{level}</span>
            <span {...stylex.props(styles.pair(gap[level]))}>
              <span {...stylex.props(styles.block)} />
              <span {...stylex.props(styles.block)} />
            </span>
          </div>
        ))}
        {LEVELS.map((level) => (
          <div key={`inset-${level}`} {...stylex.props(styles.row)}>
            <span {...stylex.props(styles.meta)}>inset.{level}</span>
            <span {...stylex.props(styles.insetBox(inset[level]))}>
              <span {...stylex.props(styles.insetContent)}>content</span>
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
