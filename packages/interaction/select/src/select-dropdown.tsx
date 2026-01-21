import type { DropdownListBoxProps } from '@urban-ui/listbox'
import { DropdownListBox } from '@urban-ui/listbox'

export function SelectListBox<T extends object>(
  props: DropdownListBoxProps<T>,
) {
  return <DropdownListBox {...props} />
}
