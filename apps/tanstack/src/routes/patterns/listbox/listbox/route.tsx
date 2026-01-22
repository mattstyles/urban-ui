import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Icon } from '@urban-ui/icon'
import {
  Listbox,
  ListboxItem,
  ListboxItemContent,
  ListboxItemText,
} from '@urban-ui/listbox'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { surface, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { CirclePlus } from 'lucide-react'

import { CustomListBoxItem, CustomListbox } from './-customListBox'

export const Route = createFileRoute('/patterns/listbox/listbox/')({
  component: ListboxPatterns,
})

const styles = stylex.create({
  page: {
    padding: space[600],
  },
  container: {
    padding: space[300],
    backgroundColor: surface.muted,
    color: tone.fgHi,
    borderRadius: radii.md,
  },
  listbox: {
    maxWidth: 300,
    maxHeight: 300,
  },
  customItem: {
    padding: space[150],
  },
  customListbox: {
    padding: space[100],
    gap: space[100],
  },
  customListBoxItem: {},
})

function ListboxPatterns() {
  return (
    <Flex direction="column" gap="400" style={styles.page}>
      <Text size="xxl" weight="bold">
        Listbox Patterns
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Text size="sm" color="lo">
          Simple listbox with text items.
        </Text>
        <Listbox
          aria-label="Select an option"
          selectionMode="single"
          style={styles.listbox}
        >
          <ListboxItem id="option1">Option 1</ListboxItem>
          <ListboxItem id="option2">Option 2</ListboxItem>
          <ListboxItem id="option3">Option 3</ListboxItem>
        </Listbox>
      </Flex>

      {/* Custom content */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Custom content
        </Text>
        <Text size="sm" color="lo">
          With icons.
        </Text>
        <Listbox aria-label="Select an option" selectionMode="single">
          <ListboxItem id="option1">
            <Flex
              direction="row"
              gap="100"
              align="center"
              style={styles.customItem}
            >
              <Icon size="sm">
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
      </Flex>

      {/* Full custom */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Fully customised
        </Text>
        <Text size="sm" color="lo">
          Styles added to primitives from react-aria-components.
        </Text>
        <CustomListbox aria-label="Select an option" selectionMode="single">
          <CustomListBoxItem id="option1">Option 1</CustomListBoxItem>
          <CustomListBoxItem id="option2">Option 2</CustomListBoxItem>
          <CustomListBoxItem id="option3">Option 3</CustomListBoxItem>
        </CustomListbox>
      </Flex>

      {/* With Label and Description */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Label and Description
        </Text>
        <Text size="sm" color="lo">
          Using ListboxItemText for structured content.
        </Text>
        <Listbox
          aria-label="Select a permission"
          selectionMode="single"
          style={styles.listbox}
        >
          <ListboxItem id="read" textValue="Read">
            <ListboxItemContent>
              <ListboxItemText slot="label">Read</ListboxItemText>
              <ListboxItemText slot="description" size="sm" color="lo">
                View content only
              </ListboxItemText>
            </ListboxItemContent>
          </ListboxItem>
          <ListboxItem id="write" textValue="Write">
            <ListboxItemContent>
              <ListboxItemText slot="label">Write</ListboxItemText>
              <ListboxItemText slot="description" size="sm" color="lo">
                Create and edit content
              </ListboxItemText>
            </ListboxItemContent>
          </ListboxItem>
          <ListboxItem id="admin" textValue="Admin">
            <ListboxItemContent>
              <ListboxItemText slot="label">Admin</ListboxItemText>
              <ListboxItemText slot="description" size="sm" color="lo">
                Full access to all features
              </ListboxItemText>
            </ListboxItemContent>
          </ListboxItem>
        </Listbox>
      </Flex>

      {/* Multiple Selection */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Multiple Selection
        </Text>
        <Text size="sm" color="lo">
          Allow selecting multiple items.
        </Text>
        <Listbox
          aria-label="Select toppings"
          selectionMode="multiple"
          style={styles.listbox}
        >
          <ListboxItem id="cheese">Cheese</ListboxItem>
          <ListboxItem id="pepperoni">Pepperoni</ListboxItem>
          <ListboxItem id="mushrooms">Mushrooms</ListboxItem>
          <ListboxItem id="olives">Olives</ListboxItem>
          <ListboxItem id="onions">Onions</ListboxItem>
        </Listbox>
      </Flex>

      {/* Disabled Items */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Disabled Items
        </Text>
        <Text size="sm" color="lo">
          Some items can be disabled.
        </Text>
        <Listbox
          aria-label="Select a plan"
          selectionMode="single"
          style={styles.listbox}
        >
          <ListboxItem id="free" textValue="Free">
            <ListboxItemContent>
              <ListboxItemText slot="label">Free</ListboxItemText>
              <ListboxItemText slot="description" size="sm" color="lo">
                Basic features
              </ListboxItemText>
            </ListboxItemContent>
          </ListboxItem>
          <ListboxItem id="pro" textValue="Pro">
            <ListboxItemContent>
              <ListboxItemText slot="label">Pro</ListboxItemText>
              <ListboxItemText slot="description" size="sm" color="lo">
                Advanced features
              </ListboxItemText>
            </ListboxItemContent>
          </ListboxItem>
          <ListboxItem id="enterprise" textValue="Enterprise" isDisabled>
            <ListboxItemContent>
              <ListboxItemText slot="label">Enterprise</ListboxItemText>
              <ListboxItemText slot="description" size="sm" color="lo">
                Coming soon
              </ListboxItemText>
            </ListboxItemContent>
          </ListboxItem>
        </Listbox>
      </Flex>
    </Flex>
  )
}
