import { Slot } from '@radix-ui/react-slot'
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { base, primary, tone } from '@urban-ui/theme/colors.stylex'
import {
  capsize,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from '@urban-ui/theme/type.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  // Base text styles
  base: {
    lineHeight: 'initial',
    // Polyfill for leading-trim
    // '::before': {
    //   content: '',
    //   display: 'table',
    //   marginBottom: capsize.trimStartCap,
    // },
    // '::after': {
    //   content: '',
    //   display: 'table',
    //   marginTop: capsize.trimEndAlphabetic,
    // },
    textBox: 'trim-both cap alphabetic',
  },
})

/**
 * Font colour options
 */
const fontColors = stylex.create({
  current: {
    color: base.current,
  },
  /**
   * Deprecated, in favour of flat tokens rather than themed application
   */
  // foreground: {
  //   color: tokens.foreground,
  // },
  // contrast: {
  //   color: `oklch(from ${tokens.background} clamp(0, (l / 0.7 - 1) * -infinity, 1) 0 h)`,
  // },
  tone: {
    color: tone.fgHi,
  },
  primary: {
    color: primary.fgHi,
  },
})

/**
 * Font sizes with corresponding line heights and letter spacing
 */
const sizes = stylex.create({
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

/**
 * Font weights
 */
const weights = stylex.create({
  light: {
    fontWeight: fontWeights.light,
  },
  normal: {
    fontWeight: fontWeights.normal,
  },
  medium: {
    fontWeight: fontWeights.medium,
  },
  semibold: {
    fontWeight: fontWeights.semibold,
  },
  bold: {
    fontWeight: fontWeights.bold,
  },
})

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'style'>,
    React.PropsWithChildren {
  /**
   * Font size of the text, with corresponding line height and letter spacing.
   * Follows a consistent scale from smallest (xxs) to largest (xxl).
   * @default 'md'
   */
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Font weight
   * @default normal
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  /**
   * Font colours
   * @default foreground
   */
  color?: 'tone' | 'primary' | 'current'
  /**
   * Custom stylex styles to apply to the text.
   */
  style?: StyleXStyles
  /**
   * Merge props on to immediate child element
   */
  asChild?: boolean
}

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const {
    size = 'md',
    weight = 'normal',
    color = 'current',
    style,
    asChild = false,
    children,
    ...rest
  } = props

  const Element = asChild ? Slot : 'span'

  return (
    <Element
      ref={ref}
      {...stylex.props(
        styles.base,
        sizes[size],
        weights[weight],
        fontColors[color],
        style,
      )}
      {...rest}
    >
      {children}
    </Element>
  )
})

Text.displayName = '@urban-ui/text'
