import * as stylex from "@stylexjs/stylex";
import { surface } from "@urban-ui/theme/color.stylex";
import { space } from "@urban-ui/theme/tokens.stylex";
import type { ReactNode } from "react";
import { contrastRatio, parseOklch } from "./oklch.js";
import { useTokenValues } from "./use-token-values.js";

/**
 * Inventory sections for the colour domain. Swatches render the live token
 * (so scoped themes on an ancestor show through) and every legibility
 * pairing is annotated with its computed WCAG ratio against the AA floor
 * (contrast-floor): 4.5 for text marks, 3.0 for icons and focus indicators.
 */

/** The 12-member anatomy shared by every flavour and status scale. */
export interface ScaleTokens {
  subtle: string;
  fill: string;
  border: string;
  line: string;
  ink: string;
  inkSecondary: string;
  inkTertiary: string;
  icon: string;
  onFill: string;
  onFillSecondary: string;
  trace: string;
  glow: string;
}

const TEXT_FLOOR = 4.5;
const GRAPHIC_FLOOR = 3;

const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: space.md,
  },
  heading: {
    fontSize: "1.125rem",
    fontWeight: 600,
  },
  band: {
    display: "flex",
    flexDirection: "column",
    gap: space.sm,
  },
  bandLabel: {
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    opacity: 0.7,
    textTransform: "uppercase",
  },
  row: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: space.md,
  },
  chip: (background: string, foreground: string) => ({
    alignItems: "center",
    backgroundColor: background,
    color: foreground,
    display: "flex",
    height: "2rem",
    justifyContent: "center",
    width: "3.5rem",
  }),
  chipOutlined: {
    outlineColor: surface.overlay,
    outlineStyle: "solid",
    outlineWidth: "1px",
  },
  member: {
    fontFamily: "monospace",
    fontSize: "0.875rem",
    minWidth: "9rem",
  },
  value: {
    fontFamily: "monospace",
    fontSize: "0.75rem",
    minWidth: "13rem",
    opacity: 0.75,
  },
  badges: {
    display: "flex",
    flexWrap: "wrap",
    gap: space.sm,
  },
  badge: {
    fontFamily: "monospace",
    fontSize: "0.75rem",
  },
  // Badge colours re-point to the status scales (positive/danger inks) when
  // they land in phase 2; until then weight alone separates fail from pass.
  badgeFail: {
    fontWeight: 700,
    textDecorationLine: "underline",
  },
});

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section {...stylex.props(styles.section)}>
      <h2 {...stylex.props(styles.heading)}>{title}</h2>
      <p>{description}</p>
      {children}
    </section>
  );
}

interface Pairing {
  /** e.g. "ink / canvas" */
  label: string;
  foreground: string;
  background: string;
  floor: number;
}

function ContrastBadge({ pairing, values }: { pairing: Pairing; values: Record<string, string> }) {
  const foreground = parseOklch(values[pairing.foreground] ?? "");
  const background = parseOklch(values[pairing.background] ?? "");
  if (foreground === undefined || background === undefined) {
    return null;
  }
  const ratio = contrastRatio(foreground, background);
  if (ratio === undefined) {
    return null;
  }
  const pass = ratio >= pairing.floor;
  return (
    <span {...stylex.props(styles.badge, !pass && styles.badgeFail)}>
      {pass ? "✓" : "✗"} {ratio.toFixed(2)} {pairing.label}
    </span>
  );
}

interface RowSpec {
  member: string;
  /** Chip colours: what this member looks like in situ. */
  chipBackground: string;
  chipForeground: string;
  /** Outline the chip when it would vanish into the page background. */
  outlined?: boolean;
  sample?: string;
  pairings?: Pairing[];
}

function TokenRows({
  rows,
  measure,
}: {
  rows: RowSpec[];
  /** All tokens the rows' pairings reference, keyed by pairing name. */
  measure: Record<string, string>;
}) {
  const { ref, values } = useTokenValues(measure);
  return (
    <div ref={ref} {...stylex.props(styles.band)}>
      {rows.map((row) => (
        <div key={row.member} {...stylex.props(styles.row)}>
          <span
            {...stylex.props(
              styles.chip(row.chipBackground, row.chipForeground),
              row.outlined === true && styles.chipOutlined,
            )}
          >
            {row.sample ?? "Aa"}
          </span>
          <span {...stylex.props(styles.member)}>{row.member}</span>
          <span {...stylex.props(styles.value)}>{values?.[row.member] ?? ""}</span>
          <span {...stylex.props(styles.badges)}>
            {values !== undefined &&
              row.pairings?.map((pairing) => (
                <ContrastBadge key={pairing.label} pairing={pairing} values={values} />
              ))}
          </span>
        </div>
      ))}
    </div>
  );
}

function bandLabel(label: string) {
  return (
    <span key={label} {...stylex.props(styles.bandLabel)}>
      {label}
    </span>
  );
}

/**
 * One flavour or status scale — the full anatomy, banded. Written against
 * the shared 12-member shape so every scale that lands renders through the
 * same inventory.
 */
export function ScaleSection({
  title,
  description,
  scale,
}: {
  title: string;
  description: string;
  scale: ScaleTokens;
}) {
  const measure: Record<string, string> = {
    ...scale,
    canvas: surface.canvas,
    panel: surface.panel,
    raised: surface.raised,
  };
  const onSurfaces = (member: string, floor: number): Pairing[] =>
    ["canvas", "panel", "raised"].map((ground) => ({
      label: `on ${ground}`,
      foreground: member,
      background: ground,
      floor,
    }));
  const fillRows: RowSpec[] = ["subtle", "fill"].map((member) => ({
    member,
    chipBackground: scale[member as "subtle" | "fill"],
    chipForeground: scale.onFill,
    pairings: [
      { label: "onFill", foreground: "onFill", background: member, floor: TEXT_FLOOR },
      {
        label: "onFillSecondary",
        foreground: "onFillSecondary",
        background: member,
        floor: TEXT_FLOOR,
      },
      ...(member === "subtle"
        ? [{ label: "ink", foreground: "ink", background: member, floor: TEXT_FLOOR }]
        : []),
    ],
  }));
  const edgeRows: RowSpec[] = ["border", "line"].map((member) => ({
    member,
    chipBackground: scale[member as "border" | "line"],
    chipForeground: scale.onFill,
    sample: " ",
  }));
  const markRows: RowSpec[] = [
    { member: "ink", floor: TEXT_FLOOR },
    { member: "inkSecondary", floor: TEXT_FLOOR },
    { member: "inkTertiary", floor: TEXT_FLOOR },
    { member: "icon", floor: GRAPHIC_FLOOR },
    { member: "onFill", floor: TEXT_FLOOR },
    { member: "onFillSecondary", floor: TEXT_FLOOR },
  ].map(({ member, floor }) => {
    const onFillMember = member.startsWith("onFill");
    return {
      member,
      chipBackground: onFillMember ? scale.fill : surface.panel,
      chipForeground: scale[member as keyof ScaleTokens],
      pairings: onFillMember
        ? [{ label: "on fill", foreground: member, background: "fill", floor }]
        : onSurfaces(member, floor),
    };
  });
  const materialRows: RowSpec[] = ["trace", "glow"].map((member) => ({
    member,
    chipBackground: scale[member as "trace" | "glow"],
    chipForeground: scale.onFill,
    sample: " ",
  }));
  return (
    <Section title={title} description={description}>
      {bandLabel("fill")}
      <TokenRows rows={fillRows} measure={measure} />
      {bandLabel("edge")}
      <TokenRows rows={edgeRows} measure={measure} />
      {bandLabel("marks")}
      <TokenRows rows={markRows} measure={measure} />
      {bandLabel("materials — translucent, no single ratio")}
      <TokenRows rows={materialRows} measure={measure} />
    </Section>
  );
}

/** Surface tokens the sections below inventory — background-only jobs. */
export interface SurfaceTokens {
  canvas: string;
  panel: string;
  raised: string;
  overlay: string;
  scrim: string;
}

/**
 * The neutral planes. Members are jobs, not a lightness ladder; legibility
 * pairings run against the neutral marks that sit on them.
 */
export function SurfaceSection({
  surfaces,
  marks,
}: {
  surfaces: SurfaceTokens;
  marks: Pick<ScaleTokens, "ink" | "inkSecondary" | "inkTertiary" | "icon">;
}) {
  const measure: Record<string, string> = { ...surfaces, ...marks };
  const rows: RowSpec[] = (["canvas", "panel", "raised", "overlay"] as const).map((member) => ({
    member,
    chipBackground: surfaces[member],
    chipForeground: marks.ink,
    outlined: true,
    pairings: [
      { label: "ink", foreground: "ink", background: member, floor: TEXT_FLOOR },
      { label: "inkSecondary", foreground: "inkSecondary", background: member, floor: TEXT_FLOOR },
      { label: "inkTertiary", foreground: "inkTertiary", background: member, floor: TEXT_FLOOR },
      { label: "icon", foreground: "icon", background: member, floor: GRAPHIC_FLOOR },
    ],
  }));
  rows.push({
    member: "scrim",
    chipBackground: surfaces.scrim,
    chipForeground: marks.ink,
    sample: " ",
  });
  return (
    <Section
      title="surface"
      description="The neutral planes — canvas/panel/raised are the ramp band, overlay/scrim the plane band. Jobs, not a lightness ladder; direction is a values decision."
    >
      <TokenRows rows={rows} measure={measure} />
    </Section>
  );
}

export interface StaticTokens {
  white: string;
  black: string;
  disabledInk: string;
  disabledFill: string;
  focus: string;
}

export function StaticsSection({
  statics,
  grounds,
}: {
  statics: StaticTokens;
  grounds: Pick<SurfaceTokens, "canvas" | "panel" | "raised">;
}) {
  const measure: Record<string, string> = { ...statics, ...grounds };
  const rows: RowSpec[] = [
    { member: "white", chipBackground: statics.white, chipForeground: statics.black },
    {
      member: "black",
      chipBackground: statics.black,
      chipForeground: statics.white,
      outlined: true,
    },
    {
      // Disabled content is exempt from WCAG contrast requirements — the
      // pairing is shown unannotated by design.
      member: "disabledInk",
      chipBackground: statics.disabledFill,
      chipForeground: statics.disabledInk,
    },
    {
      member: "disabledFill",
      chipBackground: statics.disabledFill,
      chipForeground: statics.disabledInk,
      sample: " ",
    },
    {
      // Focus is structural (structural-focus): a ring, held to the
      // non-text floor against every ground it can appear on.
      member: "focus",
      chipBackground: statics.focus,
      chipForeground: statics.black,
      pairings: (["canvas", "panel", "raised"] as const).map((ground) => ({
        label: `on ${ground}`,
        foreground: "focus",
        background: ground,
        floor: GRAPHIC_FLOOR,
      })),
    },
  ];
  return (
    <Section
      title="static"
      description="Scale-less app-wide singletons. Disabled pairs are WCAG-exempt; focus holds the non-text floor on every ground."
    >
      <TokenRows rows={rows} measure={measure} />
    </Section>
  );
}

/** The numbered steps shared by both physical derivation ramps. */
export type RampTokens = Record<
  "_100" | "_200" | "_300" | "_400" | "_500" | "_600" | "_700" | "_800" | "_900",
  string
>;

/**
 * A physical derivation ramp (shade/tint) — numbered alpha steps of pure
 * black/white, scheme-invariant, for deriving only (shade-tint-derive-only).
 * Display-only: alpha members have no single contrast ratio.
 */
export function RampSection({
  title,
  description,
  ramp,
}: {
  title: string;
  description: string;
  ramp: RampTokens;
}) {
  const measure: Record<string, string> = { ...ramp };
  // Translucent chips composite over the page ground, which is exactly how
  // the ramp is used in anger. VarGroups carry internal dunder keys
  // (__varGroupHash__) alongside the members — filter them out.
  const rows: RowSpec[] = Object.entries(ramp)
    .filter(([member]) => !member.startsWith("__"))
    .map(([member, token]) => ({
      member,
      chipBackground: token,
      chipForeground: "transparent",
      outlined: true,
      sample: " ",
    }));
  return (
    <Section title={title} description={description}>
      <TokenRows rows={rows} measure={measure} />
    </Section>
  );
}
