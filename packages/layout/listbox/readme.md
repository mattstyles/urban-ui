# @urban-ui/listbox

ListBox components for dropdown and selection interfaces, built on React Aria Components.

## Installation

```bash
bun add @urban-ui/listbox
```

### Peer Dependencies

```bash
bun add react-aria-components @stylexjs/stylex
```

## Components

### DropdownListBox

A styled ListBox container for use within Select and other dropdown components.

### DropdownListBoxItemText

Text component for use within `ListBoxItem`. Supports "label" and "description" slots for semantic structure. Built on `@urban-ui/text` for consistent typography.

## Usage

```tsx
import { DropdownListBox, DropdownListBoxItemText } from '@urban-ui/listbox'
import { ListBoxItem } from 'react-aria-components'

function Example() {
  return (
    <DropdownListBox aria-label="Options" selectionMode="single">
      <ListBoxItem textValue="Option 1">
        <DropdownListBoxItemText slot="label">
          Option 1
        </DropdownListBoxItemText>
        <DropdownListBoxItemText slot="description" size="sm" color="lo">
          Description text
        </DropdownListBoxItemText>
      </ListBoxItem>
      <ListBoxItem textValue="Option 2">
        <DropdownListBoxItemText slot="label">
          Option 2
        </DropdownListBoxItemText>
      </ListBoxItem>
    </DropdownListBox>
  )
}
```

## Props

### DropdownListBoxItemText

Extends all props from `@urban-ui/text` plus:

| Prop | Type | Description |
|------|------|-------------|
| `slot` | `'label' \| 'description'` | Required. The semantic slot for this text element. |

See `@urban-ui/text` for typography props like `size`, `weight`, `color`, etc.
