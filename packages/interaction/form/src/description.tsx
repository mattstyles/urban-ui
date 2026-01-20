'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, lineHeights } from '@urban-ui/theme/type.stylex'
import type { TextProps as AriaTextProps } from 'react-aria-components'
import { Text as AriaText } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'block',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    color: 'var(--text-muted, #6b7280)',
    marginBlockStart: space[100],
  },
})

export interface DescriptionProps extends Omit<AriaTextProps, 'style' | 'slot'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Description component built on react-aria-components.
 * Provides accessible description text for form fields.
 */
export function Description({ children, style, ...props }: DescriptionProps) {
  return (
    <AriaText
      {...props}
      slot="description"
      {...stylex.props([styles.base, style])}
    >
      {children}
    </AriaText>
  )
}
Description.displayName = '@urban-ui/form/description'
