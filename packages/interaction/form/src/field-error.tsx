'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  base: {
    display: 'block',
    marginBlockStart: space[100],
  },
})

export interface FieldErrorProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * FieldError component for form fields.
 * Displays validation error messages for form fields.
 */
export function FieldError({ children, style, ...props }: FieldErrorProps) {
  return (
    <Text
      asChild
      size="sm"
      color="hi"
      style={[styles.base, themes.critical, style]}
    >
      <span {...props}>{children}</span>
    </Text>
  )
}
FieldError.displayName = '@urban-ui/form/field-error'
