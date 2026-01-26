'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { shapes, sizes, styles, variants } from '@urban-ui/styles/button'
import { themes } from '@urban-ui/theme'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Button as AriaButton } from 'react-aria-components'

const tones = {
  neutral: themes.neutral,
  primary: themes.primary,
  accent: themes.accent,
  positive: themes.positive,
  warning: themes.warning,
  critical: themes.critical,
  info: themes.info,
}

export interface ButtonProps extends Omit<AriaButtonProps, 'style'> {
  /**
   * Visual variant
   * @default 'solid'
   */
  variant?: keyof typeof variants

  /**
   * Color tone
   * @default 'primary'
   */
  tone?: keyof typeof tones

  /**
   * Size
   * @default 'md'
   */
  size?: keyof typeof sizes

  /**
   * Shape
   * @default 'rounded'
   */
  shape?: keyof typeof shapes

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles

  /**
   * Whether the button is disabled (standard HTML attribute).
   * Alias for isDisabled.
   */
  disabled?: boolean
}

/**
 * Button component built on react-aria-components.
 * Provides consistent styling with the Urban UI design system.
 */
export function Button({
  variant = 'solid',
  tone = 'primary',
  size = 'md',
  shape = 'rounded',
  style,
  disabled,
  isDisabled,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      isDisabled={isDisabled ?? disabled}
      {...stylex.props(
        styles.base,
        styles.content,
        sizes[size],
        shapes[shape],
        variants[variant],
        tones[tone],
        styles.disabled,
        style
      )}
    />
  )
}
Button.displayName = '@urban-ui/button'
