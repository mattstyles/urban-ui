import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import stylex from '@stylexjs/stylex'
import { grays, primary } from '@urban-ui/theme/colors.stylex'
import { fontSizes, lineHeights } from '@urban-ui/theme/type.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  // Base text styles
  text: {
    color: primary[500],
    background: grays[200],
    lineHeight: lineHeights.lg,
    width: fontSizes.xs,
    // width: sizes.full,
    // height: space[350],
  },

  // Font sizes
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    // lineHeight: '1',
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    // fontSize: 32,
    // lineHeight: 2,
  },
})

const double = stylex.create({
  container: {
    display: 'block',
    // width: sizes.md,
    // background: colors.blue7,
  },
})

export interface TextProps extends React.PropsWithChildren {
  /**
   * Font size of the text
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const { size = 'md', children } = props

  return (
    <span ref={ref} {...stylex.props(styles.text, styles.md, double.container)}>
      {children}
    </span>
  )
})

Text.displayName = 'Text'
