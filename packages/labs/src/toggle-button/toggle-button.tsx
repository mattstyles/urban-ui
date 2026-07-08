import * as stylex from "@stylexjs/stylex";
import { accent, neutral } from "@urban-ui/theme/color.stylex";
import { size } from "@urban-ui/theme/space.stylex";
import {
  ToggleButton as AriaToggleButton,
  type ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components";

// Experimental labs probe: exercises state-dependent styling through RAC's
// render-prop className — the pattern candidate for the real variant system.
// Buttons never declare `cursor` — the browser default is the convention.
// Mechanical re-point onto the contract groups (probe retirement, phase 6
// of docs/plans/002-theme-buildable-slice.md); square baseline replaces the
// probe radius (square-baseline). Real rework is component-plan work.
const styles = stylex.create({
  base: {
    backgroundColor: neutral.subtle,
    borderColor: accent.line,
    borderStyle: "solid",
    borderWidth: "1px",
    color: neutral.ink,
    paddingBlock: size.sm,
    paddingInline: size.md,
  },
  selected: {
    backgroundColor: accent.fill,
    color: accent.onFill,
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
