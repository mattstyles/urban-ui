import * as stylex from "@stylexjs/stylex";
import { colors, radii, space } from "@urban-ui/theme/tokens.stylex";
import {
  ToggleButton as AriaToggleButton,
  type ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components";

// Experimental labs probe: exercises state-dependent styling through RAC's
// render-prop className — the pattern candidate for the real variant system.
// Buttons never declare `cursor` — the browser default is the convention.
const styles = stylex.create({
  base: {
    backgroundColor: colors.surface,
    borderColor: colors.accent,
    borderRadius: radii.control,
    borderStyle: "solid",
    borderWidth: "1px",
    color: colors.text,
    paddingBlock: space.sm,
    paddingInline: space.md,
  },
  selected: {
    backgroundColor: colors.accent,
    color: colors.accentText,
  },
});

export interface ToggleButtonProps extends Omit<AriaToggleButtonProps, "className" | "style"> {}

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <AriaToggleButton
      {...props}
      className={({ isSelected }) =>
        stylex.props(styles.base, isSelected && styles.selected).className ?? ""
      }
    />
  );
}
