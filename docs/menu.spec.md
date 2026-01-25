# Menu Component Specification

This document specifies the anatomy of a Menu component, providing a template for component generation.

## Overview

A menu displays a list of actions or options that a user can choose. Menus are triggered by a button or other interactive element and appear in a popover overlay. They support actions, selection (single/multiple), sections, separators, keyboard shortcuts, and nested submenus.

---

## Anatomy

### Component Tree

```
MenuTrigger
├── Button (or any pressable trigger)
└── Popover
    └── Menu
        ├── MenuItem
        │   ├── Text slot="label"        (optional)
        │   ├── Text slot="description"  (optional)
        │   ├── Keyboard                 (optional, for shortcuts)
        │   └── SelectionIndicator       (optional)
        ├── Separator                    (optional)
        ├── MenuSection                  (optional, for grouped items)
        │   ├── Header
        │   └── MenuItem[]
        └── SubmenuTrigger              (optional, for nested menus)
            ├── MenuItem
            └── Popover
                └── Menu
```

### Visual Hierarchy

```
┌──────────────────────────────────────────────────────────┐
│ [Button Trigger]                                         │
└──────────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────┐
│ Popover                                                  │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Menu                                                 │ │
│ │ ┌──────────────────────────────────────────────────┐ │ │
│ │ │ MenuItem                          ⌘C             │ │ │
│ │ │  Label                                           │ │ │
│ │ │  Description (optional)                          │ │ │
│ │ └──────────────────────────────────────────────────┘ │ │
│ │ ────────────────────────────────────────────────────── │
│ │ ┌──────────────────────────────────────────────────┐ │ │
│ │ │ MenuSection                                      │ │ │
│ │ │  Header                                          │ │ │
│ │ │ ┌──────────────────────────────────────────────┐ │ │ │
│ │ │ │ MenuItem                                     │ │ │ │
│ │ │ └──────────────────────────────────────────────┘ │ │ │
│ │ └──────────────────────────────────────────────────┘ │ │
│ │ ┌──────────────────────────────────────────────────┐ │ │
│ │ │ MenuItem (submenu trigger)              ▶        │ │ │
│ │ └──────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Usage Examples

### Basic Usage

```tsx
import { MenuTrigger, Menu, MenuItem } from '@urban-ui/menu'
import { Popover } from '@urban-ui/popover'
import { Button } from '@urban-ui/button'

<MenuTrigger>
  <Button>Actions</Button>
  <Popover>
    <Menu>
      <MenuItem onAction={() => console.log('cut')}>Cut</MenuItem>
      <MenuItem onAction={() => console.log('copy')}>Copy</MenuItem>
      <MenuItem onAction={() => console.log('paste')}>Paste</MenuItem>
    </Menu>
  </Popover>
</MenuTrigger>
```

### With Label, Description, and Keyboard Shortcut

```tsx
import { MenuTrigger, Menu, MenuItem, MenuItemText, Keyboard } from '@urban-ui/menu'
import { Popover } from '@urban-ui/popover'
import { Button } from '@urban-ui/button'

<MenuTrigger>
  <Button>Edit</Button>
  <Popover>
    <Menu>
      <MenuItem textValue="Copy">
        <MenuItemText slot="label">Copy</MenuItemText>
        <MenuItemText slot="description">Copy to clipboard</MenuItemText>
        <Keyboard>⌘C</Keyboard>
      </MenuItem>
      <MenuItem textValue="Paste">
        <MenuItemText slot="label">Paste</MenuItemText>
        <MenuItemText slot="description">Paste from clipboard</MenuItemText>
        <Keyboard>⌘V</Keyboard>
      </MenuItem>
    </Menu>
  </Popover>
</MenuTrigger>
```

### With Sections and Separators

```tsx
import { MenuTrigger, Menu, MenuItem, MenuSection, Header, Separator } from '@urban-ui/menu'
import { Popover } from '@urban-ui/popover'
import { Button } from '@urban-ui/button'

<MenuTrigger>
  <Button>File</Button>
  <Popover>
    <Menu>
      <MenuSection>
        <Header>Document</Header>
        <MenuItem>New</MenuItem>
        <MenuItem>Open</MenuItem>
      </MenuSection>
      <Separator />
      <MenuSection>
        <Header>Export</Header>
        <MenuItem>PDF</MenuItem>
        <MenuItem>Image</MenuItem>
      </MenuSection>
    </Menu>
  </Popover>
</MenuTrigger>
```

### With Selection

```tsx
import { MenuTrigger, Menu, MenuItem } from '@urban-ui/menu'
import { Popover } from '@urban-ui/popover'
import { Button } from '@urban-ui/button'
import { useState } from 'react'
import type { Selection } from 'react-aria-components'

function ViewMenu() {
  const [selected, setSelected] = useState<Selection>(new Set(['grid']))

  return (
    <MenuTrigger>
      <Button>View</Button>
      <Popover>
        <Menu
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <MenuItem id="list">List</MenuItem>
          <MenuItem id="grid">Grid</MenuItem>
          <MenuItem id="gallery">Gallery</MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}
```

### With Submenus

```tsx
import { MenuTrigger, SubmenuTrigger, Menu, MenuItem } from '@urban-ui/menu'
import { Popover } from '@urban-ui/popover'
import { Button } from '@urban-ui/button'

<MenuTrigger>
  <Button>Actions</Button>
  <Popover>
    <Menu>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <SubmenuTrigger>
        <MenuItem>Share</MenuItem>
        <Popover>
          <Menu>
            <MenuItem>Email</MenuItem>
            <MenuItem>Message</MenuItem>
            <MenuItem>AirDrop</MenuItem>
          </Menu>
        </Popover>
      </SubmenuTrigger>
    </Menu>
  </Popover>
</MenuTrigger>
```

### Dynamic Collection

```tsx
const actions = [
  { id: 'new', name: 'New File', shortcut: '⌘N' },
  { id: 'open', name: 'Open...', shortcut: '⌘O' },
  { id: 'save', name: 'Save', shortcut: '⌘S' },
]

<MenuTrigger>
  <Button>File</Button>
  <Popover>
    <Menu items={actions}>
      {(item) => (
        <MenuItem>
          {item.name}
          <Keyboard>{item.shortcut}</Keyboard>
        </MenuItem>
      )}
    </Menu>
  </Popover>
</MenuTrigger>
```

### With Variants and Tones

```tsx
import { MenuTrigger, Menu, MenuItem, Separator } from '@urban-ui/menu'
import { Popover } from '@urban-ui/popover'
import { Button } from '@urban-ui/button'

<MenuTrigger>
  <Button>Actions</Button>
  <Popover>
    <Menu>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <Separator />
      <MenuItem variant="success">Publish</MenuItem>
      <MenuItem variant="destructive">Delete</MenuItem>
    </Menu>
  </Popover>
</MenuTrigger>
```

### With Size (Large)

```tsx
import { MenuTrigger, Menu, MenuItem } from '@urban-ui/menu'
import { Popover } from '@urban-ui/popover'
import { Button } from '@urban-ui/button'

// Size is set on Menu and passed via context to children
<MenuTrigger>
  <Button>Touch Menu</Button>
  <Popover>
    <Menu size="lg">
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <MenuItem>Option 3</MenuItem>
    </Menu>
  </Popover>
</MenuTrigger>
```

---

## Component Breakdown

### MenuTrigger (Trigger Container)

Manages the open/close state of the menu and connects the trigger element to the popover.

**Key Props from React Aria:**
| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Controlled open state |
| `defaultOpen` | `boolean` | Uncontrolled default open state |
| `onOpenChange` | `(isOpen: boolean) => void` | Open state change callback |
| `trigger` | `'press' \| 'longPress'` | How the menu is triggered |

### Menu (Container)

The menu container managing items, selection, and keyboard navigation.

**Key Props from React Aria:**
| Prop | Type | Description |
|------|------|-------------|
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | Selection behavior |
| `selectedKeys` | `Iterable<Key> \| 'all'` | Controlled selection |
| `defaultSelectedKeys` | `Iterable<Key>` | Uncontrolled default |
| `onSelectionChange` | `(keys: Selection) => void` | Selection callback |
| `onAction` | `(key: Key) => void` | Action callback when item selected |
| `onClose` | `() => void` | Called when menu should close |
| `disabledKeys` | `Iterable<Key>` | Disabled item keys |
| `items` | `Iterable<T>` | Dynamic collection items |
| `aria-label` | `string` | Accessibility label |

**Custom Urban-UI Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'md' \| 'lg'` | `'md'` | Size for all menu items (passed via context) |
| `style` | `StyleXStyles` | - | Additional StyleX styles |

### MenuItem (Action/Option)

Individual menu item that can trigger an action or be selected.

**Key Props from React Aria:**
| Prop | Type | Description |
|------|------|-------------|
| `id` | `Key` | Unique identifier |
| `textValue` | `string` | Text for typeahead/accessibility |
| `isDisabled` | `boolean` | Disable interaction |
| `href` | `string` | Make item a link |
| `onAction` | `() => void` | Action handler |

**Custom Urban-UI Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'success'` | `'default'` | Visual variant for semantic meaning |
| `tone` | `Tone` | - | Explicit tone override (full palette supported) |
| `size` | `'md' \| 'lg'` | from context | Size override (usually inherited from Menu) |
| `style` | `StyleXStyles` | - | Additional StyleX styles |

**Render Props (from React Aria):**
| Prop | Type | Description |
|------|------|-------------|
| `isHovered` | `boolean` | Mouse over state |
| `isFocused` | `boolean` | Focused state |
| `isFocusVisible` | `boolean` | Keyboard focus |
| `isPressed` | `boolean` | Being pressed |
| `isSelected` | `boolean` | Currently selected |
| `isDisabled` | `boolean` | Cannot interact |
| `hasSubmenu` | `boolean` | Has nested submenu |
| `isOpen` | `boolean` | Submenu is open |

### MenuSection (Group)

Groups related items with an optional header. Can have independent selection.

**Key Props:**
| Prop | Type | Description |
|------|------|-------------|
| `id` | `Key` | Unique identifier |
| `items` | `Iterable<T>` | Dynamic section items |
| `selectionMode` | `SelectionMode` | Section-level selection |
| `selectedKeys` | `Iterable<Key>` | Section-level selected keys |
| `aria-label` | `string` | Required if no Header |

### Header (Section Label)

Visual label for a section. Used within MenuSection.

### Separator

Visual divider between items or sections.

### SubmenuTrigger (Nested Menu)

Wraps a MenuItem and Popover to create a nested submenu.

**Key Props:**
| Prop | Type | Description |
|------|------|-------------|
| `delay` | `number` | Hover delay before opening (default: 200ms) |

### Keyboard (Shortcut Display)

Displays a keyboard shortcut aligned to the right of a menu item.

### Text Slots

Semantic content slots within MenuItem:
- `slot="label"` - Primary text
- `slot="description"` - Secondary descriptive text

---

## Design Decisions

### 1. Context & Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Usage Context** | All contexts | Supports context menus (right-click), dropdown menus (button trigger), and action menus (toolbar buttons) |
| **Architecture** | Standalone | Exports Menu, MenuTrigger, MenuItem etc. directly as independent components |

### 2. Styling

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Variants** | `default`, `destructive`, `success` | Standard styling plus critical (delete) and positive (confirm) variants |
| **Tone Support** | Full tone palette | MenuItem accepts any tone (neutral, primary, accent, critical, positive, etc.) for maximum flexibility |
| **Sizes** | `md`, `lg` | Matches ListBox and Dropdown patterns. Size prop on Menu, passed via context to children |
| **Selection Indicator** | Checkmark icon | Checkmark for both single and multiple selection modes |
| **Submenu Indicator** | Chevron icon | Right-aligned chevron/arrow icon on items with submenus |

### 3. Composition

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Composition Patterns** | All patterns supported | Simple text, keyboard shortcuts, label+description slots, icons, and full composition |
| **Convenience Components** | `Keyboard` + `Separator` | Minimal additions - Keyboard shortcut display and divider. Use existing Text/Icon for other needs |

### 4. Features

**Full React Aria feature set** - Everything React Aria supports for Menu should be supported:

- [x] Action items (onAction)
- [x] Single selection (radio-style)
- [x] Multiple selection (checkbox-style)
- [x] Sections with headers
- [x] Section-level selection
- [x] Separators
- [x] Disabled items
- [x] Links (href items)
- [x] Keyboard shortcuts display
- [x] Submenus (included in initial implementation)
- [x] Long press trigger
- [x] Icons
- [x] Destructive/critical items
- [x] Empty state

**Keyboard Interactions (via React Aria):**

| Key | Action |
|-----|--------|
| Arrow Down/Up | Move focus |
| Arrow Right | Open submenu |
| Arrow Left | Close submenu, return to parent |
| Home/End | First/last item |
| Space/Enter | Activate item / Toggle selection |
| Escape | Close menu |
| Type characters | Typeahead search |

### 5. State Styling

**Visual States:** Match `@urban-ui/dropdown` patterns exactly.

| State | Data Attribute | Visual Treatment |
|-------|---------------|------------------|
| Default | - | Transparent background |
| Hovered | `[data-hovered]` | Subtle background |
| Focused | `[data-focused]` | Highlighted background |
| Focus Visible | `[data-focus-visible]` | Focus ring |
| Pressed | `[data-pressed]` | Darker background |
| Selected | `[data-selected]` | Accent solid background |
| Disabled | `[data-disabled]` | Muted, no pointer, reduced opacity |
| Has Submenu | `[data-has-submenu]` | Show chevron |
| Submenu Open | `[data-open]` | Highlight state |

**Combined States:** Follow DropdownItem patterns:
- Selected + Hovered → `accent.solidHover`
- Selected + Pressed → `accent.solidActive`
- Selected + Focused → `accent.solidActive`

### 6. Tokens & Location

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Theme Tokens** | Match Dropdown exactly | Use same tokens as DropdownItem for consistency across the design system |
| **Package Location** | `packages/interaction/menu/` | Interaction category alongside Select |

**Tokens (matching DropdownItem):**

```tsx
// Background states
base.transparent        // default background
tone.componentHover     // hovered/focused
tone.componentActive    // pressed
accent.solid            // selected background
accent.solidHover       // selected + hovered
accent.solidActive      // selected + pressed/focused

// Text colors
tone.fgHi              // primary text (label)
accent.fgOnBlock       // selected text

// Disabled
disabled.background
disabled.fg

// Spacing (matching Dropdown sizes)
space['100']           // padding, gaps
space['150']           // lg padding block
control.md             // md min height
control.lg             // lg min height
radii.md               // item border radius
```

---

## File Structure

```
packages/interaction/menu/
├── src/
│   ├── index.ts              # Public exports
│   ├── menu.tsx              # Menu container
│   ├── menu-trigger.tsx      # MenuTrigger
│   ├── menu-item.tsx         # MenuItem with tone/variant support
│   ├── menu-section.tsx      # MenuSection
│   ├── menu-header.tsx       # Section Header
│   ├── submenu-trigger.tsx   # SubmenuTrigger
│   ├── separator.tsx         # Separator
│   ├── keyboard.tsx          # Keyboard shortcut display
│   ├── menu-context.tsx      # Size context (like DropdownContext)
│   └── types.ts              # Shared types
├── llms.md                   # AI documentation
├── package.json
└── tsconfig.json
```

---

## Implementation Checklist

### Core Components
- [ ] Create `menu-context.tsx` - Size context provider (pattern from DropdownContext)
- [ ] Implement `menu-trigger.tsx` - Wrapper around React Aria MenuTrigger
- [ ] Implement `menu.tsx` - Menu container with size prop and context provider
- [ ] Implement `menu-item.tsx` - MenuItem with tone/variant props, matching DropdownItem styling
- [ ] Implement `menu-section.tsx` - MenuSection wrapper
- [ ] Implement `menu-header.tsx` - Section Header component
- [ ] Implement `submenu-trigger.tsx` - SubmenuTrigger wrapper
- [ ] Implement `separator.tsx` - Visual divider
- [ ] Implement `keyboard.tsx` - Keyboard shortcut display component

### Styling
- [ ] Create StyleX styles matching DropdownItem patterns
- [ ] Add size variants (md, lg) with context inheritance
- [ ] Add tone support (full palette)
- [ ] Add variant support (default, destructive, success)
- [ ] Style all visual states (hover, focus, pressed, selected, disabled)
- [ ] Style combined states (selected+hovered, etc.)
- [ ] Add submenu chevron indicator styling
- [ ] Add selection checkmark indicator

### Testing & Documentation
- [ ] Write tests for rendering and interactions
- [ ] Write type tests for prop types
- [ ] Create llms.md documentation
- [ ] Export from package index

---

## Notes

### Accessibility Considerations

- Interactive elements (buttons, links) inside menu items are NOT allowed - breaks keyboard navigation
- Use `textValue` on MenuItem when children are not plain text
- Sections without Header must have `aria-label`
- Menu should close after item activation (unless selection mode)
- Submenus should open on hover with a delay, and on arrow key

### Styling Considerations

- Use data attributes over render props for styling (better CSS performance)
- Combine states with CSS `:is()` selector for both pseudo-classes and data attributes
- Let parent theme context flow through - avoid hardcoding colors
- MenuItem styling should not impose layout on children (allow icons, shortcuts, custom content)
- Keyboard shortcuts should be right-aligned with muted color
- Submenu indicator (chevron) should be right-aligned
- Consider animation for popover appearance

### Relationship to Dropdown and ListBox

Menu, Dropdown, and ListBox share similar visual patterns but have different purposes:
- **ListBox**: Selection from a list of options (forms, settings) - uses `ListBoxItem`
- **Dropdown**: Styled ListBox items used by Select - uses `ListBoxItem` via `DropdownItem`
- **Menu**: Actions and commands (toolbars, context menus) - uses `MenuItem` from React Aria

**Key difference:** Menu uses React Aria's `MenuItem` (action-based) while Dropdown uses `ListBoxItem` (selection-based). However, the visual styling should be consistent:
- Match `DropdownItem` styling patterns exactly
- Use the same size context pattern (`MenuContext` like `DropdownContext`)
- Use the same tokens and state styling

Menu has additional concerns beyond Dropdown:
- Keyboard shortcuts display (`Keyboard` component)
- Submenus (`SubmenuTrigger`)
- Action callbacks (not just selection)
- Destructive/success variants with tone support
