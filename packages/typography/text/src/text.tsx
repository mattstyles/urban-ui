import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { grays, primary } from '@urban-ui/theme/colors.stylex'
import {
  fontSizes,
  letterSpacings,
  lineHeights,
} from '@urban-ui/theme/type.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  // Base text styles
  text: {
    // color: primary[500],
  },

  // Font sizes with corresponding line heights and letter spacing
  xxs: {
    fontSize: fontSizes.xxs,
    lineHeight: lineHeights.xxs,
    letterSpacing: letterSpacings.xxs,
  },
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    letterSpacing: letterSpacings.xs,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    letterSpacing: letterSpacings.sm,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    letterSpacing: letterSpacings.md,
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    letterSpacing: letterSpacings.lg,
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    letterSpacing: letterSpacings.xl,
  },
  xxl: {
    fontSize: fontSizes.xxl,
    lineHeight: lineHeights.xxl,
    letterSpacing: letterSpacings.xxl,
  },
})

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'style'>,
    React.PropsWithChildren {
  /**
   * Font size of the text, with corresponding line height and letter spacing.
   * Follows a consistent scale from smallest (xxs) to largest (xxl).
   * @default 'md'
   */
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Custom stylex styles to apply to the text.
   */
  style?: StyleXStyles
}

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const { size = 'md', style, children, ...rest } = props

  return (
    <span
      ref={ref}
      {...stylex.props(
        styles.text,
        styles[size],
        ...(Array.isArray(style) ? style : style ? [style] : []),
      )}
      {...rest}
    >
      {children}
    </span>
  )
})

Text.displayName = '@urban-ui/text'
