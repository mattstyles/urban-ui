import * as stylex from "@stylexjs/stylex";
import { colors, radii, space } from "@urban-ui/theme/tokens.stylex";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";

// Deliberately thin pipeline probe (001-repo-foundation): no variants, no
// tone scales — rewritten when the design-system structural rules land.
// Buttons never declare `cursor` — the browser default is the convention.
const styles = stylex.create({
  base: {
    backgroundColor: colors.accent,
    borderRadius: radii.control,
    borderStyle: "none",
    color: colors.accentText,
    paddingBlock: space.sm,
    paddingInline: space.md,
  },
});

export interface ButtonProps extends Omit<AriaButtonProps, "className" | "style"> {}

export function Button(props: ButtonProps) {
  return <AriaButton {...props} {...stylex.props(styles.base)} />;
}
