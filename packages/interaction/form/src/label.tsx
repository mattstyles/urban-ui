'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import type { LabelProps as AriaLabelProps } from 'react-aria-components'
import { Label as AriaLabel } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'block',
  },
})

export interface LabelProps extends Omit<AriaLabelProps, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Label component built on react-aria-components.
 * Provides accessible labeling for form fields.
 */
export function Label({ children, style, ...props }: LabelProps) {
  return (
    <Text asChild size="sm" weight="medium" style={[styles.base, style]}>
      <AriaLabel {...props}>{children}</AriaLabel>
    </Text>
  )
}
Label.displayName = '@urban-ui/form/label'
