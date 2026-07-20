import * as stylex from "@stylexjs/stylex";
import { Link, useLocation } from "@tanstack/react-router";
import { accent, neutral, surface } from "@urban-ui/theme/color.stylex";
import { gap, inset, size } from "@urban-ui/theme/space.stylex";
import { fontSize, labelVoice } from "@urban-ui/theme/text.stylex";
import { type ReactNode, useState } from "react";
import { ThemeEpochContext } from "./theme-epoch.js";
import { archiveText, denseSpace, violetColour } from "./themes.js";

// Primitives/Scales document the system; Playground uses the system; Labs
// have knobs to define the system; Experiments are freeform.
const sections = [
  { to: "/primitives", label: "Primitives" },
  { to: "/scales", label: "Scales" },
  { to: "/playground", label: "Playground" },
  { to: "/labs", label: "Labs" },
  { to: "/experiments", label: "Experiments" },
] as const;

// Root-level theme switching: whole named bundles applied to the shell, so
// every routed page re-values with zero call-site changes. Each axis is one
// category edit; axes compose freely (violet + dense is legal).
const themeAxes = [
  { key: "colour", label: "Colour", off: "flagship", on: "violet", bundle: violetColour },
  { key: "text", label: "Text", off: "flagship", on: "archive", bundle: archiveText },
  { key: "density", label: "Density", off: "flagship", on: "dense", bundle: denseSpace },
] as const;

type AxisKey = (typeof themeAxes)[number]["key"];

const styles = stylex.create({
  shell: {
    backgroundColor: surface.canvas,
    color: neutral.ink,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    alignItems: "baseline",
    borderBottomColor: neutral.border,
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    display: "flex",
    gap: gap.plane,
    justifyContent: "space-between",
    paddingBlock: inset.container,
    paddingInline: inset.plane,
  },
  wayfinding: {
    alignItems: "baseline",
    display: "flex",
    gap: gap.plane,
  },
  title: {
    color: neutral.ink,
    fontWeight: 600,
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    gap: gap.container,
  },
  link: {
    color: {
      default: neutral.inkSecondary,
      ":hover": neutral.ink,
    },
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
  },
  linkActive: {
    color: accent.ink,
  },
  themes: {
    display: "flex",
    gap: gap.control,
  },
  themeField: {
    alignItems: "center",
    display: "flex",
    gap: size.xs,
  },
  themeLabel: {
    color: neutral.inkTertiary,
    fontFamily: labelVoice.family,
    fontSize: fontSize.xs,
    fontWeight: labelVoice.weight,
    letterSpacing: labelVoice.tracking,
  },
  // Interim native select — a proper Select/Field primitive is flagged in
  // the phase 6 primitive-needs list.
  themeSelect: {
    backgroundColor: neutral.fill,
    borderStyle: "none",
    color: neutral.onFill,
    fontSize: fontSize.xs,
    paddingBlock: size.xs,
    paddingInline: size.sm,
  },
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingBlock: inset.container,
    paddingInline: inset.plane,
  },
});

/**
 * App chrome: a full-width header bar carrying the top-level section
 * navigation and the root-level theme switcher. Everything below is the
 * routed page's own — pages own their layout, width included.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [active, setActive] = useState<Record<AxisKey, boolean>>({
    colour: false,
    text: false,
    density: false,
  });
  const epoch = Number(active.colour) + Number(active.text) * 2 + Number(active.density) * 4;
  return (
    <div
      {...stylex.props(styles.shell, ...themeAxes.map((axis) => active[axis.key] && axis.bundle))}
    >
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.wayfinding)}>
          <Link to="/" {...stylex.props(styles.title)}>
            Urban UI workbench
          </Link>
          <nav {...stylex.props(styles.nav)}>
            {sections.map((section) => (
              <Link
                key={section.to}
                to={section.to}
                {...stylex.props(styles.link, pathname.startsWith(section.to) && styles.linkActive)}
              >
                {section.label}
              </Link>
            ))}
          </nav>
        </div>
        <div {...stylex.props(styles.themes)}>
          {themeAxes.map((axis) => (
            <label key={axis.key} {...stylex.props(styles.themeField)}>
              <span {...stylex.props(styles.themeLabel)}>{axis.label}</span>
              <select
                {...stylex.props(styles.themeSelect)}
                value={active[axis.key] ? axis.on : axis.off}
                onChange={(event) => {
                  setActive((current) => ({
                    ...current,
                    [axis.key]: event.target.value === axis.on,
                  }));
                }}
              >
                <option value={axis.off}>{axis.off}</option>
                <option value={axis.on}>{axis.on}</option>
              </select>
            </label>
          ))}
        </div>
      </header>
      <main {...stylex.props(styles.main)}>
        <ThemeEpochContext.Provider value={epoch}>{children}</ThemeEpochContext.Provider>
      </main>
    </div>
  );
}
