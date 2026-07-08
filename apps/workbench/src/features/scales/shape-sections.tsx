import * as stylex from "@stylexjs/stylex";
import { accent, neutral, surface } from "@urban-ui/theme/color.stylex";
import { depth } from "@urban-ui/theme/shape.stylex";
import { gap } from "@urban-ui/theme/space.stylex";
import { fontSize } from "@urban-ui/theme/text.stylex";
import { Section } from "./color-sections.js";
import { useTokenValues } from "./use-token-values.js";

/**
 * Depth-ramp specimen: straight-profile chamfers rendered at every step on
 * control- and panel-sized boxes. The clip-path rendering here is app-side
 * illustration only — the shipped shape mechanism (generator, stroke, halo)
 * is component work, not tokens. Cuts stay inside the box
 * (silhouette-bounding-box) and every box comfortably exceeds its cut size
 * (cut-min-size).
 */

function chamferAllCorners(cut: string): string {
  return [
    `polygon(${cut} 0, calc(100% - ${cut}) 0, 100% ${cut},`,
    `100% calc(100% - ${cut}), calc(100% - ${cut}) 100%,`,
    `${cut} 100%, 0 calc(100% - ${cut}), 0 ${cut})`,
  ].join(" ");
}

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
  value: {
    color: neutral.inkTertiary,
    fontFamily: "monospace",
    fontSize: fontSize.xs,
  },
  control: (clip: string) => ({
    alignItems: "center",
    backgroundColor: accent.fill,
    clipPath: clip,
    color: accent.onFill,
    display: "flex",
    fontSize: fontSize.sm,
    height: "2.5rem",
    justifyContent: "center",
    width: "8rem",
  }),
  panel: (clip: string) => ({
    backgroundColor: surface.raised,
    clipPath: clip,
    height: "3.5rem",
    width: "8rem",
  }),
});

const STEPS = ["xs", "sm", "md", "lg", "xl"] as const;

// Structural view of the group (VarGroup types don't spread).
const depthMembers: Record<(typeof STEPS)[number], string> = depth;

export function ShapeSection() {
  const measure: Record<string, string> = { ...depthMembers };
  const { ref, values } = useTokenValues(measure);
  return (
    <Section
      title="shape — depth"
      description="The shared cut-depth ramp (absolute px — a cut is a machining depth), rendered as straight-profile chamfers on control- and panel-sized boxes. Which cuts go where is site-owned, never tokenised; profiles are square · straight · round."
    >
      <div ref={ref} {...stylex.props(styles.list)}>
        {STEPS.map((step) => (
          <div key={step} {...stylex.props(styles.row)}>
            <span {...stylex.props(styles.meta)}>depth.{step}</span>
            <span {...stylex.props(styles.control(chamferAllCorners(depth[step])))}>Aa</span>
            <span {...stylex.props(styles.panel(chamferAllCorners(depth[step])))} />
            <span {...stylex.props(styles.value)}>{values?.[step] ?? ""}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
