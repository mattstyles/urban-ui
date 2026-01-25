# @urban-ui/menu

Menu component for displaying a list of actions or options. Supports action items, single/multiple selection, sections, separators, keyboard shortcuts, and nested submenus.

## Installation

```bash
bun add @urban-ui/menu
```

## Quick Start

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

## Components

### MenuTrigger

Manages open/close state and connects the trigger to the popover.

```tsx
<MenuTrigger>
  <Button>Open Menu</Button>
  <Popover>
    <Menu>{/* items */}</Menu>
  </Popover>
</MenuTrigger>
```

**Props:**
- `isOpen?: boolean` - Controlled open state
- `defaultOpen?: boolean` - Uncontrolled default
- `onOpenChange?: (isOpen: boolean) => void` - Open state callback
- `trigger?: 'press' | 'longPress'` - How menu is triggered

### Menu

Container for menu items with selection support.

```tsx
<Menu size="md" selectionMode="single" onAction={(key) => console.log(key)}>
  <MenuItem id="edit">Edit</MenuItem>
</Menu>
```

**Props:**
- `size?: 'md' | 'lg'` - Size for all items (default: 'md')
- `selectionMode?: 'none' | 'single' | 'multiple'` - Selection behavior
- `selectedKeys?: Iterable<Key>` - Controlled selection
- `onSelectionChange?: (keys: Selection) => void` - Selection callback
- `onAction?: (key: Key) => void` - Action callback
- `disabledKeys?: Iterable<Key>` - Disabled items
- `items?: Iterable<T>` - Dynamic collection items
- `style?: StyleXStyles` - Additional styles

### MenuItem

Individual menu item that can trigger an action or be selected.

```tsx
// Simple
<MenuItem>Edit</MenuItem>

// With keyboard shortcut
<MenuItem textValue="Save">
  Save
  <Keyboard>⌘S</Keyboard>
</MenuItem>

// Destructive
<MenuItem variant="destructive">Delete</MenuItem>
```

**Props:**
- `variant?: 'default' | 'destructive' | 'success'` - Visual variant
- `size?: 'md' | 'lg'` - Size override (usually inherited)
- `id?: Key` - Unique identifier
- `textValue?: string` - Text for typeahead/accessibility
- `isDisabled?: boolean` - Disable interaction
- `href?: string` - Make item a link
- `onAction?: () => void` - Action handler
- `style?: StyleXStyles` - Additional styles

### MenuSection & MenuHeader

Group related items with an optional header.

```tsx
<MenuSection>
  <MenuHeader>Actions</MenuHeader>
  <MenuItem>Edit</MenuItem>
  <MenuItem>Delete</MenuItem>
</MenuSection>
```

### Separator

Visual divider between items or sections.

```tsx
<Menu>
  <MenuItem>Cut</MenuItem>
  <Separator />
  <MenuItem>Paste</MenuItem>
</Menu>
```

### Keyboard

Display keyboard shortcuts.

```tsx
<MenuItem textValue="Copy">
  Copy
  <Keyboard>⌘C</Keyboard>
</MenuItem>
```

### SubmenuTrigger

Create nested submenus.

```tsx
<SubmenuTrigger>
  <MenuItem>Share</MenuItem>
  <Popover>
    <Menu>
      <MenuItem>Email</MenuItem>
      <MenuItem>Message</MenuItem>
    </Menu>
  </Popover>
</SubmenuTrigger>
```

## Common Patterns

### Selection Menu

```tsx
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
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}
```

### With Variants

```tsx
<Menu>
  <MenuItem>Edit</MenuItem>
  <MenuItem>Duplicate</MenuItem>
  <Separator />
  <MenuItem variant="success">Publish</MenuItem>
  <MenuItem variant="destructive">Delete</MenuItem>
</Menu>
```

### Large Size

```tsx
<Menu size="lg">
  <MenuItem>Option 1</MenuItem>
  <MenuItem>Option 2</MenuItem>
</Menu>
```

## Keyboard Interactions

| Key | Action |
|-----|--------|
| Arrow Down/Up | Move focus |
| Arrow Right | Open submenu |
| Arrow Left | Close submenu |
| Home/End | First/last item |
| Space/Enter | Activate item |
| Escape | Close menu |
| Type characters | Typeahead search |

## Accessibility

- Use `textValue` on MenuItem when children are not plain text
- Sections without MenuHeader must have `aria-label`
- Interactive elements inside menu items break keyboard navigation
