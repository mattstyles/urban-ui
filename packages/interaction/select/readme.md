# @urban-ui/select

Select component for choosing a single value from a list of options.

## Installation

```bash
bun add @urban-ui/select
```

## Composition

Select internally composes:

- **@urban-ui/popover** - Provides the dropdown overlay container with positioning, animations, and focus management
- Internal ListBox and Item components with styling and keyboard navigation

## Usage

```tsx
import { Select, SelectItem } from '@urban-ui/select'

function Example() {
  return (
    <Select placeholder="Select an animal" aria-label="Animals">
      <SelectItem id="cat">Cat</SelectItem>
      <SelectItem id="dog">Dog</SelectItem>
      <SelectItem id="rabbit">Rabbit</SelectItem>
    </Select>
  )
}
```

### Controlled value

```tsx
import { Select, SelectItem } from '@urban-ui/select'
import { useState } from 'react'

function ControlledExample() {
  const [value, setValue] = useState<string>('cat')

  return (
    <Select
      aria-label="Animals"
      selectedKey={value}
      onSelectionChange={(key) => setValue(key as string)}
    >
      <SelectItem id="cat">Cat</SelectItem>
      <SelectItem id="dog">Dog</SelectItem>
      <SelectItem id="rabbit">Rabbit</SelectItem>
    </Select>
  )
}
```

### With disabled items

```tsx
<Select aria-label="Options">
  <SelectItem id="option1">Available</SelectItem>
  <SelectItem id="option2" isDisabled>
    Unavailable
  </SelectItem>
  <SelectItem id="option3">Available</SelectItem>
</Select>
```

## Props

### Select

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | SelectItem children |
| `placeholder` | `string` | - | Placeholder text when no value selected |
| `selectedKey` | `Key` | - | Controlled selected key |
| `defaultSelectedKey` | `Key` | - | Default selected key (uncontrolled) |
| `onSelectionChange` | `(key: Key) => void` | - | Called when selection changes |
| `isDisabled` | `boolean` | `false` | Whether the select is disabled |
| `style` | `StyleXStyles` | - | Additional styles for root element |
| `triggerStyle` | `StyleXStyles` | - | Additional styles for trigger button |

### SelectItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `Key` | - | Unique identifier for the item |
| `children` | `ReactNode` | - | Item content |
| `isDisabled` | `boolean` | `false` | Whether the item is disabled |
| `textValue` | `string` | - | Text value for typeahead |
| `style` | `StyleXStyles` | - | Additional styles |
