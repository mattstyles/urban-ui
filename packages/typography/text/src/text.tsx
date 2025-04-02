import { Slot } from '@radix-ui/react-slot'
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles, Theme, VarGroup } from '@stylexjs/stylex'
import { themes } from '@urban-ui/theme'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import {
  capsize,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  tracking,
} from '@urban-ui/theme/type.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  // Base text styles
  base: {
    // Polyfill for leading-trim
    // lineHeight: 'initial',
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

const fontFamilies = stylex.create({
  display: {
    fontFamily: fonts.display,
  },
  body: {
    fontFamily: fonts.body,
  },
  mono: {
    fontFamily: fonts.mono,
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
  hi: {
    color: tone.fgHi,
  },
  lo: {
    color: tone.fgLo,
  },
  onBlock: {
    color: tone.fgOnBlock,
  },
})

/**
 * Font sizes with corresponding line heights and letter spacing
 */
const sizeValues = stylex.create({
  inherit: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
  },
  xxs: {
    fontSize: fontSizes.xxs,
    lineHeight: lineHeights.xxs,
    letterSpacing: tracking.xxs,
  },
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    letterSpacing: tracking.xs,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    letterSpacing: tracking.sm,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    letterSpacing: tracking.md,
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    letterSpacing: tracking.lg,
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    letterSpacing: tracking.xl,
  },
  xxl: {
    fontSize: fontSizes.xxl,
    lineHeight: lineHeights.xxl,
    letterSpacing: tracking.xxl,
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

/**
 * Tones
 */
const tones = {
  neutral: themes.neutral,
  primary: themes.primary,
  critical: themes.critical,
  positive: themes.positive,
  warning: themes.warning,
}

/**
 * Tracking
 * @css letter-spacing
 */
const trackingClasses = stylex.create({
  tighter: {
    letterSpacing: tracking.tighter,
  },
  tight: {
    letterSpacing: tracking.tight,
  },
  normal: {
    letterSpacing: tracking.normal,
  },
  wide: {
    letterSpacing: tracking.wide,
  },
  wider: {
    letterSpacing: tracking.wider,
  },
  widest: {
    letterSpacing: tracking.widest,
  },
})
// @ts-ignore typing for var group prefers a known object for its keys, we want a generic object and let the compiler work it out
type GenericTheme = Theme<VarGroup<unknown>> | Array<Theme<VarGroup<unknown>>>

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
   * Font family
   * @default body
   */
  font?: 'display' | 'body' | 'mono'
  /**
   * Font colours
   * @default foreground
   */
  color?: 'current' | 'hi' | 'lo' | 'onBlock'
  /**
   * Font colour scheme
   * @default foreground
   */
  tone?: 'neutral' | 'primary' | 'critical' | 'positive' | 'warning'
  /**
   * Tracking
   * @css letter-spacing
   */
  tracking?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'
  /**
   * Custom stylex styles to apply to the text.
   */
  style?: StyleXStyles | GenericTheme | Array<StyleXStyles | GenericTheme>
  /**
   * Merge props on to immediate child element
   */
  asChild?: boolean
}

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const {
    // size = 'inherit',
    // weight = 'normal',
    // font = 'body',
    // color = 'current',
    // tone,
    size,
    weight,
    font,
    color,
    tracking,
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
        size != null && sizeValues[size],
        weight != null && weights[weight],
        font != null && fontFamilies[font],
        color != null && fontColors[color],
        tracking != null && trackingClasses[tracking],
        style,
      )}
      {...rest}
    >
      {children}
    </Element>
  )
})

Text.displayName = '@urban-ui/text'
