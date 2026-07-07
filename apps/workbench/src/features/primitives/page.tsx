import * as stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";
import { colors, space } from "@urban-ui/theme/tokens.stylex";
import { Page } from "../../ui/page.js";

const primitives = [
  {
    to: "/primitives/button",
    label: "Button",
    summary: "Press-handler button on react-aria-components.",
  },
] as const;

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: space.sm,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  link: {
    color: colors.accent,
  },
});

export function PrimitivesPage() {
  return (
    <Page title="Primitives" description="Individual component demos, one page per primitive.">
      <ul {...stylex.props(styles.list)}>
        {primitives.map((primitive) => (
          <li key={primitive.to}>
            <Link to={primitive.to} {...stylex.props(styles.link)}>
              {primitive.label}
            </Link>{" "}
            — {primitive.summary}
          </li>
        ))}
      </ul>
    </Page>
  );
}
