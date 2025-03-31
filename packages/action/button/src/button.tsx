'use client'

import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'

import { themes } from '@urban-ui/theme'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontWeights } from '@urban-ui/theme/type.stylex'
import { Button as AriaButton } from 'react-aria-components'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space['100'],
    paddingInline: space['200'],
    paddingBlock: space['100'],
    borderRadius: radii.lg,
    fontWeight: fontWeights.medium,
    transition:
      'background 0.2s, border-color 0.2s, color 0.2s, transform 0.1s',
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    ':active': {
      transform: 'scale(0.98)',
    },
  },
})

const variants = stylex.create({
  solid: {
    backgroundColor: tone.solid,
    color: tone.fgOnBlock,
    borderStyle: borderStyles.none,
    ':hover': {
      backgroundColor: tone.solidHover,
    },
    ':active': {
      backgroundColor: tone.solidActive,
    },
  },
  muted: {
    backgroundColor: tone.component,
    color: tone.fgHi,
    borderStyle: borderStyles.none,
    ':hover': {
      backgroundColor: tone.componentHover,
    },
    ':active': {
      backgroundColor: tone.componentActive,
    },
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: tone.border,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.sm,
    color: tone.fgHi,
    ':hover': {
      // borderColor: tone.borderMuted,
      backgroundColor: tone.componentHover,
      color: tone.fgHi,
    },
    ':active': {
      // borderColor: tone.borderMuted,
      backgroundColor: tone.componentActive,
      color: tone.fgLo,
    },
  },
})

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
  variant = 'solid',
  tone: toneName = 'primary',
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      {...stylex.props([
        styles.base,
        variants[variant],
        tones[toneName],
        style,
      ])}
    >
      {children}
    </AriaButton>
  )
}
