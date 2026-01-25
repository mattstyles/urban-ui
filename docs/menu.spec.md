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

## Questions for Implementation

### 1. Context Questions

**Q1.1: What context will this menu be used in?**
- [ ] Context menus (right-click)
- [ ] Dropdown menus (button trigger)
- [ ] Action menus (toolbar buttons)
- [ ] All of the above

> Menus are always in a popup/overlay context, but trigger behavior may vary.

**Q1.2: Is this a standalone component or part of a composite?**
- [ ] Standalone (exports Menu, MenuTrigger, etc. directly)
- [ ] Part of a larger menu system with shared styling
- [ ] Utility for other composites (Select, ComboBox use similar patterns)

### 2. Styling Questions

**Q2.1: What visual variants are needed for MenuItem?**

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Standard item styling | General use |
| `destructive` | Red/critical styling | Delete actions |

**Q2.2: What tone support is needed?**
- [ ] Uses parent theme context (tone.* tokens)
- [ ] MenuItem accepts explicit tone prop (for destructive items)
- [ ] Fixed neutral tone

**Q2.3: What size variants are needed?**

| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| `sm` | Compact | Small | Dense menus |
| `md` | Standard | Base | Default |

**Q2.4: How should selection be indicated?**
- [ ] Checkmark icon (single selection)
- [ ] Checkbox icon (multiple selection)
- [ ] Background color change
- [ ] Configurable per instance

**Q2.5: How should submenus be indicated?**
- [ ] Chevron/arrow icon on right
- [ ] No indicator (rely on hover behavior)

### 3. Composition Questions

**Q3.1: What child composition patterns are needed for MenuItem?**

```tsx
// Simple - text only
<MenuItem>Label</MenuItem>

// With keyboard shortcut
<MenuItem>
  Save
  <Keyboard>⌘S</Keyboard>
</MenuItem>

// Slotted - label + description
<MenuItem>
  <Text slot="label">Export</Text>
  <Text slot="description">Save as PDF</Text>
</MenuItem>

// With icon
<MenuItem>
  <Icon><Trash /></Icon>
  Delete
</MenuItem>

// Full composition
<MenuItem>
  <Icon><Share /></Icon>
  <MenuItemContent>
    <MenuItemText slot="label">Share</MenuItemText>
    <MenuItemText slot="description">Send to others</MenuItemText>
  </MenuItemContent>
  <Keyboard>⌘⇧S</Keyboard>
</MenuItem>
```

- [ ] Support all patterns
- [ ] Needs layout helpers for consistent spacing

**Q3.2: Should there be convenience sub-components?**
- [ ] `MenuItemContent` - Layout wrapper for icon + text + shortcut
- [ ] `MenuItemText` - Pre-configured Text with slots
- [ ] `MenuItemIcon` - Icon positioning helper
- [ ] `Keyboard` - Styled keyboard shortcut display
- [ ] `Separator` - Styled divider (or re-export from React Aria)

### 4. Feature Questions

**Q4.1: What features are required?**
- [ ] Action items (onAction)
- [ ] Single selection (radio-style)
- [ ] Multiple selection (checkbox-style)
- [ ] Sections with headers
- [ ] Section-level selection
- [ ] Separators
- [ ] Disabled items
- [ ] Links (href items)
- [ ] Keyboard shortcuts display
- [ ] Submenus
- [ ] Long press trigger
- [ ] Icons
- [ ] Destructive/critical items
- [ ] Empty state

**Q4.2: What keyboard interactions must work?**
| Key | Action |
|-----|--------|
| Arrow Down/Up | Move focus |
| Arrow Right | Open submenu |
| Arrow Left | Close submenu, return to parent |
| Home/End | First/last item |
| Space/Enter | Activate item / Toggle selection |
| Escape | Close menu |
| Type characters | Typeahead search |

### 5. State Questions

**Q5.1: What visual states need styling?**

| State | Data Attribute | Visual Treatment |
|-------|---------------|------------------|
| Default | - | Transparent background |
| Hovered | `[data-hovered]` | Subtle background |
| Focused | `[data-focused]` | - |
| Focus Visible | `[data-focus-visible]` | Focus ring |
| Pressed | `[data-pressed]` | Darker background |
| Selected | `[data-selected]` | Checkmark + background |
| Disabled | `[data-disabled]` | Muted, no pointer |
| Has Submenu | `[data-has-submenu]` | Show chevron |
| Submenu Open | `[data-open]` | Highlight state |

**Q5.2: How should combined states render?**
- Selected + Hovered
- Selected + Disabled
- Has Submenu + Hovered
- Has Submenu + Open

### 6. Token Questions

**Q6.1: What theme tokens will be used?**

```tsx
// Background states
base.transparent        // default background
tone.componentHover     // hovered
tone.componentActive    // pressed
tone.component          // selected background (subtle)

// Text colors
tone.fgHi              // primary text (label)
tone.fgLo              // secondary text (description, shortcuts)

// Disabled
disabled.background
disabled.fg

// Focus
focusVars.*            // focus ring

// Destructive variant
critical.fgHi          // destructive text
critical.componentHover // destructive hover

// Separator
tone.borderMuted       // separator line

// Section header
tone.fgLo              // muted header text
```

**Q6.2: What spacing tokens are needed?**

```tsx
space['100']   // gap between icon and text
space['150']   // item padding block
space['200']   // item padding inline
space['050']   // separator margin block
radii.md       // menu border radius
radii.sm       // item border radius
```

---

## File Structure

```
packages/interaction/menu/
├── src/
│   ├── index.ts              # Public exports
│   ├── menu.tsx              # Menu container
│   ├── menu-trigger.tsx      # MenuTrigger
│   ├── menu-item.tsx         # MenuItem
│   ├── menu-section.tsx      # MenuSection + Header
│   ├── submenu-trigger.tsx   # SubmenuTrigger
│   ├── separator.tsx         # Separator
│   ├── keyboard.tsx          # Keyboard shortcut display
│   ├── menu-item-content.tsx # Layout helper (optional)
│   ├── menu-item-text.tsx    # Text helper (optional)
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
- [ ] Implement MenuTrigger wrapper
- [ ] Implement Menu container with styling
- [ ] Implement MenuItem with state-based styling
- [ ] Implement MenuSection and Header
- [ ] Implement Separator
- [ ] Implement SubmenuTrigger
- [ ] Implement Keyboard shortcut component
- [ ] Add convenience components if needed
- [ ] Handle destructive variant styling
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

### Relationship to ListBox

Menu and ListBox share similar patterns but have different purposes:
- **ListBox**: Selection from a list of options (forms, settings)
- **Menu**: Actions and commands (toolbars, context menus)

They may share styling for items but Menu has additional concerns:
- Keyboard shortcuts
- Submenus
- Action callbacks (not just selection)
- Destructive actions
