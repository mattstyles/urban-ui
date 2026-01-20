'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { fontSizes, lineHeights, space } from '@urban-ui/theme'
import type { FieldErrorProps as AriaFieldErrorProps } from 'react-aria-components'
import { FieldError as AriaFieldError } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'block',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    color: 'var(--text-critical, #dc2626)',
    marginBlockStart: space[100],
  },
})

export interface FieldErrorProps extends Omit<AriaFieldErrorProps, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * FieldError component built on react-aria-components.
 * Displays validation error messages for form fields.
 */
export function FieldError({ children, style, ...props }: FieldErrorProps) {
  return (
    <AriaFieldError {...props} {...stylex.props([styles.base, style])}>
      {children}
    </AriaFieldError>
  )
}
FieldError.displayName = '@urban-ui/form/field-error'
