import * as stylex from "@stylexjs/stylex";
import { neutral } from "@urban-ui/theme/color.stylex";
import * as editorial from "@urban-ui/theme/editorial.stylex";
import { gap } from "@urban-ui/theme/space.stylex";
import {
  actionVoice,
  fontSize,
  headingVoice,
  labelVoice,
  lineHeight,
  subheadingVoice,
  textVoice,
} from "@urban-ui/theme/text.stylex";
import { Section } from "./color-sections.js";

/**
 * Specimens for both text scales. UI voices are voice-only (family/weight/
 * tracking) and take their size from the ramp — each renders at its default
 * step. Editorial roles carry the full anatomy. Everything here is
 * leading-trimmed by the base layer, so the gaps between specimens are
 * optical.
 */

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: gap.container,
  },
  row: {
    alignItems: "baseline",
    display: "flex",
    gap: gap.container,
  },
  meta: {
    color: neutral.inkTertiary,
    fontFamily: "monospace",
    fontSize: fontSize.xs,
    minWidth: "11rem",
  },
  sample: (family: string, weight: string, tracking: string, size: string, leading: string) => ({
    fontFamily: family,
    fontSize: size,
    fontWeight: weight,
    letterSpacing: tracking,
    lineHeight: leading,
  }),
});

const UI_VOICES = [
  { name: "heading", voice: headingVoice, step: "lg", sample: "Dispatch console" },
  { name: "subheading", voice: subheadingVoice, step: "md", sample: "Uplink diagnostics" },
  { name: "label", voice: labelVoice, step: "sm", sample: "Relay frequency" },
  { name: "action", voice: actionVoice, step: "sm", sample: "Engage override" },
  {
    name: "text",
    voice: textVoice,
    step: "md",
    sample: "Signal locked; the relay accepts new traffic.",
  },
] as const;

const STEPS = ["xs", "sm", "md", "lg", "xl"] as const;

export function UiTextSection() {
  return (
    <Section
      title="text — UI scale"
      description="Voice-only roles (family · weight · tracking) over the coordinated size ramp; each renders at its default step. Size comes from context, so role and control size never fight."
    >
      <div {...stylex.props(styles.list)}>
        {UI_VOICES.map(({ name, voice, step, sample }) => (
          <div key={name} {...stylex.props(styles.row)}>
            <span {...stylex.props(styles.meta)}>
              {name} · {step}
            </span>
            <span
              {...stylex.props(
                styles.sample(
                  voice.family,
                  voice.weight,
                  voice.tracking,
                  fontSize[step],
                  lineHeight[step],
                ),
              )}
            >
              {sample}
            </span>
          </div>
        ))}
        {STEPS.map((step) => (
          <div key={step} {...stylex.props(styles.row)}>
            <span {...stylex.props(styles.meta)}>ramp · {step}</span>
            <span
              {...stylex.props(
                styles.sample(
                  textVoice.family,
                  textVoice.weight,
                  textVoice.tracking,
                  fontSize[step],
                  lineHeight[step],
                ),
              )}
            >
              One coordinated size-world across text, gap and inset.
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

const EDITORIAL_ROLES = [
  { name: "display", role: editorial.display, sample: "Neon over rain" },
  { name: "heading", role: editorial.heading, sample: "The city reads itself" },
  { name: "subheading", role: editorial.subheading, sample: "Signals under the skin" },
  { name: "kicker", role: editorial.kicker, sample: "FIELD NOTES · SECTOR 9" },
  {
    name: "lede",
    role: editorial.lede,
    sample: "Every surface in the lower city carries a second text, written in light.",
  },
  {
    name: "body",
    role: editorial.body,
    sample:
      "Long-form reads balance against themselves: generous leading, a hidden ramp, and roles that carry their whole anatomy so a page of prose needs no context to sit right.",
  },
  { name: "mono", role: editorial.mono, sample: "relay.attach(sector9).stream()" },
  { name: "caption", role: editorial.caption, sample: "Fig 3 — uplink traces, false colour." },
] as const;

export function EditorialTextSection() {
  return (
    <Section
      title="text — editorial scale"
      description="Role-first with the ramp hidden: every role carries family · weight · size · tracking · leading. heading exists in both scales and is never shared."
    >
      <div {...stylex.props(styles.list)}>
        {EDITORIAL_ROLES.map(({ name, role, sample }) => (
          <div key={name} {...stylex.props(styles.row)}>
            <span {...stylex.props(styles.meta)}>{name}</span>
            <span
              {...stylex.props(
                styles.sample(role.family, role.weight, role.tracking, role.fontSize, role.leading),
              )}
            >
              {sample}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
