import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { Button } from "@urban-ui/react/button";
import { space } from "@urban-ui/theme/tokens.stylex";

/**
 * Visual scenes: coverage, not pedagogy — each named export is one committed
 * screenshot and one axe pass. Exports are logical groupings, one per axis
 * (states here; colour/size/tone become their own groups when the variant
 * system lands): grouping keeps one reviewable image per axis instead of a
 * baseline per state, and a caption names each member inside the capture.
 *
 * Imports go through the public subpath so VRT captures exactly what
 * consumers render.
 */

const styles = stylex.create({
  group: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: space.md,
  },
  item: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: space.sm,
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
        <Button>Button</Button>
      </Item>
      <Item label="disabled">
        <Button isDisabled>Button</Button>
      </Item>
      {/* Keyboard-modality focus on load — captures the browser focus ring. */}
      <Item label="focused">
        {/* oxlint-disable-next-line jsx-a11y/no-autofocus -- the scene exists to screenshot the focused state */}
        <Button autoFocus>Button</Button>
      </Item>
    </div>
  );
}

/** Content stress cases: padding and wrapping under awkward labels. */
export function Content() {
  return (
    <div {...stylex.props(styles.group)}>
      <Item label="long label">
        <Button>Save all changes and notify every subscriber on the list</Button>
      </Item>
    </div>
  );
}
