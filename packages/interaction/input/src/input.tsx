'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import {
  accent,
  base,
  critical,
  disabled,
  tone,
} from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'
import type { InputProps as AriaInputProps } from 'react-aria-components'
import { Input as AriaInput } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    margin: 0,
    borderColor: tone.borderMuted,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    borderRadius: radii.lg,
    backgroundColor: base.white,
    color: tone.fgHi,
    fontSize: fontSizes.md,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    '::placeholder': {
      color: tone.fgLo,
    },
    ':is(:focus-visible, [data-focus-visible])': {
      borderColor: accent.solid,
    },

    ':where([data-invalid])': {
      borderColor: critical.solid,
    },
  },
  disabled: {
    ':disabled': {
      backgroundColor: disabled.background,
      color: disabled.fg,
      cursor: 'not-allowed',
      opacity: 0.6,
      '::placeholder': {
        color: disabled.fg,
      },
    },
  },
  error: {
    borderColor: critical.solid,
  },
})

const sizes = stylex.create({
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.md,
    paddingInline: space['200'],
    paddingBlock: space['50'],
    minHeight: `calc(${fontSizes.md} + ((${space['50']} + ${borderWidths.md}) * 2))`,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.lg,
    paddingInline: space['200'],
    paddingBlock: space['100'],
    minHeight: `calc(${fontSizes.lg} + ((${space['100']} + ${borderWidths.md}) * 2))`,
  },
})

export interface InputProps extends Omit<AriaInputProps, 'style' | 'size'> {
  /**
   * Size of the input
   * @default 'md'
   */
  size?: keyof typeof sizes

  /**
   * Whether the input has an error state
   * @default false
   */
  hasError?: boolean

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Input component built on react-aria-components.
 * Provides a styled text input for forms.
 */
export function Input({
  size = 'md',
  hasError = false,
  style,
  ...props
}: InputProps) {
  return (
    <AriaInput
      {...props}
      {...stylex.props(
        styles.base,
        sizes[size],
        styles.disabled,
        hasError && styles.error,
        style,
      )}
    />
  )
}
Input.displayName = '@urban-ui/input'
