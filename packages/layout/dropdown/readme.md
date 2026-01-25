# @urban-ui/dropdown

A dropdown list component for use within dialogs, popovers, and menus. Built on React Aria's ListBox.

## Overview

Dropdown is a specialized list component designed for use **inside dialogs** such as Select popovers, Menu overlays, and modals. For lists that appear directly in the page, use [ListBox](../../layout/listbox) instead.

## Dropdown vs ListBox

| Feature | Dropdown | ListBox |
|---------|----------|---------|
| **Placement** | Inside dialogs (popovers, menus, modals) | Inline in the page |
| **Focus styling** | Uses `data-focused` (mouse + keyboard) | Uses `data-focus-visible` (keyboard only) |
| **Hover styling** | Highlight via focus state | Standard hover state |
| **Drag and drop** | Not supported | Supported |
| **Grid layout** | Not supported | Supported |

### When to use Dropdown

- Select component options
- Menu items
- Autocomplete/combobox suggestions
- Any list appearing in a floating overlay

### When to use ListBox

- Inline selection lists in the page
- File browsers or explorers
- Drag-and-drop reorderable lists
- Grid-based selection (e.g., color picker, icon picker)

## Installation

```bash
bun add @urban-ui/dropdown
```

## Usage

```tsx
import { Dropdown, DropdownItem, DropdownSection, DropdownHeader } from '@urban-ui/dropdown'

// Basic usage
<Dropdown aria-label="Options" selectionMode="single">
  <DropdownItem id="edit">Edit</DropdownItem>
  <DropdownItem id="delete">Delete</DropdownItem>
</Dropdown>

// With sections
<Dropdown aria-label="Actions">
  <DropdownSection>
    <DropdownHeader>File</DropdownHeader>
    <DropdownItem id="new">New</DropdownItem>
    <DropdownItem id="open">Open</DropdownItem>
  </DropdownSection>
  <DropdownSection>
    <DropdownHeader>Edit</DropdownHeader>
    <DropdownItem id="cut">Cut</DropdownItem>
    <DropdownItem id="copy">Copy</DropdownItem>
  </DropdownSection>
</Dropdown>
```

## Props

### Dropdown

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'md' \| 'lg'` | `'md'` | Size variant affecting item padding and text size |
| `style` | `StyleXStyles` | - | Additional styles to apply |

Plus all props from React Aria's `ListBox`.

### DropdownItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'md' \| 'lg'` | `'md'` | Size variant (inherits from Dropdown) |
| `style` | `StyleXStyles` | - | Additional styles to apply |

Plus all props from React Aria's `ListBoxItem`.

### DropdownSection

Groups related items with an optional header.

### DropdownHeader

Visual label for a section.

## Accessibility

- Full keyboard navigation via React Aria
- ARIA listbox pattern
- Focus management optimized for overlay contexts
