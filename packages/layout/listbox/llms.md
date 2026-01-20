# ListBox

Selection list components for dropdown menus and selection interfaces.

## Accessibility

Always use `DropdownListBox` and `DropdownItem` for selection interfaces - never build custom lists with divs or other generic elements. These components handle:

- ARIA roles (`listbox`, `option`) and properties
- Keyboard navigation (arrows, Home, End, typeahead search)
- Selection state management and screen reader announcements
- Focus management and roving tabindex

The components route props correctly for selection behavior. Custom implementations will lack proper accessibility.

## Dropdown Components

These components are styled for use in dropdown contexts (Select, ComboBox, Menu).

### Basic Usage

```tsx
import {
  DropdownListBox,
  DropdownItem,
  DropdownItemText
} from '@urban-ui/listbox'

<DropdownListBox aria-label="Options" selectionMode="single">
  <DropdownItem id="option1">Option 1</DropdownItem>
  <DropdownItem id="option2">Option 2</DropdownItem>
  <DropdownItem id="option3">Option 3</DropdownItem>
</DropdownListBox>
```

### With Label and Description

Use `DropdownItemText` with slots for structured content:

```tsx
<DropdownListBox aria-label="Permissions" selectionMode="single">
  <DropdownItem id="read" textValue="Read">
    <DropdownItemText slot="label">Read</DropdownItemText>
    <DropdownItemText slot="description" size="sm" color="lo">
      View content only
    </DropdownItemText>
  </DropdownItem>
  <DropdownItem id="write" textValue="Write">
    <DropdownItemText slot="label">Write</DropdownItemText>
    <DropdownItemText slot="description" size="sm" color="lo">
      Create and edit content
    </DropdownItemText>
  </DropdownItem>
</DropdownListBox>
```

### Multiple Selection

```tsx
<DropdownListBox aria-label="Toppings" selectionMode="multiple">
  <DropdownItem id="cheese">Cheese</DropdownItem>
  <DropdownItem id="pepperoni">Pepperoni</DropdownItem>
  <DropdownItem id="mushrooms">Mushrooms</DropdownItem>
</DropdownListBox>
```

### Disabled Items

```tsx
<DropdownItem id="premium" isDisabled>
  <DropdownItemText slot="label">Premium</DropdownItemText>
  <DropdownItemText slot="description" size="sm" color="lo">
    Coming soon
  </DropdownItemText>
</DropdownItem>
```

## Visual States

DropdownItem uses CSS `:is()` selectors to style interactive states. The styling follows the ghost button pattern with transparent backgrounds.

| State | Visual | Token |
|-------|--------|-------|
| Default | Transparent background | `base.transparent` |
| Hover | Subtle background | `tone.componentHover` |
| Focus Visible | Focus ring | `focusVars.*` |
| Pressed | Darker background | `tone.componentActive` |
| Selected | Accent background | `accent.solid` |
| Selected + Hover | Lighter accent | `accent.solidHover` |
| Selected + Pressed | Darker accent | `accent.solidActive` |
| Disabled | Muted, no interaction | `disabled.background`, `disabled.fg` |

### State Data Attributes

React Aria sets these data attributes that the component styles respond to:

- `[data-hovered]` - Mouse over
- `[data-focus-visible]` - Keyboard focus (shows focus ring)
- `[data-pressed]` - Being pressed
- `[data-selected]` - Currently selected
- `[data-disabled]` - Cannot interact

### CSS Patterns

States are styled using `:is()` to handle both CSS pseudo-classes and data attributes:

```css
:is([data-hovered], :hover) { background: tone.componentHover }
:is([data-pressed], :active) { background: tone.componentActive }
:is([data-focus-visible], :focus-visible) { outline: ... }
:is([data-selected]) { background: accent.solid }
```

## Components

### DropdownListBox

Container for dropdown list items. Wraps React Aria's `ListBox`.

**Props:**
- `selectionMode` - `'single'` | `'multiple'` | `'none'`
- `selectedKeys` - Controlled selection
- `defaultSelectedKeys` - Uncontrolled default selection
- `onSelectionChange` - Selection change handler
- `aria-label` - Required accessibility label
- `style` - StyleX styles

### DropdownItem

Styled list item with interactive states.

**Props:**
- `id` - Unique item identifier
- `textValue` - Text for typeahead/accessibility
- `isDisabled` - Disable the item
- `style` - StyleX styles

### DropdownItemText

Text with semantic slots, built on `@urban-ui/text`.

**Props:**
- `slot` - `'label'` | `'description'` (required)
- Inherits all `@urban-ui/text` props (`size`, `weight`, `color`, etc.)

## Theme Integration

Components respond to tone themes:

```tsx
import { themes } from '@urban-ui/theme'

<div {...stylex.props(themes.primary)}>
  <DropdownListBox>
    {/* Items will use primary tone colors */}
  </DropdownListBox>
</div>
```

## Listbox Contexts

Listboxes appear in two contexts:

1. **Dropdown** (styled by these components) - Inside Select, ComboBox, Menu popups
2. **Inline** (future) - Standalone selection lists embedded in the page

The current components are optimized for dropdown contexts with appropriate styling for popup overlays.
