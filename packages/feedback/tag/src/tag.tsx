import stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import {
  background,
  base,
  border,
  foreground,
} from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    borderRadius: radii.full,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: base.transparent,
  },
})

const sizeStyles = stylex.create({
  md: {
    paddingInline: space.sm,
    height: space.lg,
  },
  lg: {
    paddingInline: space.md,
    height: space.xl,
  },
})

const variants = stylex.create({
  neutral: {
    backgroundColor: background.base,
    borderColor: border.neutralFaded,
    color: foreground.neutral,
  },
  neutralQuiet: {
    backgroundColor: background.neutralFaded,
    borderColor: border.neutral,
    color: foreground.neutral,
  },
  neutralLoud: {
    backgroundColor: background.neutral,
    borderColor: background.neutral,
    color: foreground.neutral,
  },
  accent: {
    backgroundColor: background.accentFaded,
    borderColor: border.accentFaded,
    color: foreground.accent,
  },
  accentLoud: {
    backgroundColor: background.accent,
    borderColor: background.accent,
    color: foreground.onAccent,
  },
  positive: {
    backgroundColor: background.positiveFaded,
    borderColor: border.positiveFaded,
    color: foreground.positive,
  },
  positiveLoud: {
    backgroundColor: background.positive,
    borderColor: background.positive,
    color: foreground.onLoud,
  },
  warning: {
    backgroundColor: background.warningFaded,
    borderColor: border.warningFaded,
    color: foreground.warning,
  },
  warningLoud: {
    backgroundColor: background.warning,
    borderColor: border.warning,
    color: foreground.neutral,
  },
  danger: {
    backgroundColor: background.dangerFaded,
    borderColor: border.dangerFaded,
    color: foreground.danger,
  },
  dangerLoud: {
    backgroundColor: background.danger,
    borderColor: background.danger,
    color: foreground.onLoud,
  },
  info: {
    backgroundColor: background.infoFaded,
    borderColor: border.infoFaded,
    color: foreground.info,
  },
  infoLoud: {
    backgroundColor: background.info,
    borderColor: background.info,
    color: foreground.onLoud,
  },
  disabled: {
    backgroundColor: background.disabled,
    borderColor: border.disabled,
    color: foreground.neutralFaded,
  },
})

export interface TagProps extends React.PropsWithChildren {
  /**
   * Visual variant, maps directly to color tokens
   * @default 'neutral'
   */
  variant?:
    | 'neutral'
    | 'neutralQuiet'
    | 'neutralLoud'
    | 'accent'
    | 'accentLoud'
    | 'positive'
    | 'positiveLoud'
    | 'warning'
    | 'warningLoud'
    | 'danger'
    | 'dangerLoud'
    | 'info'
    | 'infoLoud'
    | 'disabled'

  /**
   * Size affects padding and text size
   * @default 'md'
   */
  size?: 'md' | 'lg'

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const { variant = 'neutral', size = 'md', style, children } = props

  const textSize = size === 'md' ? 'sm' : 'md'

  return (
    <Flex
      ref={ref}
      align="center"
      style={[styles.base, variants[variant], sizeStyles[size], style]}
    >
      <Text size={textSize} weight="medium" color="current">
        {children}
      </Text>
    </Flex>
  )
})
