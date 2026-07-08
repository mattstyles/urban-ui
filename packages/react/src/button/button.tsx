import * as stylex from "@stylexjs/stylex";
import { accent, advance, statics } from "@urban-ui/theme/color.stylex";
import { size } from "@urban-ui/theme/space.stylex";
import { actionVoice, fontSize, lineHeight } from "@urban-ui/theme/text.stylex";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";

// Light-touch contract restyle (docs/plans/002-theme-buildable-slice.md,
// phase 6): enough to see the scales in anger. The variant system, control
// sizes (urban-ui-6yb) and materials (urban-ui-s2e) are component-plan work.
// Square baseline (square-baseline); buttons never declare `cursor`.
const styles = stylex.create({
  base: {
    // Gesture states derive from the semantic emphasis pair
    // (emphasis-pair); `:active` is the CSS carrier for the grammar's
    // `press` (state-grammar names the state, not the selector).
    backgroundColor: {
      default: accent.fill,
      ":hover": `color-mix(in oklch, ${accent.fill}, ${advance._200})`,
      ":active": `color-mix(in oklch, ${accent.fill}, ${advance._300})`,
      ":disabled": statics.disabledFill,
    },
    color: {
      default: accent.onFill,
      ":disabled": statics.disabledInk,
    },
    borderStyle: "none",
    fontFamily: actionVoice.family,
    fontSize: fontSize.sm,
    fontWeight: actionVoice.weight,
    letterSpacing: actionVoice.tracking,
    lineHeight: lineHeight.sm,
    // Control padding chains through control sizing when urban-ui-6yb lands.
    paddingBlock: size.sm,
    paddingInline: size.md,
    // Structural focus (structural-focus): a ring from static.focus.
    // Ring width/offset tokens are urban-ui-6yb's.
    outlineColor: statics.focus,
    outlineOffset: "2px",
    outlineStyle: {
      default: "none",
      ":focus-visible": "solid",
    },
    outlineWidth: "2px",
  },
});

export interface ButtonProps extends Omit<AriaButtonProps, "className" | "style"> {}

export function Button(props: ButtonProps) {
  return <AriaButton {...props} {...stylex.props(styles.base)} />;
}
