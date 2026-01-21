'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import type { TextProps as AriaTextProps } from 'react-aria-components'
import { Text as AriaText } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'block',
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
    <Text asChild size="xs" color="lo" style={[styles.base, style]}>
      <AriaText {...props} slot="description">
        {children}
      </AriaText>
    </Text>
  )
}
Description.displayName = '@urban-ui/form/description'
