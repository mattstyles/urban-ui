import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { ToggleButton } from "@urban-ui/labs/toggle-button";
import { size } from "@urban-ui/theme/space.stylex";

/**
 * Visual scenes: coverage, not pedagogy — each named export is one committed
 * screenshot and one axe pass. Exports are logical groupings, one per axis:
 * one reviewable image per axis instead of a baseline per state, with a
 * caption naming each member inside the capture. Imports go through the
 * public subpath so VRT captures what consumers get.
 */

const styles = stylex.create({
  group: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: size.md,
  },
  item: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: size.sm,
  },
  caption: {
    fontSize: "12px",
  },
});

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div {...stylex.props(styles.item)}>
      <span {...stylex.props(styles.caption)}>{label}</span>
      {children}
    </div>
  );
}

export function States() {
  return (
    <div {...stylex.props(styles.group)}>
      <Item label="base">
        <ToggleButton>Mute</ToggleButton>
      </Item>
      <Item label="selected">
        <ToggleButton defaultSelected>Mute</ToggleButton>
      </Item>
      <Item label="disabled">
        <ToggleButton isDisabled>Mute</ToggleButton>
      </Item>
    </div>
  );
}
