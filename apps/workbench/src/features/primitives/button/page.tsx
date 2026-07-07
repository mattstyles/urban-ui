import * as stylex from "@stylexjs/stylex";
import { Button } from "@urban-ui/react/button";
import { colors, radii, space } from "@urban-ui/theme/tokens.stylex";
import { type ReactNode, useState } from "react";
import { Page } from "../../../ui/page.js";

const styles = stylex.create({
  specimens: {
    display: "flex",
    flexDirection: "column",
    gap: space.md,
  },
  specimen: {
    display: "flex",
    flexDirection: "column",
    gap: space.sm,
  },
  specimenTitle: {
    fontWeight: 600,
  },
  specimenCanvas: {
    alignItems: "center",
    borderColor: colors.text,
    borderRadius: radii.control,
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    gap: space.sm,
    padding: space.md,
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
