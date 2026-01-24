# Select Component Specification

This document specifies the anatomy of a Select component, providing a template for component generation and further development.

## Overview

A Select displays a collapsible list of options and allows a user to select one (or multiple) of them. It combines a trigger button that displays the current value with a popover containing a ListBox for option selection. The component inherits all selection, keyboard navigation, and accessibility features from React Aria.

---

## Anatomy

### Component Tree

```
Select
├── Label                     (optional, from Text/Form)
├── Button (Trigger)
│   ├── SelectValue
│   └── ChevronDown Icon
├── Description               (optional, from Text/Form)
├── FieldError                (optional, from Form)
└── Popover
    └── ListBox
        ├── ListBoxItem[]
        └── ListBoxSection    (optional, for grouped items)
            ├── ListBoxHeader
            └── ListBoxItem[]
```

### Visual Hierarchy

```
┌──────────────────────────────────────────────────────────────┐
│ Label (optional)                                             │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Trigger Button                                           │ │
│ │ ┊ SelectValue (placeholder or selected text)    [▼]     │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ Description (optional)                                       │
│ FieldError (optional, when invalid)                          │
└──────────────────────────────────────────────────────────────┘

     │ (opens)
     ▼

┌──────────────────────────────────────────────────────────────┐
│ Popover (min-width matches trigger)                          │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ ListBox                                                  │ │
│ │ ┌──────────────────────────────────────────────────────┐ │ │
│ │ │ ListBoxItem                                          │ │ │
│ │ │ ┊ Label                              [✓ if selected] │ │ │
│ │ └──────────────────────────────────────────────────────┘ │ │
│ │ ┌──────────────────────────────────────────────────────┐ │ │
│ │ │ ListBoxItem                                          │ │ │
│ │ │ ┊ Label                                              │ │ │
│ │ └──────────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## Usage Examples

### Basic Usage

```tsx
import { Select, SelectItem } from '@urban-ui/select'

<Select placeholder="Select an animal">
  <SelectItem id="cat">Cat</SelectItem>
  <SelectItem id="dog">Dog</SelectItem>
  <SelectItem id="fish">Fish</SelectItem>
</Select>
```

### Controlled Selection

```tsx
import { Select, SelectItem } from '@urban-ui/select'
import { useState } from 'react'

function ControlledExample() {
  const [value, setValue] = useState<string>('dog')

  return (
    <Select
      placeholder="Select an animal"
      selectedKey={value}
      onSelectionChange={(key) => setValue(key as string)}
    >
      <SelectItem id="cat">Cat</SelectItem>
      <SelectItem id="dog">Dog</SelectItem>
      <SelectItem id="fish">Fish</SelectItem>
    </Select>
  )
}
```

### With Sections

```tsx
import { Select, SelectItem } from '@urban-ui/select'
import { ListBoxSection, Header, Collection } from 'react-aria-components'

<Select placeholder="Select food" items={options}>
  {(section) => (
    <ListBoxSection id={section.name}>
      <Header>{section.name}</Header>
      <Collection items={section.children}>
        {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
      </Collection>
    </ListBoxSection>
  )}
</Select>
```

### Dynamic Collection

```tsx
const animals = [
  { id: 'cat', name: 'Cat' },
  { id: 'dog', name: 'Dog' },
  { id: 'fish', name: 'Fish' },
]

<Select placeholder="Select an animal" items={animals}>
  {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
</Select>
```

### Form Integration

```tsx
import { Select, SelectItem } from '@urban-ui/select'
import { Form } from '@urban-ui/form'

<Form>
  <Select
    name="animal"
    isRequired
    placeholder="Select an animal"
  >
    <SelectItem id="cat">Cat</SelectItem>
    <SelectItem id="dog">Dog</SelectItem>
  </Select>
</Form>
```

---

## Component Breakdown

### Select (Container)

The root component that orchestrates the trigger, popover, and listbox.

**Responsibilities:**
- Manages open/closed state of the popover
- Controls selection state
- Handles keyboard navigation between trigger and listbox
- Provides form integration (name, validation)
- ARIA combobox/listbox pattern

**Urban-UI Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'md' \| 'lg'` | `'md'` | Size variant affecting trigger and item heights |
| `style` | `StyleXStyles` | — | Additional styles for the root element |
| `triggerStyle` | `StyleXStyles` | — | Additional styles for the trigger button |

**Key Props from React Aria:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedKey` | `Key \| null` | — | Controlled selected item key |
| `defaultSelectedKey` | `Key` | — | Uncontrolled default selection |
| `onSelectionChange` | `(key: Key \| null) => void` | — | Selection change handler |
| `selectionMode` | `'single' \| 'multiple'` | `'single'` | Single or multi-select |
| `isDisabled` | `boolean` | `false` | Disable the entire select |
| `isRequired` | `boolean` | `false` | Form validation requirement |
| `isInvalid` | `boolean` | `false` | Invalid state for validation |
| `name` | `string` | — | Form submission name |
| `placeholder` | `string` | `'Select an item'` | Placeholder when nothing selected |
| `items` | `Iterable<T>` | — | Dynamic collection items |
| `isOpen` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Default open state |
| `onOpenChange` | `(isOpen: boolean) => void` | — | Open state change handler |

### SelectValue

Displays the currently selected value or placeholder in the trigger button.

**Render Props:**
| Prop | Type | Description |
|------|------|-------------|
| `selectedText` | `string \| null` | Text of selected item |
| `selectedItem` | `Node<T> \| null` | Full item data |
| `isPlaceholder` | `boolean` | Whether showing placeholder |

### SelectItem

Individual selectable option within the listbox (re-exports or wraps ListBoxItem).

**Key Props:**
| Prop | Type | Description |
|------|------|-------------|
| `id` | `Key` | Unique identifier |
| `textValue` | `string` | Text for typeahead/accessibility |
| `isDisabled` | `boolean` | Disable this option |

**Render Props (from React Aria):**
| Prop | Type | Description |
|------|------|-------------|
| `isHovered` | `boolean` | Mouse over state |
| `isFocused` | `boolean` | Focused state |
| `isFocusVisible` | `boolean` | Keyboard focus |
| `isPressed` | `boolean` | Being pressed |
| `isSelected` | `boolean` | Currently selected |
| `isDisabled` | `boolean` | Cannot interact |

---

## Implementation Decisions

### Context

- **Dropdown-style select** — The popover appears below (or above) the trigger button, similar to native `<select>` elements.
- **Composes existing components** — Uses `@urban-ui/popover` for overlay positioning and reuses ListBox patterns for options.
- **Single-select default** — Optimized for single selection, but supports multiple selection via `selectionMode="multiple"`.

### Component Relationship

Select composes existing urban-ui components:

```
Select
├── AriaSelect (react-aria-components)
├── AriaButton (trigger)
│   └── SelectValue + Icon
├── Popover (@urban-ui/popover)
└── ListBox (@urban-ui/listbox) with variant="dialog"
    └── SelectItem (wraps ListBoxItem + checkmark)
```

**SelectItem** wraps `ListBoxItem` from `@urban-ui/listbox` and adds:
- Checkmark icon at inline-end position
- Checkmark conditionally rendered via `composeRenderProps` when `isSelected` is true

The `variant="dialog"` on ListBox enables dropdown-specific styling where focus (not hover) is the primary visual indicator for keyboard navigation.

**Why JS rendering instead of CSS?** React Aria copies the selected item's children into `SelectValue` for the trigger display. CSS-hidden elements would still be copied, causing the checkmark to appear in the trigger.

### Visual States

**Trigger Button:**

| State | Data Attribute | Visual Treatment |
|-------|---------------|------------------|
| Default | - | White background, `tone.border`, value text `tone.fgHi` |
| Placeholder | - | White background, placeholder text `tone.fgLo` |
| Hovered | `[data-hovered]` | Darker border (`tone.fgLo`) |
| Focus Visible | `[data-focus-visible]` | Focus ring (standard focus tokens) |
| Pressed | `[data-pressed]` | `tone.component` background |
| Disabled | `[data-disabled]` | 50% opacity, `cursor: not-allowed` |
| Invalid | `[data-invalid]` | `critical.border` border color |
| Invalid + Focus | `[data-invalid][data-focus-visible]` | Critical focus ring |

**SelectItem (in dropdown) — via ListBox variant="dialog":**

| State | Data Attribute | Visual Treatment |
|-------|---------------|------------------|
| Default | - | Transparent background, `tone.fgHi` text |
| Hovered | `[data-hovered]` | Transparent (hover not emphasized in dialogs) |
| Focus Visible | `[data-focus-visible]` | `accent.solidHover` background, `accent.fgOnBlock` text |
| Pressed | `[data-pressed]` | `tone.componentActive` background |
| Selected | `[data-selected]` | Checkmark icon visible (end position) |
| Selected + Focus | `[data-selected][data-focus-visible]` | Focus background + checkmark |
| Disabled | `[data-disabled]` | `disabled.background`, `disabled.fg`, reduced opacity |

### Selection Indication

**Checkmark icon** appears at the inline-end (right in LTR) of the selected item.

No background color change is used for selected items in the dropdown — the checkmark provides clear selection feedback. This matches native select patterns and keeps the UI clean.

```
┌──────────────────────────────────────────┐
│ Option 1                                 │
├──────────────────────────────────────────┤
│ Option 2 (selected)              [✓]     │  ← checkmark visible
├──────────────────────────────────────────┤
│ Option 3                                 │
└──────────────────────────────────────────┘
```

**Important: JS-based conditional rendering required**

React Aria copies the selected item's rendered children into `SelectValue` for display in the trigger. If the checkmark were always in the DOM (hidden via CSS), it would also appear in the trigger.

**Solution:** Use `composeRenderProps` to access `isSelected` and conditionally render the checkmark:

```tsx
function SelectItem({ children, ...props }) {
  return (
    <ListBoxItem {...props}>
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          <Text slot="label">{children}</Text>
          {isSelected && (
            <Icon size="md">
              <Check />
            </Icon>
          )}
        </>
      ))}
    </ListBoxItem>
  )
}
```

This ensures the checkmark only exists in the DOM when selected, preventing it from being copied to the trigger.

### Sizing

| Size | Trigger Height | ListBox Size | Font Size | Padding Block | Padding Inline |
|------|----------------|--------------|-----------|---------------|----------------|
| `md` | `control.md` | `md` | `sm` | `space['100']` | `space['150']` |
| `lg` | `control.lg` | `lg` | `md` | `space['150']` | `space['200']` |

Size flows through to the ListBox via context, ensuring items match the trigger sizing.

### Popover Behavior

- **Width:** Popover matches trigger width via `min-width: var(--trigger-width)`
- **Height:** Grows to fit content (no max-height constraint)
- **Arrow:** No arrow (dropdown-style, not tooltip-style)
- **Placement:** Default `bottom`, flips to `top` if insufficient space
- **Animation:** Standard popover enter/exit transitions

### Theme Tokens

**Trigger:**
```tsx
// Background
base.white              // default background
tone.component          // pressed

// Border
tone.border             // default
tone.fgLo               // hovered
critical.border         // invalid state

// Text
tone.fgHi               // selected value text
tone.fgLo               // placeholder text

// Focus
focusVars.outlineColor  // focus ring
focusVars.outlineWidth  // focus ring width
focusVars.outlineOffset // focus ring offset
focusVars.outlineStyle  // focus ring style
```

**Popover/ListBox:**
```tsx
// Via @urban-ui/popover
tone.surface            // background (or base.white)
tone.border             // border
shadows.md              // elevation
radii.lg                // border radius
```

**Items (via ListBox variant="dialog"):**
```tsx
// Default
base.transparent        // background
tone.fgHi               // text

// Focus (keyboard navigation in dialogs)
accent.solidHover       // focus background
accent.fgOnBlock        // focus text

// Pressed
tone.componentActive    // pressed background

// Disabled
disabled.background     // disabled background
disabled.fg             // disabled text
```

**Checkmark Indicator:**
```tsx
// Conditionally rendered via JS (not CSS) — see Selection Indication section
// Only exists in DOM when isSelected is true
marginInlineStart: 'auto'  // pushes to inline-end
```

---

## Design Decisions

### Selection Indicator
**Decision:** Checkmark only, positioned at the end (inline-end) of the item.

Rationale: This follows the native select pattern and keeps the UI clean. Background color is not used for selected state in dropdowns (unlike inline ListBox where background indicates selection). The checkmark provides clear selection feedback without competing visual signals.

### Size Variants
**Decision:** Support `md` (default) and `lg` sizes only — matching Button and Input components.

| Size | Trigger Height | Font Size | Item Height |
|------|----------------|-----------|-------------|
| `md` | `control.md` | `sm` | `control.md` |
| `lg` | `control.lg` | `md` | `control.lg` |

No `sm` size — same rationale as ListBox (touch targets would be too small).

### Width Behavior
**Decision:** Full width by default.

The trigger fills its container width, matching the behavior of text inputs and other form controls. This ensures consistent form layouts without extra wrapper styling.

### ListBox Reuse
**Decision:** Use ListBox with `variant="dialog"` for dropdown items.

SelectItem should leverage the existing ListBoxItem component with the `dialog` variant for consistent styling. This means:
- No separate SelectItem styles — delegate to ListBoxItem
- ListBox already has `variant="dialog"` for dropdown contexts
- Checkmark indicator added via composition in Select

### Validation State
**Decision:** Show critical border when `isInvalid` is true.

The trigger border changes to `critical.border` (or equivalent) when the Select is in an invalid state, matching the pattern used by text inputs and other form controls.

### Placeholder Styling
**Decision:** Placeholder text uses muted color (`tone.fgLo`).

This distinguishes the placeholder from an actual selected value:
- Placeholder: `tone.fgLo` (muted, secondary)
- Selected value: `tone.fgHi` (primary, full contrast)

### Dropdown Height
**Decision:** Grow to fit content — no max-height constraint.

The dropdown expands to show all options without scrolling. For extremely long lists, consumers can:
- Use sections to organize content
- Implement a searchable/filterable Select pattern with Autocomplete
- Apply custom max-height styling if needed

### Label & Form Fields
**Decision:** Compose with external Form components.

Select does not include built-in label, description, or error slots. Use Form wrapper components:

```tsx
<FormField>
  <Label>Animal</Label>
  <Select name="animal" isRequired>...</Select>
  <FieldError />
</FormField>
```

---

## File Structure

```
packages/interaction/select/
├── src/
│   ├── index.ts              # Public exports
│   ├── select.tsx            # Main Select component (uses ListBox internally)
│   ├── select-item.tsx       # SelectItem (wraps ListBoxItem + checkmark)
│   └── select-context.tsx    # Size context (if needed)
├── llms.md                   # AI documentation
├── package.json
└── tsconfig.json
```

**Dependencies:**
- `@urban-ui/listbox` — ListBox and ListBoxItem for dropdown options
- `@urban-ui/popover` — Popover for overlay positioning
- `@urban-ui/icon` — Icon component for chevron and checkmark
- `@urban-ui/text` — Text component for placeholder/value

---

## Implementation Checklist

### Current Implementation Status

- [x] Basic Select component with trigger and popover
- [x] SelectItem with checkmark indicator
- [x] SelectListBox with styling
- [x] Keyboard navigation (via React Aria)
- [x] Basic tests

### Required Changes

**Trigger:**
- [ ] Add `size` prop (`md` | `lg`, default `md`)
- [ ] Change to full width by default (remove fixed min-width)
- [ ] Add invalid state border styling (`[data-invalid]` → `critical.border`)
- [ ] Style placeholder text with `tone.fgLo` (distinguish from value)
- [ ] Size-based padding and font sizes

**ListBox Integration:**
- [ ] Use `@urban-ui/listbox` with `variant="dialog"` instead of SelectListBox
- [ ] Pass `size` through to ListBox via props or context
- [ ] Remove internal SelectListBox component (use ListBox directly)

**SelectItem:**
- [ ] Refactor to use ListBoxItem from `@urban-ui/listbox`
- [ ] Use `composeRenderProps` to access `isSelected` render prop
- [ ] Conditionally render checkmark icon only when `isSelected` is true
- [ ] Position checkmark at inline-end with `marginInlineStart: 'auto'`

**Documentation:**
- [ ] Create llms.md documentation
- [ ] Add type tests for props

**Tests:**
- [ ] Test size variants
- [ ] Test invalid state styling
- [ ] Test placeholder vs value styling
- [ ] Test with sections

---

## Notes

### Accessibility Considerations

- React Aria handles all ARIA attributes automatically
- Trigger button has `aria-haspopup="listbox"` and `aria-expanded`
- ListBox has proper `listbox` role with `option` children
- Keyboard: Space/Enter to open, Arrow keys to navigate, Escape to close
- TypeAhead: Type to jump to matching options

### Styling Considerations

- Use data attributes from React Aria for state-based styling
- Trigger should visually indicate it's interactive (border, subtle shadow)
- Popover shadow provides elevation hierarchy
- Selected state should be clearly visible within the dropdown
- Disabled items should be visually distinct but not removed from layout

### Composition with Form

```tsx
// Recommended pattern for forms
<FormField>
  <Label>Animal</Label>
  <Select name="animal" isRequired>
    <SelectItem id="cat">Cat</SelectItem>
    <SelectItem id="dog">Dog</SelectItem>
  </Select>
  <FieldError />
</FormField>
```

### Differences from Native Select

- Custom styling (native selects are difficult to style)
- Better keyboard navigation patterns
- Support for rich content in options (icons, descriptions)
- Multiple selection support
- Sections with headers
- Search/filter capability (via Autocomplete wrapper)
