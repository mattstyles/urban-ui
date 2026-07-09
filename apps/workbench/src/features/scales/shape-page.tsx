import * as stylex from "@stylexjs/stylex";
import { gap } from "@urban-ui/theme/space.stylex";
import { ShapeSection } from "./shape-sections.js";

const styles = stylex.create({
  // The page is the plane; each section is a boxed panel on it, so the
  // between-ness is the plane gap.
  sections: {
    display: "flex",
    flexDirection: "column",
    gap: gap.plane,
  },
});

export function ShapePage() {
  return (
    <div {...stylex.props(styles.sections)}>
      <ShapeSection />
    </div>
  );
}
