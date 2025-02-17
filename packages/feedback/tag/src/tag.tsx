import stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { background, foreground } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '999px', // Pill shape
  },
})

const sizeStyles = stylex.create({
  sm: {
    fontSize: fontSizes.xs,
    paddingInline: space.xs,
    paddingBlock: space.xxs,
  },
  md: {
    fontSize: fontSizes.sm,
    paddingInline: space.sm,
    paddingBlock: space.xs,
  },
  lg: {
    fontSize: fontSizes.md,
    paddingInline: space.md,
    paddingBlock: space.sm,
  },
})

const variants = stylex.create({
  neutral: {
    backgroundColor: background.neutral,
    color: foreground.neutral,
  },
  accent: {
    backgroundColor: background.accent,
    color: foreground.onAccent,
  },
  positive: {
    backgroundColor: background.positive,
    color: foreground.onLoud,
  },
  warning: {
    backgroundColor: background.warning,
    color: foreground.onLoud,
  },
  danger: {
    backgroundColor: background.danger,
    color: foreground.onLoud,
  },
  info: {
    backgroundColor: background.info,
    color: foreground.onLoud,
  },
})

export interface TagProps extends React.PropsWithChildren {
  /**
   * Visual variant, maps directly to color tokens
   * @default 'neutral'
   */
  variant?: 'neutral' | 'accent' | 'positive' | 'warning' | 'danger' | 'info'

  /**
   * Size affects padding and text size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const { variant = 'neutral', size = 'md', style, children } = props

  return (
    <Flex
      ref={ref}
      align="center"
      style={[styles.base, variants[variant], sizeStyles[size], style]}
    >
      {children}
    </Flex>
  )
})
