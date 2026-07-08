import * as stylex from "@stylexjs/stylex";
import {
  accent,
  advance,
  danger,
  neutral,
  positive,
  recede,
  shade,
  statics,
  surface,
  tint,
  warning,
} from "@urban-ui/theme/color.stylex";
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
        <ScaleSection
          title="accent"
          description="Flavour scale — the identity hue. fill is the seed directly (fill-takes-seed)."
          scale={accent}
        />
        <ScaleSection
          title="positive"
          description="Status scale — shares every L/C value with warning and danger; only the hue differs (equi-perceptual family)."
          scale={positive}
        />
        <ScaleSection
          title="warning"
          description="Status scale — equi-perceptual with positive and danger."
          scale={warning}
        />
        <ScaleSection
          title="danger"
          description="Status scale — equi-perceptual with positive and warning. Also the sanctioned source for invalid styling (state-grammar)."
          scale={danger}
        />
        <StaticsSection statics={statics} grounds={surface} />
        <RampSection
          title="advance"
          description="Semantic emphasis — moves toward the viewer in the active scheme (dark facet: lightens). All hover/press/selected derivations use this pair (emphasis-pair)."
          ramp={advance}
        />
        <RampSection
          title="recede"
          description="Semantic emphasis — moves away from the viewer in the active scheme (dark facet: darkens)."
          ramp={recede}
        />
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
