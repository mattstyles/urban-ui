import * as stylex from "@stylexjs/stylex";
import { surface } from "@urban-ui/theme/color.stylex";
import { gap, inset } from "@urban-ui/theme/space.stylex";
import { denseSpace } from "../../ui/themes.js";
import { Section } from "./color-sections.js";
import { SpaceSection } from "./space-sections.js";

const styles = stylex.create({
  // The page is the plane; each section is a boxed panel on it, so the
  // between-ness is the plane gap.
  sections: {
    display: "flex",
    flexDirection: "column",
    gap: gap.plane,
  },
  // Nested inside a panel-faced section — one step forward (nesting caps
  // at raised).
  themedSubtree: {
    backgroundColor: surface.raised,
    padding: inset.container,
  },
});

export function SpacePage() {
  return (
    <div {...stylex.props(styles.sections)}>
      <SpaceSection />
      <Section
        title="Scoped theme — density"
        description="The dense theme (size-world re-pitch: text ramp, gap and inset moving as one category edit) scoped to this subtree. Compare against the space section above — same call sites, tighter world."
      >
        <div {...stylex.props(denseSpace, styles.themedSubtree)}>
          <SpaceSection />
        </div>
      </Section>
    </div>
  );
}
