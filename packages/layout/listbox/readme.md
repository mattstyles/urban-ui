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

A styled ListBox container for use within Select and other dropdown components. Provides keyboard navigation and selection support.

### DropdownItem

Styled list item for use within DropdownListBox. Supports all interactive states with built-in styling.

### DropdownItemText

Text component for use within DropdownItem. Supports "label" and "description" slots for semantic structure. Built on `@urban-ui/text` for consistent typography.

## Usage

```tsx
import {
  DropdownListBox,
  DropdownItem,
  DropdownItemText
} from '@urban-ui/listbox'

function Example() {
  return (
    <DropdownListBox aria-label="Options" selectionMode="single">
      <DropdownItem textValue="Option 1">
        <DropdownItemText slot="label">
          Option 1
        </DropdownItemText>
        <DropdownItemText slot="description" size="sm" color="lo">
          Description text
        </DropdownItemText>
      </DropdownItem>
      <DropdownItem textValue="Option 2">
        <DropdownItemText slot="label">
          Option 2
        </DropdownItemText>
      </DropdownItem>
    </DropdownListBox>
  )
}
```

## Visual States

DropdownItem supports the following visual states, modeled using CSS `:is()` selectors:

| State | Description | Token |
|-------|-------------|-------|
| `isHovered` | Mouse is over the item | `tone.componentHover` |
| `isPressed` | Item is being pressed | `tone.componentActive` |
| `isSelected` | Item is currently selected | `accent.solid` |
| `isFocusVisible` | Focus ring for keyboard navigation | Focus ring via `focusVars` |
| `isDisabled` | Item cannot be interacted with | `disabled.background`, `disabled.fg` |

### State Priority (highest to lowest)

1. **isDisabled** - Overrides all other states
2. **isSelected** - Shows selection state (`accent.solid`)
3. **isPressed** - Shows press feedback (`tone.componentActive` or `accent.solidActive` when selected)
4. **isFocusVisible** - Shows focus ring for keyboard navigation
5. **isHovered** - Shows hover highlight (`tone.componentHover` or `accent.solidHover` when selected)

## Props

### DropdownItem

Extends `ListBoxItemProps` from react-aria-components.

| Prop | Type | Description |
|------|------|-------------|
| `id` | `Key` | Unique identifier for the item |
| `textValue` | `string` | Text used for typeahead and accessibility |
| `isDisabled` | `boolean` | Whether the item is disabled |
| `style` | `StyleXStyles` | Additional StyleX styles |

### DropdownItemText

Extends all props from `@urban-ui/text` plus:

| Prop | Type | Description |
|------|------|-------------|
| `slot` | `'label' \| 'description'` | Required. The semantic slot for this text element. |

See `@urban-ui/text` for typography props like `size`, `weight`, `color`, etc.

## Backwards Compatibility

The old component names are still exported as aliases:

- `DropdownListBoxItem` → `DropdownItem`
- `DropdownListBoxItemText` → `DropdownItemText`
