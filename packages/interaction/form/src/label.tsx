'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  base: {
    display: 'block',
    marginBlockEnd: space[100],
  },
})

export interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Label component for form fields.
 * Provides accessible labeling using native label element.
 */
export function Label({ children, style, ...props }: LabelProps) {
  return (
    <Text asChild size="sm" weight="medium" style={[styles.base, style]}>
      <label {...props}>{children}</label>
    </Text>
  )
}
Label.displayName = '@urban-ui/form/label'
