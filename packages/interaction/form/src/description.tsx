'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { space } from '@urban-ui/theme/layout.stylex'
import type { TextProps as AriaTextProps } from 'react-aria-components'
import { Text as AriaText } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'block',
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
    <Text asChild size="sm" color="lo" style={[styles.base, style]}>
      <AriaText {...props} slot="description">
        {children}
      </AriaText>
    </Text>
  )
}
Description.displayName = '@urban-ui/form/description'
