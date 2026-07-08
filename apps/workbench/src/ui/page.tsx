import * as stylex from "@stylexjs/stylex";
import { neutral } from "@urban-ui/theme/color.stylex";
import { gap, size } from "@urban-ui/theme/space.stylex";
import { fontSize, headingVoice, lineHeight, textVoice } from "@urban-ui/theme/text.stylex";
import type { ReactNode } from "react";

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: gap.container,
  },
  // A header sits tighter to its content than peers sit to each other
  // (header-proximity): sm sits below the page's container gap.
  header: {
    display: "flex",
    flexDirection: "column",
    gap: size.sm,
  },
  title: {
    fontFamily: headingVoice.family,
    fontSize: fontSize.xl,
    fontWeight: headingVoice.weight,
    letterSpacing: headingVoice.tracking,
    lineHeight: lineHeight.xl,
  },
  description: {
    color: neutral.inkSecondary,
    fontFamily: textVoice.family,
    fontSize: fontSize.md,
    fontWeight: textVoice.weight,
    letterSpacing: textVoice.tracking,
    lineHeight: lineHeight.md,
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
