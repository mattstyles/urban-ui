# ListBox2

Standalone selection list component built on React Aria with StyleX styling.

## Installation

```bash
bun add @urban-ui/listbox-2
```

## Quick Start

```tsx
import { ListBox2, ListBox2Item } from '@urban-ui/listbox-2'

// Simple single selection
<ListBox2 aria-label="Options" selectionMode="single">
  <ListBox2Item id="1">Option 1</ListBox2Item>
  <ListBox2Item id="2">Option 2</ListBox2Item>
  <ListBox2Item id="3">Option 3</ListBox2Item>
</ListBox2>

// Multiple selection
<ListBox2 aria-label="Options" selectionMode="multiple">
  <ListBox2Item id="1">Option 1</ListBox2Item>
  <ListBox2Item id="2">Option 2</ListBox2Item>
</ListBox2>
```

## Components

### ListBox2

Container component that provides keyboard navigation and selection management.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant passed to items |
| selectionMode | `'none' \| 'single' \| 'multiple'` | - | Selection behavior |
| style | `StyleXStyles` | - | Additional styles |

### ListBox2Item

Individual option within the listbox. Selection is indicated by background color change only (no checkmark).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | `string` | - | Unique identifier |
| size | `'sm' \| 'md' \| 'lg'` | from context | Override size |
| textValue | `string` | - | Text for typeahead |
| isDisabled | `boolean` | `false` | Disable item |
| style | `StyleXStyles` | - | Additional styles |

### ListBox2Section

Groups related items with optional header.

```tsx
import { ListBox2Section, ListBox2Header } from '@urban-ui/listbox-2'

<ListBox2 aria-label="Options" selectionMode="single">
  <ListBox2Section>
    <ListBox2Header>Group A</ListBox2Header>
    <ListBox2Item id="a1">Item A1</ListBox2Item>
    <ListBox2Item id="a2">Item A2</ListBox2Item>
  </ListBox2Section>
</ListBox2>
```

### ListBox2ItemContent

Layout wrapper for complex item content (icon + text).

```tsx
import { ListBox2ItemContent, ListBox2ItemText } from '@urban-ui/listbox-2'

<ListBox2Item id="read" textValue="Read">
  <ListBox2ItemContent>
    <ListBox2ItemText slot="label">Read</ListBox2ItemText>
    <ListBox2ItemText slot="description" color="lo">
      View content only
    </ListBox2ItemText>
  </ListBox2ItemContent>
</ListBox2Item>
```

### ListBox2ItemText

Text component with slot support for label/description.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| slot | `'label' \| 'description'` | - | Semantic role |
| size | `'sm' \| 'md' \| 'lg'` | from context | Text size |

## Size Variants

| Size | Padding Block | Padding Inline |
|------|---------------|----------------|
| sm   | space[50]     | space[100]     |
| md   | space[100]    | space[150]     |
| lg   | space[150]    | space[200]     |

## State Styling

- **Hover**: `tone.componentHover` background
- **Focus**: Focus ring via `focusVars`
- **Pressed**: `tone.solidActive` background
- **Selected**: `accent.solid` background, `accent.fgOnBlock` text
- **Selected + Hover**: `accent.solidHover` background
- **Disabled**: Muted styling with `opacity: 0.6`

## Controlled Selection

```tsx
const [selected, setSelected] = useState<Selection>(new Set(['1']))

<ListBox2
  aria-label="Options"
  selectionMode="single"
  selectedKeys={selected}
  onSelectionChange={setSelected}
>
  <ListBox2Item id="1">Option 1</ListBox2Item>
  <ListBox2Item id="2">Option 2</ListBox2Item>
</ListBox2>
```

## Tokens

```tsx
// Colors
import { accent, base, disabled, tone } from '@urban-ui/theme/colors.stylex'

// Spacing
import { space } from '@urban-ui/theme/layout.stylex'

// Borders
import { radii } from '@urban-ui/theme/borders.stylex'

// Focus
import { focusVars } from '@urban-ui/theme/focus.stylex'
```
