# @urban-ui/menu

Menu component for displaying a list of actions or options. Built on React Aria with urban-ui styling. Supports action items, single/multiple selection, sections, separators, keyboard shortcuts, links, and nested submenus.

## Installation

```bash
bun add @urban-ui/menu
```

## Quick Start

```tsx
import { MenuTrigger, Menu, MenuItem, Separator, Keyboard } from '@urban-ui/menu'
import { Button } from '@urban-ui/button'
import { Text } from 'react-aria-components'
import { Pencil, Copy, Trash } from 'lucide-react'

<MenuTrigger>
  <Button>Actions</Button>
  <Menu>
    <MenuItem onAction={() => console.log('edit')}>
      <Pencil size={16} />
      <Text slot="label">Edit</Text>
      <Keyboard>⌘E</Keyboard>
    </MenuItem>
    <MenuItem onAction={() => console.log('copy')}>
      <Copy size={16} />
      <Text slot="label">Copy</Text>
      <Keyboard>⌘C</Keyboard>
    </MenuItem>
    <Separator />
    <MenuItem onAction={() => console.log('delete')} variant="destructive">
      <Trash size={16} />
      <Text slot="label">Delete</Text>
      <Keyboard>⌘⌫</Keyboard>
    </MenuItem>
  </Menu>
</MenuTrigger>
```

## Components

### MenuTrigger

Manages open/close state and wraps the Menu in a Popover automatically. The Popover is positioned below the trigger.

```tsx
<MenuTrigger>
  <Button>Open Menu</Button>
  <Menu>{/* items */}</Menu>
</MenuTrigger>
```

**Props:**
- `isOpen?: boolean` - Controlled open state
- `defaultOpen?: boolean` - Uncontrolled default
- `onOpenChange?: (isOpen: boolean) => void` - Open state callback
- `trigger?: 'press' | 'longPress'` - How menu is triggered
- `popoverStyle?: StyleXStyles` - Additional styles for the popover

### Menu

Container for menu items. Handles selection and keyboard navigation. Place directly inside MenuTrigger or SubmenuTrigger (they wrap it in a Popover automatically).

```tsx
// Static collection
<Menu onAction={(key) => console.log(key)}>
  <MenuItem id="edit">Edit</MenuItem>
  <MenuItem id="delete">Delete</MenuItem>
</Menu>

// Dynamic collection
<Menu items={items}>
  {(item) => <MenuItem>{item.name}</MenuItem>}
</Menu>
```

**Props:**
- `size?: 'md' | 'lg'` - Size for all items (default: 'md')
- `selectionMode?: 'none' | 'single' | 'multiple'` - Selection behavior
- `selectedKeys?: Iterable<Key>` - Controlled selection
- `defaultSelectedKeys?: Iterable<Key>` - Uncontrolled default selection
- `onSelectionChange?: (keys: Selection) => void` - Selection callback
- `onAction?: (key: Key) => void` - Action callback
- `disabledKeys?: Iterable<Key>` - Disabled items
- `items?: Iterable<T>` - Dynamic collection items
- `style?: StyleXStyles` - Additional styles for the menu

### MenuItem

Individual menu item that can trigger an action or be selected.

```tsx
import { Text } from 'react-aria-components'

// Simple text
<MenuItem>Edit</MenuItem>

// With icon and keyboard shortcut
<MenuItem textValue="Save">
  <SaveIcon />
  <Text slot="label">Save</Text>
  <Keyboard>⌘S</Keyboard>
</MenuItem>

// With description
<MenuItem textValue="Copy">
  <Text slot="label">Copy</Text>
  <Text slot="description">Copy the selected text</Text>
  <Keyboard>⌘C</Keyboard>
</MenuItem>

// Destructive action
<MenuItem variant="destructive">Delete</MenuItem>
```

**Props:**
- `variant?: 'default' | 'destructive' | 'success'` - Visual variant
- `size?: 'md' | 'lg'` - Size override (usually inherited)
- `id?: Key` - Unique identifier
- `textValue?: string` - Text for typeahead/accessibility
- `isDisabled?: boolean` - Disable interaction
- `href?: string` - Make item a link
- `target?: string` - Link target (e.g., '_blank')
- `onAction?: () => void` - Action handler
- `style?: StyleXStyles` - Additional styles

### MenuSection

Groups related items with an optional header.

```tsx
import { Header } from 'react-aria-components'

<Menu>
  <MenuSection>
    <Header>Export</Header>
    <MenuItem>Image…</MenuItem>
    <MenuItem>Video…</MenuItem>
  </MenuSection>
  <Separator />
  <MenuSection selectionMode="multiple" defaultSelectedKeys={['files']}>
    <MenuItem id="files">Show files</MenuItem>
    <MenuItem id="folders">Show folders</MenuItem>
  </MenuSection>
</Menu>
```

**Props:**
- `selectionMode?: 'none' | 'single' | 'multiple'` - Section-level selection
- `selectedKeys?: Iterable<Key>` - Controlled selection for this section
- `defaultSelectedKeys?: Iterable<Key>` - Default selection
- `onSelectionChange?: (keys: Selection) => void` - Selection callback

### MenuHeader

Styled header for menu sections (alternative to `Header` from react-aria-components).

```tsx
<MenuSection>
  <MenuHeader>Actions</MenuHeader>
  <MenuItem>Edit</MenuItem>
</MenuSection>
```

### Separator

Visual divider between items or sections.

```tsx
<Menu>
  <MenuItem>New…</MenuItem>
  <MenuItem>Open…</MenuItem>
  <Separator />
  <MenuItem>Save</MenuItem>
</Menu>
```

### Keyboard

Display keyboard shortcuts aligned to the right of menu items.

```tsx
<MenuItem textValue="Copy">
  <Text slot="label">Copy</Text>
  <Keyboard>⌘C</Keyboard>
</MenuItem>
```

### SubmenuTrigger

Create nested submenus. Wraps the Menu in a Popover automatically, positioned to the side.

```tsx
<SubmenuTrigger>
  <MenuItem>
    <Share size={16} />
    <Text slot="label">Share</Text>
  </MenuItem>
  <Menu>
    <MenuItem>
      <Mail size={16} />
      <Text slot="label">Email</Text>
    </MenuItem>
    <MenuItem>
      <Smartphone size={16} />
      <Text slot="label">SMS</Text>
    </MenuItem>
  </Menu>
</SubmenuTrigger>
```

**Props:**
- `delay?: number` - Delay in ms before submenu appears on hover (default: 200)
- `popoverStyle?: StyleXStyles` - Additional styles for the popover

## Complete Example

```tsx
import { MenuTrigger, Menu, MenuItem, MenuSection, Separator, Keyboard, SubmenuTrigger } from '@urban-ui/menu'
import { Button } from '@urban-ui/button'
import { Text, Header } from 'react-aria-components'
import { Ellipsis, FolderOpen, Pencil, Copy, Trash, Share, Mail, Smartphone, Instagram } from 'lucide-react'

<MenuTrigger>
  <Button aria-label="Actions">
    <Ellipsis size={18} />
  </Button>
  <Menu>
    <MenuSection>
      <MenuItem onAction={() => alert('open')}>
        <FolderOpen size={16} />
        <Text slot="label">Open</Text>
        <Keyboard>⌘O</Keyboard>
      </MenuItem>
      <MenuItem onAction={() => alert('rename')}>
        <Pencil size={16} />
        <Text slot="label">Rename…</Text>
        <Keyboard>⌘R</Keyboard>
      </MenuItem>
      <MenuItem onAction={() => alert('duplicate')}>
        <Copy size={16} />
        <Text slot="label">Duplicate</Text>
        <Keyboard>⌘D</Keyboard>
      </MenuItem>
      <MenuItem onAction={() => alert('delete')} variant="destructive">
        <Trash size={16} />
        <Text slot="label">Delete…</Text>
        <Keyboard>⌘⌫</Keyboard>
      </MenuItem>
      <SubmenuTrigger>
        <MenuItem>
          <Share size={16} />
          <Text slot="label">Share</Text>
        </MenuItem>
        <Menu>
          <MenuItem>
            <Mail size={16} />
            <Text slot="label">Email</Text>
          </MenuItem>
          <MenuItem>
            <Smartphone size={16} />
            <Text slot="label">SMS</Text>
          </MenuItem>
          <MenuItem>
            <Instagram size={16} />
            <Text slot="label">Instagram</Text>
          </MenuItem>
        </Menu>
      </SubmenuTrigger>
    </MenuSection>
    <Separator />
    <MenuSection selectionMode="multiple" defaultSelectedKeys={['files']}>
      <MenuItem id="files">Show files</MenuItem>
      <MenuItem id="folders">Show folders</MenuItem>
    </MenuSection>
  </Menu>
</MenuTrigger>
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
      <Menu
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <MenuItem id="list">List View</MenuItem>
        <MenuItem id="grid">Grid View</MenuItem>
        <MenuItem id="gallery">Gallery View</MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
```

### Links

```tsx
<MenuTrigger>
  <Button>Resources</Button>
  <Menu>
    <MenuItem href="https://react-spectrum.adobe.com/react-aria/" target="_blank">
      React Aria Docs
    </MenuItem>
    <MenuItem href="https://stylexjs.com/" target="_blank">
      StyleX Docs
    </MenuItem>
  </Menu>
</MenuTrigger>
```

### With Variants

```tsx
<MenuTrigger>
  <Button>Actions</Button>
  <Menu>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <Separator />
    <MenuItem variant="success">Publish</MenuItem>
    <MenuItem variant="destructive">Delete</MenuItem>
  </Menu>
</MenuTrigger>
```

### Long Press Trigger

```tsx
<MenuTrigger trigger="longPress">
  <Button onPress={() => console.log('Primary action')}>Crop</Button>
  <Menu>
    <MenuItem>Rotate</MenuItem>
    <MenuItem>Slice</MenuItem>
  </Menu>
</MenuTrigger>
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
- Sections without a header must have `aria-label`
- Interactive elements (buttons, links) inside menu items break keyboard navigation - only add text or decorative content as children
