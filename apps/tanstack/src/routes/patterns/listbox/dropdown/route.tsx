import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import {
  DropdownListBox,
  DropdownListBoxItem,
  DropdownListBoxItemText,
} from '@urban-ui/listbox'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

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
  },
})

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
          <DropdownListBoxItem id="option1">Option 1</DropdownListBoxItem>
          <DropdownListBoxItem id="option2">Option 2</DropdownListBoxItem>
          <DropdownListBoxItem id="option3">Option 3</DropdownListBoxItem>
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
          <DropdownListBoxItem id="read" textValue="Read">
            <DropdownListBoxItemText slot="label">
              Read
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              View content only
            </DropdownListBoxItemText>
          </DropdownListBoxItem>
          <DropdownListBoxItem id="write" textValue="Write">
            <DropdownListBoxItemText slot="label">
              Write
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Create and edit content
            </DropdownListBoxItemText>
          </DropdownListBoxItem>
          <DropdownListBoxItem id="admin" textValue="Admin">
            <DropdownListBoxItemText slot="label">
              Admin
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Full access to all features
            </DropdownListBoxItemText>
          </DropdownListBoxItem>
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
          <DropdownListBoxItem id="cheese">Cheese</DropdownListBoxItem>
          <DropdownListBoxItem id="pepperoni">Pepperoni</DropdownListBoxItem>
          <DropdownListBoxItem id="mushrooms">Mushrooms</DropdownListBoxItem>
          <DropdownListBoxItem id="olives">Olives</DropdownListBoxItem>
          <DropdownListBoxItem id="onions">Onions</DropdownListBoxItem>
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
          <DropdownListBoxItem id="free" textValue="Free">
            <DropdownListBoxItemText slot="label">
              Free
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Basic features
            </DropdownListBoxItemText>
          </DropdownListBoxItem>
          <DropdownListBoxItem id="pro" textValue="Pro">
            <DropdownListBoxItemText slot="label">
              Pro
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Advanced features
            </DropdownListBoxItemText>
          </DropdownListBoxItem>
          <DropdownListBoxItem id="enterprise" textValue="Enterprise" isDisabled>
            <DropdownListBoxItemText slot="label">
              Enterprise
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Coming soon
            </DropdownListBoxItemText>
          </DropdownListBoxItem>
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
          <DropdownListBoxItem id="bold" textValue="Bold Label">
            <DropdownListBoxItemText slot="label" weight="bold">
              Bold Label
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="xs" color="lo">
              Using weight=&quot;bold&quot;
            </DropdownListBoxItemText>
          </DropdownListBoxItem>
          <DropdownListBoxItem id="mono" textValue="Monospace">
            <DropdownListBoxItemText slot="label" font="mono">
              Monospace Font
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="xs" color="lo">
              Using font=&quot;mono&quot;
            </DropdownListBoxItemText>
          </DropdownListBoxItem>
          <DropdownListBoxItem id="large" textValue="Large Text">
            <DropdownListBoxItemText slot="label" size="lg">
              Large Text
            </DropdownListBoxItemText>
            <DropdownListBoxItemText slot="description" size="sm" color="lo">
              Using size=&quot;lg&quot;
            </DropdownListBoxItemText>
          </DropdownListBoxItem>
        </DropdownListBox>
      </Flex>
    </Flex>
  )
}
