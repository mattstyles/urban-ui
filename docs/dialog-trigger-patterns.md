


## Definitions

### Inline
- Selection behaviours applied inline
- The state behaviours below are applied
- Exact logic differs slightly from in-dialog

### In-dialog
- Selection behaviours applied within a popover
- Always requires some interaction (via a triggering component, a trigger) to initiate the popovers, hence behaviours differ slightly from inline
- The state behaviours below are applied
- Exact logic differs slightly from inline due to interactive launching

### Modal dialog
- This is a pattern definition
- Blocks page interaction, typically outside click will dismiss

### Non-modal dialog
- This is a pattern definition
- Does not block page interaction, needs to be explicitly closed

### Dialog selection pattern
- Code pattern for a DialogTrigger + Popover with content, specifically for selections

### Variant
- Refers to a variant of another component, usually behaviours are inheritted but styling is changed.
- Additional properties/behaviours _could_ be specific to a variant

### Selection state behaviours
- base
- focus-visible
- hovered
- pressed/active
- selected
- selected + focus-visible
- selected + hovered
- selected + pressed/active
- disable

Selection state behaviours differ inline (i.e. in the page, initially visible) versus in-dialog (i.e. require interaction to initiate, not initially visible)

(similar visual conditions to ToggleButton, as these models the same things)


## Component patterns

### Popover
- Positioning
- Has background and border styling, mostly to be able to conditionally render a similar arrow
- Specified in a style, and can be overwritten for different styling

### AriaListBox
- ListBox and ListBoxItem from react-aria-components
- This is the primitive (unstyled) we use to create listboxes and dropdowns (which are identical, they are styled variants of AriaListBox)
- Handles keyboard interaction
- Can be inline or in-dialog, react-aria-components handles the semantic and visual differences between the two modes

### Dialog pattern
- Composes a pattern for applying a Popover to position and show/hide content either modally or non-modally
- For complete customisation of the styling pattern
- Used for complex selection criteria
- Composition of DialogTrigger [Trigger component, Popover -> ListBox -> ListBoxItem]

### Tooltip pattern
- Similar composition to dialog pattern
- Composition of TooltipTrigger [Trigger component, Tooltip]
- Does not use Popover under the hood, but very similar pattern
- We do not really support tooltips, but they are used rarely

### ListBox
- Inline selection pattern
- Models visuals for selection state behaviours
- Semantics provided by AriaListBox and AriaListBoxItem (adds styling)
- ListBox is a layout container (adds only styling) - composes AriaListBox with some styling
- - Adds only styling to AriaListBox
- ListBoxItemPrimitive (unstyled) applies a convenience to handle string children only - composes the AriaListBoxItem as the true primitive
- - Adds an additional behaviour to AriaListBoxItem to handle the typical use-case of a child which is a string (this is a convenience)
- ListBoxItem applies opinionated state behaviour styling (exact logic for state behaviour application differs inline versus in-dialog)
- ListBoxItem-X are variants of ListBoxItem
- ListBoxItemSection ??

### Dropdown
- Dialog selection pattern
- Models visuals for selection state behaviours (exact logic for when these styles appear differ from inline listbox)
- Semantics provided by AriaListBox and AriaListBoxItem (adds styling)
- Expects to be placed within a Popover
- Dropdown is a layout container - this is a variant of ListBox (using the underlying primitive of AriaListBox specifically as ListBox adds only styling)
- - Only adds styling to AriaListBox
- DropdownItemPrimitive (unstyled) applies a convenience to handle string children only
- - Adds an additional behaviour to AriaListBoxItem to handle the typical use-case of a child which is a string (this is a convenience)
- DropdownItem applies opinionated state behaviour styling (exact logic for state behaviour application differs inline versus in-dialog)
- DropdownItem-X are variants of DropdownItem
- DropdownItmeSection ??

### Select
- Composes dialog selection pattern
- Composes dropdown for styling (consistency)
- Creates a variant of Dropdown and DropdownItem

### Menu
- Composes dialog selection pattern
- Composes dropdown for styling (consistency)
- Creates a variant of Dropdown and DropdownItem

### ChoiceList
- Variants of ListBox and ListBoxItem

### Alerts
- e.g. Toasts
- e.g. Toast variants like highlights
- Typically anchored to the screen
- Used for feedback, could be interactive (how to handle keyboard interaction?)


## Relation to modals

### Modal
- Modal dialog - in-dialog and modal
- Usually has a background for prominence

### Drawer
- in-dialog and non-modal
- Usually also preserved across most page movements

### Fullscreen modal
- in-dialog and modal
- Variant of a modal (positioning)

### Wizard
- in-dialog and modal
- Variant of a fullscreen modal with >1 number of 'pages'/screens

### Flow
- in-dialog and modal
- Variant of Modal with >1 number of 'pages'/screens

### Modal stacking context
- Defines indices/ordering for contents (which are typically modals)

### Modal stack
- Visual representation for modal dialogs
- Looks like a stack of modals

### Dialog / Window (?)
- in-dialog and non-modal
- can usually be dragged around the page

## Customisation steps

Dropdown and listbox are synonymous implementations of the AriaListBox pattern.

```jsx
<Listbox aria-label="Select an option" selectionMode='single'> -> padding, colour, shape, border, gap
  <ListboxItem id="option1">Option 1</ListboxItem> -> colour, shape, 
  <ListboxItem id="option2">Option 2</ListboxItem>
  <ListboxItem id="option3">Option 3</ListboxItem>
</Listbox>
```

To customise it is generally best to work from the underlying AriaListBox unstyled primitives, using ListBox as a template, however, if you want a 'standard' styled listbox with custom content then ListBoxItem accepts any slotted content (a string, as above, can be supplied and will be styled as a convenience around manually calling styling the item contents).

```js
const styles = stylex.create({
  item: {
    padding: space[150]
  }
})

// with custom content but standard visual behaviours (background colour and shape)
<Listbox aria-label="Select an option" selectionMode="single">
  <ListboxItem id="option1">
    <Flex
      direction="row"
      gap="100"
      align="center"
      style={styles.customItem}
    >
      <Icon size="md">
        <CirclePlus />
      </Icon>
      <Text size="md" slot="label">
        Add
      </Text>
    </Flex>
  </ListboxItem>
  <ListboxItem id="option2">Option 2</ListboxItem>
  <ListboxItem id="option3">Option 3</ListboxItem>
</Listbox>
```

Full customisation requires a bit more effort to add styling to the primitives.
@see apps/tanstack/src/routes/patterns/listbox/listbox/-customListBox.tsx.

## Inheritance and reuse

### Popover

* Edge padding 
* Background colour
* Border

### Listbox

####