'use client'

import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { styles, variants } from '@urban-ui/styles/button'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { Button as AriaButton } from 'react-aria-components'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'

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
  extends Omit<AriaButtonProps, 'style' | 'children'>,
    React.PropsWithChildren,
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
  style,
  ...props
}: ButtonProps) {
  const content = getSlot({ children })
  return (
    <AriaButton
      {...props}
      isDisabled={props.isDisabled || props.disabled}
      {...stylex.props([
        styles.base,
        variants[variant],
        tones[tone],
        styles.disabled,
        style,
      ])}
    >
      {content}
    </AriaButton>
  )
}
Button.displayName = '@urban-ui/button'

/**
 * Children are a slot and a string will become a Text element, otherwise Button will honour the children passed to it.
 */
function getSlot({ children }: { children: React.ReactNode }) {
  const content =
    typeof children === 'string' ? (
      <Text weight="semibold">{children}</Text>
    ) : (
      children
    )
  return content
}
