'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'
import { themes } from '@urban-ui/theme'
import type { InputProps as AriaInputProps } from 'react-aria-components'
import { Input as AriaInput } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    margin: 0,
    borderColor: tone.border,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    borderRadius: radii.md,
    backgroundColor: base.white,
    color: tone.fgHi,
    fontSize: fontSizes.md,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    '::placeholder': {
      color: tone.fgLo,
      opacity: 0.6,
    },
    ':is(:focus, [data-focused])': {
      borderColor: tone.solid,
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
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
    borderColor: tone.border,
  },
})

const sizes = stylex.create({
  sm: {
    fontSize: fontSizes.sm,
    paddingInline: space['100'],
    paddingBlock: space['50'],
    minHeight: `calc(${fontSizes.sm} + ((${space['50']} + ${borderWidths.md}) * 2))`,
  },
  md: {
    fontSize: fontSizes.md,
    paddingInline: space['200'],
    paddingBlock: space['100'],
    minHeight: `calc(${fontSizes.md} + ((${space['100']} + ${borderWidths.md}) * 2))`,
  },
  lg: {
    fontSize: fontSizes.lg,
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
        hasError && themes.critical,
        style,
      )}
    />
  )
}
Input.displayName = '@urban-ui/input'
