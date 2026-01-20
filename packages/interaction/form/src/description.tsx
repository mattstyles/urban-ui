'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  base: {
    display: 'block',
    marginBlockStart: space[100],
  },
})

export interface DescriptionProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Description component for form fields.
 * Provides accessible description text for form fields.
 */
export function Description({ children, style, ...props }: DescriptionProps) {
  return (
    <Text asChild size="sm" color="lo" style={[styles.base, style]}>
      <span {...props}>{children}</span>
    </Text>
  )
}
Description.displayName = '@urban-ui/form/description'
