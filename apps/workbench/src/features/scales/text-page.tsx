import * as stylex from "@stylexjs/stylex";
import { gap } from "@urban-ui/theme/space.stylex";
import { EditorialTextSection, UiTextSection } from "./type-sections.js";

const styles = stylex.create({
  sections: {
    display: "flex",
    flexDirection: "column",
    gap: gap.plane,
  },
});

export function TextPage() {
  return (
    <div {...stylex.props(styles.sections)}>
      <UiTextSection />
      <EditorialTextSection />
    </div>
  );
}
