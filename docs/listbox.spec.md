# ListBox Component Specification

This document specifies the anatomy of a ListBox component, providing a template for component generation.

## Overview

A listbox displays a list of options and allows a user to select one or more of them. It provides keyboard navigation, selection management, and accessibility out of the box through React Aria.

---

## Anatomy

### Component Tree

```
ListBox
├── ListBoxItem
│   ├── Text slot="label"      (optional)
│   ├── Text slot="description" (optional)
│   └── SelectionIndicator     (optional)
├── ListBoxSection            (optional, for grouped items)
│   ├── Header
│   └── ListBoxItem[]
└── ListBoxLoadMoreItem       (optional, for infinite scroll)
```

### Visual Hierarchy

```
┌─────────────────────────────────────────┐
│ ListBox                                 │
│ ┌─────────────────────────────────────┐ │
│ │ ListBoxItem                         │ │
│ │  [SelectionIndicator] Label         │ │
│ │                       Description   │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ ListBoxSection                      │ │
│ │  Header                             │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ ListBoxItem                     │ │ │
│ │ └─────────────────────────────────┘ │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Usage Examples

### Basic Usage

```tsx
import { ListBox, ListBoxItem } from '@urban-ui/listbox'

<ListBox aria-label="Animals" selectionMode="single">
  <ListBoxItem id="cat">Cat</ListBoxItem>
  <ListBoxItem id="dog">Dog</ListBoxItem>
  <ListBoxItem id="fish">Fish</ListBoxItem>
</ListBox>
```

### With Label and Description

```tsx
import { ListBox, ListBoxItem, Text } from '@urban-ui/listbox'

<ListBox aria-label="Permissions" selectionMode="single">
  <ListBoxItem id="read" textValue="Read">
    <Text slot="label">Read</Text>
    <Text slot="description">View content only</Text>
  </ListBoxItem>
  <ListBoxItem id="write" textValue="Write">
    <Text slot="label">Write</Text>
    <Text slot="description">Create and edit content</Text>
  </ListBoxItem>
</ListBox>
```

### With Sections

```tsx
import { ListBox, ListBoxItem, ListBoxSection, Header } from '@urban-ui/listbox'

<ListBox aria-label="Food" selectionMode="multiple">
  <ListBoxSection>
    <Header>Fruits</Header>
    <ListBoxItem id="apple">Apple</ListBoxItem>
    <ListBoxItem id="banana">Banana</ListBoxItem>
  </ListBoxSection>
  <ListBoxSection>
    <Header>Vegetables</Header>
    <ListBoxItem id="carrot">Carrot</ListBoxItem>
    <ListBoxItem id="broccoli">Broccoli</ListBoxItem>
  </ListBoxSection>
</ListBox>
```

### Dynamic Collection

```tsx
const items = [
  { id: 1, name: 'Cat' },
  { id: 2, name: 'Dog' },
  { id: 3, name: 'Fish' },
]

<ListBox aria-label="Pets" items={items} selectionMode="single">
  {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
</ListBox>
```

---

## Component Breakdown

### ListBox (Container)

The root container managing selection state and keyboard navigation.

**Responsibilities:**
- Collection management (static and dynamic items)
- Selection state (single, multiple, none)
- Keyboard navigation
- Focus management
- ARIA listbox role

**Key Props from React Aria:**
| Prop | Type | Description |
|------|------|-------------|
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | Selection behavior |
| `selectedKeys` | `Iterable<Key> \| 'all'` | Controlled selection |
| `defaultSelectedKeys` | `Iterable<Key>` | Uncontrolled default |
| `onSelectionChange` | `(keys: Selection) => void` | Selection callback |
| `disabledKeys` | `Iterable<Key>` | Disabled item keys |
| `items` | `Iterable<T>` | Dynamic collection items |
| `layout` | `'stack' \| 'grid'` | Item arrangement |
| `orientation` | `'vertical' \| 'horizontal'` | Navigation direction |
| `aria-label` | `string` | Accessibility label |
| `renderEmptyState` | `() => ReactNode` | Empty state content |

### ListBoxItem (Option)

Individual selectable option within the listbox.

**Responsibilities:**
- Render item content
- Handle hover, press, focus states
- Display selection state
- Support for links (href)

**Key Props from React Aria:**
| Prop | Type | Description |
|------|------|-------------|
| `id` | `Key` | Unique identifier |
| `textValue` | `string` | Text for typeahead/accessibility |
| `isDisabled` | `boolean` | Disable interaction |
| `href` | `string` | Make item a link |
| `onAction` | `() => void` | Action handler |

**Render Props (from React Aria):**
| Prop | Type | Description |
|------|------|-------------|
| `isHovered` | `boolean` | Mouse over state |
| `isFocused` | `boolean` | Focused state |
| `isFocusVisible` | `boolean` | Keyboard focus |
| `isPressed` | `boolean` | Being pressed |
| `isSelected` | `boolean` | Currently selected |
| `isDisabled` | `boolean` | Cannot interact |

### ListBoxSection (Group)

Groups related items with an optional header.

**Key Props:**
| Prop | Type | Description |
|------|------|-------------|
| `id` | `Key` | Unique identifier |
| `items` | `Iterable<T>` | Dynamic section items |
| `aria-label` | `string` | Required if no Header |

### Header (Section Label)

Visual label for a section. Used within ListBoxSection.

### Text Slots

Semantic content slots within ListBoxItem:
- `slot="label"` - Primary text
- `slot="description"` - Secondary descriptive text

---

## Questions for Implementation

### 1. Context Questions

**Q1.1: What context will this listbox be used in?**
- [ ] Dropdown (inside Select, ComboBox, Menu popups)
- [ ] Inline (standalone selection list on page)
- [ ] Both (need variants for each context)

> Dropdown context typically has popup styling (shadows, borders), while inline may have different container styling.

**Q1.2: Is this a standalone component or part of a composite?**
- [ ] Standalone (exports ListBox directly)
- [ ] Part of Select component
- [ ] Part of ComboBox component
- [ ] Utility for multiple composites

### 2. Styling Questions

**Q2.1: What visual variants are needed for ListBoxItem?**

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Standard item styling | General use |
| `ghost` | Transparent background, color on hover | Dropdown menus |
| `muted` | Subtle background | Inline lists |

**Q2.2: What tone support is needed?**
- [ ] Uses parent theme context (tone.* tokens)
- [ ] Accepts explicit tone prop
- [ ] Fixed tone (e.g., always neutral)

**Q2.3: What size variants are needed?**

| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| `sm` | Compact | Small | Dense lists |
| `md` | Standard | Base | Default |
| `lg` | Spacious | Large | Touch targets |

**Q2.4: How should selection be indicated?**
- [ ] Background color change only
- [ ] Checkmark icon (single selection)
- [ ] Checkbox (multiple selection)
- [ ] Both background + indicator
- [ ] Configurable per instance

### 3. Composition Questions

**Q3.1: What child composition is needed for ListBoxItem?**

```tsx
// Simple - text only
<ListBoxItem>Label</ListBoxItem>

// Slotted - label + description
<ListBoxItem>
  <Text slot="label">Label</Text>
  <Text slot="description">Description</Text>
</ListBoxItem>

// Custom - any content
<ListBoxItem>
  <Flex gap="100">
    <Avatar src="..." />
    <Text>User name</Text>
  </Flex>
</ListBoxItem>
```

- [ ] Support all patterns
- [ ] Only simple + slotted
- [ ] Custom layout component needed (e.g., `ListBoxItemContent`)

**Q3.2: Should there be convenience sub-components?**
- [ ] `ListBoxItemContent` - Layout wrapper for item content
- [ ] `ListBoxItemText` - Pre-configured Text with slots
- [ ] `ListBoxItemIcon` - Icon positioning helper
- [ ] None - use composition with existing components

### 4. Feature Questions

**Q4.1: What features are required?**
- [ ] Single selection
- [ ] Multiple selection
- [ ] No selection (action-only items)
- [ ] Sections with headers
- [ ] Disabled items
- [ ] Links (href items)
- [ ] Async loading / infinite scroll
- [ ] Drag and drop reordering
- [ ] Grid layout
- [ ] Horizontal orientation
- [ ] Empty state
- [ ] Typeahead search

**Q4.2: What keyboard interactions must work?**
| Key | Action |
|-----|--------|
| Arrow Down/Up | Move focus |
| Arrow Left/Right | Grid navigation / Horizontal lists |
| Home/End | First/last item |
| Space | Toggle selection |
| Enter | Select / Activate action |
| Type characters | Typeahead search |
| Escape | Clear selection (configurable) |

### 5. State Questions

**Q5.1: What visual states need styling?**

| State | Data Attribute | Visual Treatment |
|-------|---------------|------------------|
| Default | - | Base styling |
| Hovered | `[data-hovered]` | Subtle background |
| Focused | `[data-focused]` | - |
| Focus Visible | `[data-focus-visible]` | Focus ring |
| Pressed | `[data-pressed]` | Darker background |
| Selected | `[data-selected]` | Accent background |
| Disabled | `[data-disabled]` | Muted, no pointer |

**Q5.2: How should combined states render?**
- Selected + Hovered
- Selected + Pressed
- Selected + Disabled
- Disabled + Hovered (should be no-op)

### 6. Token Questions

**Q6.1: What theme tokens will be used?**

```tsx
// Background states
tone.transparent     // default background
tone.componentHover  // hovered
tone.componentActive // pressed
accent.solid         // selected
accent.solidHover    // selected + hovered
accent.solidActive   // selected + pressed

// Text colors
tone.fgHi           // primary text
tone.fgLo           // secondary text (descriptions)
accent.fgOnSolid    // text on selected

// Disabled
disabled.background
disabled.fg

// Focus
focusVars.*         // focus ring
```

**Q6.2: What spacing tokens are needed?**

```tsx
space['100']  // gap between label/description
space['200']  // item padding inline
space['150']  // item padding block
radii.md      // item border radius (if any)
```

---

## File Structure

```
packages/layout/listbox/
├── src/
│   ├── index.ts              # Public exports
│   ├── listbox.tsx           # ListBox container
│   ├── listbox-item.tsx      # ListBoxItem
│   ├── listbox-section.tsx   # ListBoxSection + Header
│   ├── listbox-item-content.tsx  # Layout helper (optional)
│   ├── listbox-item-text.tsx     # Text helper (optional)
│   ├── styles.ts             # StyleX styles
│   └── types.ts              # Shared types
├── llms.md                   # AI documentation
├── package.json
└── tsconfig.json
```

---

## Implementation Checklist

- [ ] Define component props extending React Aria types
- [ ] Create StyleX styles for all visual states
- [ ] Implement ListBox container with styling
- [ ] Implement ListBoxItem with state-based styling
- [ ] Implement ListBoxSection if sections needed
- [ ] Add convenience components if needed
- [ ] Write tests for rendering and interactions
- [ ] Write type tests for prop types
- [ ] Create llms.md documentation
- [ ] Export from package index

---

## Notes

### Accessibility Considerations

- Never use custom divs/lists - always use React Aria's components
- `aria-label` is required on ListBox
- `textValue` on ListBoxItem for typeahead and screen readers
- Sections without Header must have `aria-label`
- Interactive elements inside items break navigation (use GridList instead)

### Styling Considerations

- Use data attributes over render props for styling (better CSS performance)
- Combine states with CSS `:is()` selector for both pseudo-classes and data attributes
- Let parent theme context flow through - avoid hardcoding colors
- Item styling should not impose layout on children (allow custom content structures)
