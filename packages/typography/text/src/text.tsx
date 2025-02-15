import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import stylex from '@stylexjs/stylex'
import { grays, primary } from '@urban-ui/theme/colors.stylex'
import { fontSizes, lineHeights } from '@urban-ui/theme/type.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  // Base text styles
  text: {
    // color: primary[500],
  },

  // Font sizes
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  // md: {
  //   fontSize: fontSizes.md,
  //   lineHeight: lineHeights.md,
  // },
  // lg: {
  //   fontSize: fontSizes.lg,
  //   lineHeight: lineHeights.lg,
  // },
  // xl: {
  //   fontSize: fontSizes.xl,
  //   lineHeight: lineHeights.xl,
  // },
})

export interface TextProps extends React.PropsWithChildren {
  /**
   * Font size of the text
   * @default 'md'
   */
  // size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  size?: 'xs' | 'sm'
}

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const { size = 'sm', children } = props

  return (
    <span ref={ref} {...stylex.props(styles.text, styles[size])}>
      {children}
    </span>
  )
})

Text.displayName = 'Text'
