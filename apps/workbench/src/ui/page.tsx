import * as stylex from "@stylexjs/stylex";
import { space } from "@urban-ui/theme/tokens.stylex";
import type { ReactNode } from "react";

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: space.md,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: space.sm,
  },
  title: {
    margin: 0,
  },
  description: {
    margin: 0,
  },
});

export interface PageProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

/**
 * Shared page scaffold: consistent title/description header above page
 * content. Feature pages own everything below it.
 */
export function Page({ title, description, children }: PageProps) {
  return (
    <div {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>{title}</h1>
        {description === undefined ? null : (
          <p {...stylex.props(styles.description)}>{description}</p>
        )}
      </header>
      {children}
    </div>
  );
}
