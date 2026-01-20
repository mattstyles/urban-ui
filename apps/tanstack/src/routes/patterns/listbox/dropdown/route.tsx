import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import {
  DropdownListBox,
  DropdownListBoxItemText,
} from '@urban-ui/listbox'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { ListBoxItem } from 'react-aria-components'

export const Route = createFileRoute('/patterns/listbox/dropdown/')({
  component: DropdownListBoxPatterns,
})

const styles = stylex.create({
  page: {
    padding: space[600],
  },
  container: {
    padding: space[300],
    backgroundColor: base.white,
    color: tone.fgHi,
    borderRadius: radii.md,
  },
  listbox: {
    maxWidth: 300,
    maxHeight: 300,
    backgroundColor: tone.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
  },
  item: {
    padding: space[100],
    paddingLeft: space[150],
    paddingRight: space[150],
    borderRadius: radii.sm,
    cursor: 'pointer',
    outline: 'none',
  },
  itemFocused: {
    backgroundColor: {
      default: null,
      ':focus': tone.surfaceMuted,
      ':hover': tone.surfaceMuted,
    },
  },
  itemSelected: {
    backgroundColor: tone.solid,
    color: tone.fgOnBlock,
  },
})

const itemStyles = stylex.create({
  base: {
    padding: space[100],
    paddingLeft: space[150],
    paddingRight: space[150],
    borderRadius: radii.sm,
    cursor: 'pointer',
    outline: 'none',
  },
})

function StyledListBoxItem({
  children,
  ...props
}: React.ComponentProps<typeof ListBoxItem>) {
  return (
    <ListBoxItem
      {...props}
      {...stylex.props(itemStyles.base)}
      className={({ isFocused, isSelected }) =>
        stylex.props(
          isFocused && styles.itemFocused,
          isSelected && styles.itemSelected,
        ).className ?? ''
      }
    >
      {children}
    </ListBoxItem>
  )
}

function DropdownListBoxPatterns() {
  return (
    <Flex direction="column" gap="400" style={styles.page}>
      <Text size="xxl" weight="bold">
        Dropdown ListBox Patterns
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Text size="sm" color="lo">
          Simple listbox with text items.
        </Text>
        <DropdownListBox
          aria-label="Select an option"
          selectionMode="single"
          style={styles.listbox}
        >
          <StyledListBoxItem id="option1">Option 1</StyledListBoxItem>
          <StyledListBoxItem id="option2">Option 2</StyledListBoxItem>
          <StyledListBoxItem id="option3">Option 3</StyledListBoxItem>
        </DropdownListBox>
      </Flex>

      {/* With Label and Description */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Label and Description
        </Text>
        <Text size="sm" color="lo">
          Using DropdownListBoxItemText for structured content.
        </Text>
        <DropdownListBox
          aria-label="Select a permission"
          selectionMode="single"
          style={styles.listbox}
        >
          <StyledListBoxItem id="read" textValue="Read">
            <DropdownListBoxItemText slot="label">
              Read
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              View content only
            </DropdownListBoxItemText>
          </StyledListBoxItem>
          <StyledListBoxItem id="write" textValue="Write">
            <DropdownListBoxItemText slot="label">
              Write
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Create and edit content
            </DropdownListBoxItemText>
          </StyledListBoxItem>
          <StyledListBoxItem id="admin" textValue="Admin">
            <DropdownListBoxItemText slot="label">
              Admin
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Full access to all features
            </DropdownListBoxItemText>
          </StyledListBoxItem>
        </DropdownListBox>
      </Flex>

      {/* Multiple Selection */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Multiple Selection
        </Text>
        <Text size="sm" color="lo">
          Allow selecting multiple items.
        </Text>
        <DropdownListBox
          aria-label="Select toppings"
          selectionMode="multiple"
          style={styles.listbox}
        >
          <StyledListBoxItem id="cheese">Cheese</StyledListBoxItem>
          <StyledListBoxItem id="pepperoni">Pepperoni</StyledListBoxItem>
          <StyledListBoxItem id="mushrooms">Mushrooms</StyledListBoxItem>
          <StyledListBoxItem id="olives">Olives</StyledListBoxItem>
          <StyledListBoxItem id="onions">Onions</StyledListBoxItem>
        </DropdownListBox>
      </Flex>

      {/* Disabled Items */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Disabled Items
        </Text>
        <Text size="sm" color="lo">
          Some items can be disabled.
        </Text>
        <DropdownListBox
          aria-label="Select a plan"
          selectionMode="single"
          style={styles.listbox}
        >
          <StyledListBoxItem id="free" textValue="Free">
            <DropdownListBoxItemText slot="label">
              Free
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Basic features
            </DropdownListBoxItemText>
          </StyledListBoxItem>
          <StyledListBoxItem id="pro" textValue="Pro">
            <DropdownListBoxItemText slot="label">
              Pro
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Advanced features
            </DropdownListBoxItemText>
          </StyledListBoxItem>
          <StyledListBoxItem id="enterprise" textValue="Enterprise" isDisabled>
            <DropdownListBoxItemText slot="label">
              Enterprise
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Coming soon
            </DropdownListBoxItemText>
          </StyledListBoxItem>
        </DropdownListBox>
      </Flex>

      {/* Typography Variants */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Typography Variants
        </Text>
        <Text size="sm" color="lo">
          Using @urban-ui/text props for styling.
        </Text>
        <DropdownListBox
          aria-label="Select a style"
          selectionMode="single"
          style={styles.listbox}
        >
          <StyledListBoxItem id="bold" textValue="Bold Label">
            <DropdownListBoxItemText slot="label" weight="bold">
              Bold Label
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="xs" color="lo">
              Using weight="bold"
            </DropdownListBoxItemText>
          </StyledListBoxItem>
          <StyledListBoxItem id="mono" textValue="Monospace">
            <DropdownListBoxItemText slot="label" font="mono">
              Monospace Font
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="xs" color="lo">
              Using font="mono"
            </DropdownListBoxItemText>
          </StyledListBoxItem>
          <StyledListBoxItem id="large" textValue="Large Text">
            <DropdownListBoxItemText slot="label" size="lg">
              Large Text
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Using size="lg"
            </DropdownListBoxItemText>
          </StyledListBoxItem>
        </DropdownListBox>
      </Flex>
    </Flex>
  )
}
