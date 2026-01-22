'use client'

import { DropdownItem, type DropdownItemProps } from '@urban-ui/dropdown'
// import { ListboxItem, type ListboxItemProps } from '@urban-ui/listbox'

export type SelectItemProps<T extends object> = DropdownItemProps<T>

/**
 * SelectItem component for use within Select.
 * Re-exports DropdownItem from @urban-ui/listbox for consistent dropdown styling.
 *
 * @example
 * ```tsx
 * <Select>
 *   <SelectItem id="cat">Cat</SelectItem>
 *   <SelectItem id="dog">Dog</SelectItem>
 * </Select>
 * ```
 */
export const SelectItem = DropdownItem
