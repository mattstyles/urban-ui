'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import type { SelectValueProps as AriaSelectValueProps } from 'react-aria-components'
import { SelectValue as AriaSelectValue } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    color: tone.fgHi,
  },
  placeholder: {
    color: tone.fgLo,
  },
})

export interface SelectValueProps<T extends object>
  extends Omit<AriaSelectValueProps<T>, 'style' | 'className'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * SelectValue displays the currently selected value in the Select trigger.
 * When no value is selected, shows the placeholder text.
 */
export function SelectValue<T extends object>({
  style,
  ...props
}: SelectValueProps<T>) {
  return (
    <AriaSelectValue
      {...props}
      {...stylex.props(styles.base, style)}
    />
  )
}
SelectValue.displayName = '@urban-ui/select/SelectValue'
