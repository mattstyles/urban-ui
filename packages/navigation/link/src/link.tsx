'use client'
// react-aria-components link is a client-side component, but is not marked as such

import { Slot } from '@radix-ui/react-slot'
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as buttonStyles from '@urban-ui/styles/button'
import { styles, variants } from '@urban-ui/styles/link'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { Link as AriaLink } from 'react-aria-components'
import type { LinkProps as AriaLinkProps } from 'react-aria-components'

const tones = {
  neutral: themes.neutral,
  primary: themes.primary,
  accent: themes.accent,
  positive: themes.positive,
  warning: themes.warning,
  critical: themes.critical,
  info: themes.info,
}

export interface LinkFunctionalProps
  extends Omit<AriaLinkProps, 'style' | 'className' | 'children' | 'slot'>,
    React.PropsWithChildren,
    React.RefAttributes<HTMLAnchorElement> {
  /**
   * Visual variant
   * @default 'solid'
   */
  // variant?: keyof typeof variants

  /**
   * Color tone
   * @default 'neutral'
   */
  tone?: keyof typeof tones

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles

  /**
   * Whether to use the Slot component instead of a div
   */
  asChild?: boolean
}

type ButtonVariants = {
  display: 'button'
  variant?: keyof typeof buttonStyles.variants
}
type LinkVariants = {
  display?: 'link'
  variant?: keyof typeof variants
}

export type LinkProps = LinkFunctionalProps &
  (ButtonVariants | (Omit<LinkVariants, 'display'> & { display?: 'link' }))

/**
 * Button component built on react-aria-components.
 * Provides consistent styling with the Urban UI design system.
 */
export function Link({
  children,
  display = 'link',
  variant = 'text',
  tone = 'info',
  asChild = false,
  style,
  // @TODO add ref
  ...props
}: LinkProps) {
  const Element = asChild ? Slot : AriaLink

  if (display === 'button') {
    const buttonVariant = variant as keyof typeof buttonStyles.variants
    return (
      <Element
        {...props}
        {...stylex.props([
          buttonStyles.styles.base,
          buttonStyles.variants[buttonVariant],
          tones[tone],
          props?.isDisabled === true && styles.disabled,
          style,
        ])}
      >
        <Text weight="semibold">{children}</Text>
      </Element>
    )
  }

  return (
    <Element
      {...props}
      {...stylex.props([
        styles.base,
        variants[variant as keyof typeof variants],
        tones[tone],
        props?.isDisabled === true && styles.disabled,
        style,
      ])}
    >
      {children}
    </Element>
  )
}
