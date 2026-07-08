import * as stylex from "@stylexjs/stylex";
import { neutral, shade, statics, surface, tint } from "@urban-ui/theme/color.stylex";
import { space } from "@urban-ui/theme/tokens.stylex";
import { Page } from "../../ui/page.js";
import {
  RampSection,
  ScaleSection,
  Section,
  StaticsSection,
  SurfaceSection,
} from "./color-sections.js";
import { magentaNeutral } from "./smoke-theme.js";

const styles = stylex.create({
  sections: {
    display: "flex",
    flexDirection: "column",
    gap: space.lg,
  },
  themedSubtree: {
    backgroundColor: surface.panel,
    padding: space.md,
  },
});

export function ScalesPage() {
  return (
    <Page
      title="Scales"
      description="The theme contract's token groups, inventoried live: every member reads its value off the DOM, and every legibility pairing is annotated against the AA floor."
    >
      <div {...stylex.props(styles.sections)}>
        <SurfaceSection surfaces={surface} marks={neutral} />
        <ScaleSection
          title="neutral"
          description="Flavour scale — the full 12-member anatomy every flavour and status scale shares: fill, edge, marks, materials."
          scale={neutral}
        />
        <StaticsSection statics={statics} grounds={surface} />
        <RampSection
          title="shade"
          description="Physical darkening — scheme-invariant black alpha steps, for deriving only. Chips composite over the page ground."
          ramp={shade}
        />
        <RampSection
          title="tint"
          description="Physical lightening — scheme-invariant white alpha steps, for deriving only."
          ramp={tint}
        />
        <Section
          title="Scoped theme — smoke proof"
          description="The neutral group fully re-valued (magenta re-hue) by a createTheme applied to this subtree only. Values and ratios below are read live from inside the subtree — the group is the themeable unit, and a theme scopes to any branch point."
        >
          <div {...stylex.props(magentaNeutral, styles.themedSubtree)}>
            <ScaleSection
              title="neutral (themed subtree)"
              description="Identical call sites as the section above; only the ancestor theme differs."
              scale={neutral}
            />
          </div>
        </Section>
      </div>
    </Page>
  );
}
