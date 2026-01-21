'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import type { SelectProps as AriaSelectProps } from 'react-aria-components'
import { Select as AriaSelect } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
})

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'style' | 'className'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Select component for selecting a single value from a list of options.
 * Composes React Aria's Select with styled Popover and ListBox components.
 *
 * @example
 * ```tsx
 * <Select>
 *   <Label>Favorite Animal</Label>
 *   <Button>
 *     <SelectValue />
 *   </Button>
 *   <Popover>
 *     <SelectListBox>
 *       <SelectItem>Cat</SelectItem>
 *       <SelectItem>Dog</SelectItem>
 *     </SelectListBox>
 *   </Popover>
 * </Select>
 * ```
 */
export function Select<T extends object>({
  children,
  style,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect {...props} {...stylex.props(styles.base, style)}>
      {children}
    </AriaSelect>
  )
}
Select.displayName = '@urban-ui/select'
