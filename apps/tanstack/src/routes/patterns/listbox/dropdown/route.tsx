import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import {
  DropdownItem,
  DropdownItemText,
  DropdownListBox,
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
          <DropdownItem id="option1">Option 1</DropdownItem>
          <DropdownItem id="option2">Option 2</DropdownItem>
          <DropdownItem id="option3">Option 3</DropdownItem>
        </DropdownListBox>
      </Flex>

      {/* With Label and Description */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Label and Description
        </Text>
        <Text size="sm" color="lo">
          Using DropdownItemText for structured content.
        </Text>
        <DropdownListBox
          aria-label="Select a permission"
          selectionMode="single"
          style={styles.listbox}
        >
          <DropdownItem id="read" textValue="Read">
            <DropdownItemText slot="label">Read</DropdownItemText>
            <DropdownItemText slot="description" size="sm" color="lo">
              View content only
            </DropdownItemText>
          </DropdownItem>
          <DropdownItem id="write" textValue="Write">
            <DropdownItemText slot="label">Write</DropdownItemText>
            <DropdownItemText slot="description" size="sm" color="lo">
              Create and edit content
            </DropdownItemText>
          </DropdownItem>
          <DropdownItem id="admin" textValue="Admin">
            <DropdownItemText slot="label">Admin</DropdownItemText>
            <DropdownItemText slot="description" size="sm" color="lo">
              Full access to all features
            </DropdownItemText>
          </DropdownItem>
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
          <DropdownItem id="cheese">Cheese</DropdownItem>
          <DropdownItem id="pepperoni">Pepperoni</DropdownItem>
          <DropdownItem id="mushrooms">Mushrooms</DropdownItem>
          <DropdownItem id="olives">Olives</DropdownItem>
          <DropdownItem id="onions">Onions</DropdownItem>
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
          <DropdownItem id="free" textValue="Free">
            <DropdownItemText slot="label">Free</DropdownItemText>
            <DropdownItemText slot="description" size="sm" color="lo">
              Basic features
            </DropdownItemText>
          </DropdownItem>
          <DropdownItem id="pro" textValue="Pro">
            <DropdownItemText slot="label">Pro</DropdownItemText>
            <DropdownItemText slot="description" size="sm" color="lo">
              Advanced features
            </DropdownItemText>
          </DropdownItem>
          <DropdownItem id="enterprise" textValue="Enterprise" isDisabled>
            <DropdownItemText slot="label">Enterprise</DropdownItemText>
            <DropdownItemText slot="description" size="sm" color="lo">
              Coming soon
            </DropdownItemText>
          </DropdownItem>
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
          <DropdownItem id="bold" textValue="Bold Label">
            <DropdownItemText slot="label" weight="bold">
              Bold Label
            </DropdownItemText>
            <DropdownItemText slot="description" size="xs" color="lo">
              Using weight=&quot;bold&quot;
            </DropdownItemText>
          </DropdownItem>
          <DropdownItem id="mono" textValue="Monospace">
            <DropdownItemText slot="label" font="mono">
              Monospace Font
            </DropdownItemText>
            <DropdownItemText slot="description" size="xs" color="lo">
              Using font=&quot;mono&quot;
            </DropdownItemText>
          </DropdownItem>
          <DropdownItem id="large" textValue="Large Text">
            <DropdownItemText slot="label" size="lg">
              Large Text
            </DropdownItemText>
            <DropdownItemText slot="description" size="sm" color="lo">
              Using size=&quot;lg&quot;
            </DropdownItemText>
          </DropdownItem>
        </DropdownListBox>
      </Flex>
    </Flex>
  )
}
