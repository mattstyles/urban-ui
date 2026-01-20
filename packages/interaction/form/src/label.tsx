'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights, lineHeights } from '@urban-ui/theme/type.stylex'
import type { LabelProps as AriaLabelProps } from 'react-aria-components'
import { Label as AriaLabel } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'block',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.sm,
    marginBlockEnd: space[100],
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
    <AriaLabel {...props} {...stylex.props([styles.base, style])}>
      {children}
    </AriaLabel>
  )
}
Label.displayName = '@urban-ui/form/label'
