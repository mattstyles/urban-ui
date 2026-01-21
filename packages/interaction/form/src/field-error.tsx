'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import type { FieldErrorProps as AriaFieldErrorProps } from 'react-aria-components'
import { FieldError as AriaFieldError } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'block',
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
    <Text
      asChild
      size="xs"
      color="hi"
      style={[styles.base, themes.critical, style]}
    >
      <AriaFieldError {...props}>{children}</AriaFieldError>
    </Text>
  )
}
FieldError.displayName = '@urban-ui/form/field-error'
