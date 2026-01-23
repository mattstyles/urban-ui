# ListBox

Selection list component for displaying options. Built on React Aria's ListBox.

## Variants

ListBox has two variants that control how hover and focus states appear:

| Variant | Use |
|---------|-----|
| `inline` | Lists placed directly in the page (default) |
| `dialog` | Lists within dialogs (popovers, dropdowns, modals) |

**Always use `variant="dialog"` when the ListBox is rendered inside a dialog context.** This ensures correct focus indication for keyboard navigation within dialogs.

## Examples

```tsx
import { ListBox, ListBoxItem } from '@urban-ui/listbox'

// Inline list on page
<ListBox aria-label="Options" selectionMode="single">
  <ListBoxItem id="a">Option A</ListBoxItem>
  <ListBoxItem id="b">Option B</ListBoxItem>
</ListBox>

// Within a popover/dropdown
<Popover>
  <ListBox aria-label="Options" selectionMode="single" variant="dialog">
    <ListBoxItem id="a">Option A</ListBoxItem>
    <ListBoxItem id="b">Option B</ListBoxItem>
  </ListBox>
</Popover>
```

## Sections and Headers

```tsx
<ListBox aria-label="Permissions" selectionMode="single">
  <ListBoxSection>
    <ListBoxHeader>Read Access</ListBoxHeader>
    <ListBoxItem id="viewer">Viewer</ListBoxItem>
    <ListBoxItem id="reader">Reader</ListBoxItem>
  </ListBoxSection>
  <ListBoxSection>
    <ListBoxHeader>Write Access</ListBoxHeader>
    <ListBoxItem id="editor">Editor</ListBoxItem>
    <ListBoxItem id="admin">Admin</ListBoxItem>
  </ListBoxSection>
</ListBox>
```
