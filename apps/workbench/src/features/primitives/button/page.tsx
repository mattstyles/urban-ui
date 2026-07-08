import * as stylex from "@stylexjs/stylex";
import { Button } from "@urban-ui/react/button";
import { neutral } from "@urban-ui/theme/color.stylex";
import { size } from "@urban-ui/theme/space.stylex";
import { type ReactNode, useState } from "react";
import { Page } from "../../../ui/page.js";

const styles = stylex.create({
  specimens: {
    display: "flex",
    flexDirection: "column",
    gap: size.md,
  },
  specimen: {
    display: "flex",
    flexDirection: "column",
    gap: size.sm,
  },
  specimenTitle: {
    fontWeight: 600,
  },
  // Square corners: the flagship silhouette baseline (square-baseline).
  specimenCanvas: {
    alignItems: "center",
    borderColor: neutral.border,
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    gap: size.sm,
    padding: size.md,
  },
});

// Page-specific presentation component: a titled frame around one usage of
// the primitive.
function Specimen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section {...stylex.props(styles.specimen)}>
      <span {...stylex.props(styles.specimenTitle)}>{title}</span>
      <div {...stylex.props(styles.specimenCanvas)}>{children}</div>
    </section>
  );
}

export function ButtonPage() {
  const [pressCount, setPressCount] = useState(0);
  return (
    <Page title="Button" description="Press-handler button on react-aria-components.">
      <div {...stylex.props(styles.specimens)}>
        <Specimen title="Basic">
          <Button onPress={() => setPressCount((count) => count + 1)}>Save</Button>
          <span>pressed {pressCount} times</span>
        </Specimen>
        <Specimen title="Disabled">
          <Button isDisabled>Save</Button>
        </Specimen>
      </div>
    </Page>
  );
}
