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
│   └── Slotted content        (string converted to Text)
├── ListBoxSection            (optional, for grouped items)
│   ├── Header
│   └── ListBoxItem[]
└── ListBoxLoadMoreItem       (optional, for infinite scroll)
```

### Visual Hierarchy

```
┌───────────────────────────────────────────────┐
│ ListBox                                       │
│ ┌───────────────────────────────────────────┐ │
│ │ ListBoxItem (hover fills to here)         │ │
│ │ ┊ Label                                   │ │
│ │ ┊ Description                             │ │
│ └───────────────────────────────────────────┘ │
│                                               │
│ ListBoxSection (block padding only)           │
│   ┊ Header (inset aligns with item content)   │
│ ┌───────────────────────────────────────────┐ │
│ │ ListBoxItem                               │ │
│ │ ┊ Label                                   │ │
│ └───────────────────────────────────────────┘ │
│ ┌───────────────────────────────────────────┐ │
│ │ ListBoxItem                               │ │
│ │ ┊ Label                                   │ │
│ └───────────────────────────────────────────┘ │
│                                               │
└───────────────────────────────────────────────┘
 ↑   ↑
 │   └── item padding / header inset (content alignment)
 └────── container padding
```

The dotted line (┊) indicates the consistent text alignment edge. Sections have no inline padding—items within sections align with items outside sections. Item hover/pressed states extend from the content alignment edge to the container padding boundary.

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

### Render Props for Item State

ListBoxItem accepts a render function to access the current item state:

```tsx
<ListBox aria-label="Options" selectionMode="single">
  <ListBoxItem id="option1">
    {({ isSelected, isHovered, isFocusVisible }) => (
      <>
        <Text slot="label">Option 1</Text>
        {isSelected && <Icon><Check /></Icon>}
      </>
    )}
  </ListBoxItem>
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

## Implementation Decisions

### Context

- **Inline only** — This ListBox is designed for in-page selection lists. A separate Dropdown component will handle popup contexts (Select, ComboBox, Menu) with its own visual language.
- **Standalone component** — Exports ListBox directly for independent use.

### Styling

**Visual variants:** Support all behavioral variants required for selection with a consistent visual language.

**Tone:** Neutral for all unselected states; accent theme for selected states (with `fgOnSolid` for text on selected backgrounds).

**Sizes:** `md` (default) and `lg` only. Small size is not supported as it would result in touch targets that are too small.

**Typography:** Text size follows UI conventions — `sm` text for `md` size, `md` text for `lg` size.

| Component Size | Text Size |
|----------------|-----------|
| `md` | `sm` |
| `lg` | `md` |

**Selection indication:** Background color change only.

### Visual States

| State | Data Attribute | Visual Treatment |
|-------|---------------|------------------|
| Default | - | Transparent background, high contrast neutral text (`tone.fgHi`) |
| Hovered | `[data-hovered]` | `tone.componentHover` background |
| Focused | `[data-focused]` | - |
| Focus Visible | `[data-focus-visible]` | Focus ring |
| Pressed | `[data-pressed]` | `tone.componentActive` background |
| Selected | `[data-selected]` | `accent.solid` background, `accent.fgOnSolid` text |
| Selected + Hovered | `[data-selected][data-hovered]` | `accent.solidHover` background |
| Selected + Pressed | `[data-selected][data-pressed]` | `accent.solidActive` background |
| Disabled | `[data-disabled]` | Standard disabled token scale |

### Composition

**Child patterns:** Support all patterns — simple text, slotted (label + description), and custom content.

```tsx
// Simple - text only (converted to Text structure internally)
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

**Convenience sub-components:** Planned for later. Initial implementation accepts a string (converted to Text structure) or slotted content (rendered directly).

### Features & Behavior

Inherit all functionality from React Aria Components. This component focuses on styling; all selection modes, keyboard interactions, and accessibility features come from React Aria.

### Tokens

**Theme tokens:**

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

**Spacing tokens:**

```tsx
space['100']  // gap between label/description, container padding
space['200']  // item padding inline
radii.md      // item border radius (if any)
```

**Size-based dimensions (matches Button/Input components):**

| Size | paddingBlock | paddingInline | minHeight |
|------|--------------|---------------|-----------|
| `md` | `space['100']` | `space['100']` | `control.md` (~28px→32px) |
| `lg` | `space['150']` | `space['100']` | `control.lg` (~40px→48px) |

**Note:** Items use `justifyContent: 'center'` to vertically center content within the minHeight.

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

### Edge Padding & Alignment

Headers and items use consistent inline padding to align content.

**Padding layers:**

| Element | Padding | Purpose |
|---------|---------|---------|
| ListBox container | `space['100']` inline | Visual breathing room from edges |
| ListBoxItem | `space['100']` inline, block varies by size | Content inset, matches container |
| ListBoxSection | `space['100']` block only | Vertical separation between sections |
| Header | `space['100']` inline | Aligns with item content |

**Note:** ListBoxItem uses `control.md` and `control.lg` tokens for minHeight to match Button and Input component heights with responsive scaling.

**Why this matters:**

- Item hover/pressed states extend edge-to-edge within the container padding
- Text content (in items and headers) aligns on a consistent vertical line
- Sections have no inline padding—items inside sections align with items outside
- Headers use matching inline padding for consistent text alignment
