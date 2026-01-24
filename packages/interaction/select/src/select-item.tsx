'use client'

import * as stylex from '@stylexjs/stylex'
import { Icon } from '@urban-ui/icon'
import { ListBoxItem, type ListBoxItemProps } from '@urban-ui/listbox'
import { Text } from '@urban-ui/text'
import { space } from '@urban-ui/theme/layout.stylex'
import { Check } from 'lucide-react'
import { composeRenderProps } from 'react-aria-components'

const styles = stylex.create({
  item: {
    // Override to row layout for checkmark positioning
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  check: {
    marginInlineStart: 'auto',
    flexShrink: 0,
    paddingInlineStart: space[100],
  },
})

export type SelectItemProps<T extends object> = ListBoxItemProps<T>

/**
 * Individual selectable option within a Select.
 * Wraps ListBoxItem and adds a checkmark indicator for selected state.
 *
 * @example
 * ```tsx
 * <Select placeholder="Select an animal">
 *   <SelectItem id="cat">Cat</SelectItem>
 *   <SelectItem id="dog">Dog</SelectItem>
 * </Select>
 * ```
 */
export function SelectItem<T extends object>({
  children,
  style,
  ...props
}: SelectItemProps<T>) {
  return (
    <ListBoxItem {...props} style={[styles.item, style]}>
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          {typeof children === 'string' ? (
            <Text slot="label" color="current">
              {children}
            </Text>
          ) : (
            children
          )}
          {isSelected && (
            <Icon size="md" style={styles.check} color="current">
              <Check />
            </Icon>
          )}
        </>
      ))}
    </ListBoxItem>
  )
}
