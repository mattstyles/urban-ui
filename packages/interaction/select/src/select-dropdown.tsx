import type { DropdownListBoxProps } from '@urban-ui/dropdown'
import { DropdownListBox } from '@urban-ui/dropdown'

export function SelectListBox<T extends object>(
  props: DropdownListBoxProps<T>,
) {
  return <DropdownListBox {...props} />
}
