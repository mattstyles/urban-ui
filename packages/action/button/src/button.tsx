'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { shapes, sizes, styles, variants } from '@urban-ui/styles/button'
import { Text } from '@urban-ui/text'
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

export interface ButtonProps
  extends Omit<AriaButtonProps, 'style'>,
    React.RefAttributes<HTMLButtonElement>,
    Partial<Pick<HTMLButtonElement, 'disabled'>> {
  /**
   * Visual variant
   * @default 'solid'
   */
  variant?: keyof typeof variants

  /**
   * Color tone
   * @default 'neutral'
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
}

/**
 * Button component built on react-aria-components.
 * Provides consistent styling with the Urban UI design system.
 */
export function Button({
  children,
  variant = 'solid',
  tone = 'primary',
  size = 'md',
  shape = 'rounded',
  style,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      isDisabled={props.isDisabled || props.disabled}
      {...stylex.props([
        styles.base,
        styles.content,
        sizes[size],
        shapes[shape],
        variants[variant],
        tones[tone],
        styles.disabled,
        style,
      ])}
    >
      {children}
    </AriaButton>
  )
}
Button.displayName = '@urban-ui/button'
