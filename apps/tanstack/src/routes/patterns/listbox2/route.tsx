import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Icon } from '@urban-ui/icon'
import {
  ListBox2,
  ListBox2Header,
  ListBox2Item,
  ListBox2ItemContent,
  ListBox2ItemText,
  ListBox2Section,
} from '@urban-ui/listbox-2'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { surface, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import {
  CirclePlus,
  FileText,
  FolderOpen,
  Mail,
  Settings,
  Trash2,
  User,
} from 'lucide-react'
import { useState } from 'react'
import type { Selection } from 'react-aria-components'

export const Route = createFileRoute('/patterns/listbox2/')({
  component: ListBox2Patterns,
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
  },
  sizeComparison: {
    gap: space[400],
  },
  iconItem: {
    alignItems: 'center',
  },
})

function ListBox2Patterns() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(['1']))
  const [multipleSelected, setMultipleSelected] = useState<Selection>(
    new Set(['cheese', 'pepperoni']),
  )

  return (
    <Flex direction="column" gap="400" style={styles.page}>
      <Text size="xxl" weight="bold">
        ListBox2 Patterns
      </Text>
      <Text color="lo">
        ListBox2 is a standalone selection list component. Selection is
        indicated by background color change only (no checkmark).
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Text size="sm" color="lo">
          Simple listbox with text items and single selection.
        </Text>
        <ListBox2
          aria-label="Select an option"
          selectionMode="single"
          style={styles.listbox}
        >
          <ListBox2Item id="option1">Option 1</ListBox2Item>
          <ListBox2Item id="option2">Option 2</ListBox2Item>
          <ListBox2Item id="option3">Option 3</ListBox2Item>
        </ListBox2>
      </Flex>

      {/* Size Variants */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Size Variants
        </Text>
        <Text size="sm" color="lo">
          Three size variants: sm, md, lg. Size affects padding and font size.
        </Text>
        <Flex style={styles.sizeComparison}>
          <Flex direction="v" gap="100">
            <Text size="sm" weight="semibold">
              Small
            </Text>
            <ListBox2
              aria-label="Small listbox"
              selectionMode="single"
              size="sm"
            >
              <ListBox2Item id="1">Small Item 1</ListBox2Item>
              <ListBox2Item id="2">Small Item 2</ListBox2Item>
              <ListBox2Item id="3">Small Item 3</ListBox2Item>
            </ListBox2>
          </Flex>
          <Flex direction="v" gap="100">
            <Text size="sm" weight="semibold">
              Medium (default)
            </Text>
            <ListBox2
              aria-label="Medium listbox"
              selectionMode="single"
              size="md"
            >
              <ListBox2Item id="1">Medium Item 1</ListBox2Item>
              <ListBox2Item id="2">Medium Item 2</ListBox2Item>
              <ListBox2Item id="3">Medium Item 3</ListBox2Item>
            </ListBox2>
          </Flex>
          <Flex direction="v" gap="100">
            <Text size="sm" weight="semibold">
              Large
            </Text>
            <ListBox2
              aria-label="Large listbox"
              selectionMode="single"
              size="lg"
            >
              <ListBox2Item id="1">Large Item 1</ListBox2Item>
              <ListBox2Item id="2">Large Item 2</ListBox2Item>
              <ListBox2Item id="3">Large Item 3</ListBox2Item>
            </ListBox2>
          </Flex>
        </Flex>
      </Flex>

      {/* With Icons */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Icons
        </Text>
        <Text size="sm" color="lo">
          Items can contain custom content like icons.
        </Text>
        <ListBox2
          aria-label="Actions"
          selectionMode="single"
          style={styles.listbox}
        >
          <ListBox2Item id="new" textValue="New File">
            <ListBox2ItemContent
              direction="row"
              gap="150"
              style={styles.iconItem}
            >
              <Icon size="sm">
                <CirclePlus />
              </Icon>
              <ListBox2ItemText slot="label">New File</ListBox2ItemText>
            </ListBox2ItemContent>
          </ListBox2Item>
          <ListBox2Item id="open" textValue="Open">
            <ListBox2ItemContent
              direction="row"
              gap="150"
              style={styles.iconItem}
            >
              <Icon size="sm">
                <FolderOpen />
              </Icon>
              <ListBox2ItemText slot="label">Open</ListBox2ItemText>
            </ListBox2ItemContent>
          </ListBox2Item>
          <ListBox2Item id="delete" textValue="Delete">
            <ListBox2ItemContent
              direction="row"
              gap="150"
              style={styles.iconItem}
            >
              <Icon size="sm">
                <Trash2 />
              </Icon>
              <ListBox2ItemText slot="label">Delete</ListBox2ItemText>
            </ListBox2ItemContent>
          </ListBox2Item>
        </ListBox2>
      </Flex>

      {/* With Label and Description */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Label and Description
        </Text>
        <Text size="sm" color="lo">
          Using ListBox2ItemText for structured content with labels and
          descriptions.
        </Text>
        <ListBox2
          aria-label="Select a permission"
          selectionMode="single"
          style={styles.listbox}
        >
          <ListBox2Item id="read" textValue="Read">
            <ListBox2ItemContent>
              <ListBox2ItemText slot="label">Read</ListBox2ItemText>
              <ListBox2ItemText slot="description" size="sm" color="lo">
                View content only
              </ListBox2ItemText>
            </ListBox2ItemContent>
          </ListBox2Item>
          <ListBox2Item id="write" textValue="Write">
            <ListBox2ItemContent>
              <ListBox2ItemText slot="label">Write</ListBox2ItemText>
              <ListBox2ItemText slot="description" size="sm" color="lo">
                Create and edit content
              </ListBox2ItemText>
            </ListBox2ItemContent>
          </ListBox2Item>
          <ListBox2Item id="admin" textValue="Admin">
            <ListBox2ItemContent>
              <ListBox2ItemText slot="label">Admin</ListBox2ItemText>
              <ListBox2ItemText slot="description" size="sm" color="lo">
                Full access to all features
              </ListBox2ItemText>
            </ListBox2ItemContent>
          </ListBox2Item>
        </ListBox2>
      </Flex>

      {/* Multiple Selection */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Multiple Selection
        </Text>
        <Text size="sm" color="lo">
          Allow selecting multiple items. Selected:{' '}
          {[...multipleSelected].join(', ') || 'none'}
        </Text>
        <ListBox2
          aria-label="Select toppings"
          selectionMode="multiple"
          selectedKeys={multipleSelected}
          onSelectionChange={setMultipleSelected}
          style={styles.listbox}
        >
          <ListBox2Item id="cheese">Cheese</ListBox2Item>
          <ListBox2Item id="pepperoni">Pepperoni</ListBox2Item>
          <ListBox2Item id="mushrooms">Mushrooms</ListBox2Item>
          <ListBox2Item id="olives">Olives</ListBox2Item>
          <ListBox2Item id="onions">Onions</ListBox2Item>
        </ListBox2>
      </Flex>

      {/* Controlled Selection */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Controlled Selection
        </Text>
        <Text size="sm" color="lo">
          Selection state controlled via selectedKeys and onSelectionChange.
          Selected: {[...selectedKeys].join(', ') || 'none'}
        </Text>
        <ListBox2
          aria-label="Controlled selection"
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          style={styles.listbox}
        >
          <ListBox2Item id="1">Item 1</ListBox2Item>
          <ListBox2Item id="2">Item 2</ListBox2Item>
          <ListBox2Item id="3">Item 3</ListBox2Item>
        </ListBox2>
      </Flex>

      {/* Sections with Headers */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Sections with Headers
        </Text>
        <Text size="sm" color="lo">
          Group related items using ListBox2Section and ListBox2Header.
        </Text>
        <ListBox2
          aria-label="Navigation"
          selectionMode="single"
          style={styles.listbox}
        >
          <ListBox2Section>
            <ListBox2Header>
              <Text size="xs" weight="semibold" color="lo">
                Communication
              </Text>
            </ListBox2Header>
            <ListBox2Item id="inbox" textValue="Inbox">
              <ListBox2ItemContent
                direction="row"
                gap="150"
                style={styles.iconItem}
              >
                <Icon size="sm">
                  <Mail />
                </Icon>
                <ListBox2ItemText slot="label">Inbox</ListBox2ItemText>
              </ListBox2ItemContent>
            </ListBox2Item>
            <ListBox2Item id="documents" textValue="Documents">
              <ListBox2ItemContent
                direction="row"
                gap="150"
                style={styles.iconItem}
              >
                <Icon size="sm">
                  <FileText />
                </Icon>
                <ListBox2ItemText slot="label">Documents</ListBox2ItemText>
              </ListBox2ItemContent>
            </ListBox2Item>
          </ListBox2Section>
          <ListBox2Section>
            <ListBox2Header>
              <Text size="xs" weight="semibold" color="lo">
                Account
              </Text>
            </ListBox2Header>
            <ListBox2Item id="profile" textValue="Profile">
              <ListBox2ItemContent
                direction="row"
                gap="150"
                style={styles.iconItem}
              >
                <Icon size="sm">
                  <User />
                </Icon>
                <ListBox2ItemText slot="label">Profile</ListBox2ItemText>
              </ListBox2ItemContent>
            </ListBox2Item>
            <ListBox2Item id="settings" textValue="Settings">
              <ListBox2ItemContent
                direction="row"
                gap="150"
                style={styles.iconItem}
              >
                <Icon size="sm">
                  <Settings />
                </Icon>
                <ListBox2ItemText slot="label">Settings</ListBox2ItemText>
              </ListBox2ItemContent>
            </ListBox2Item>
          </ListBox2Section>
        </ListBox2>
      </Flex>

      {/* Disabled Items */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Disabled Items
        </Text>
        <Text size="sm" color="lo">
          Individual items can be disabled using isDisabled.
        </Text>
        <ListBox2
          aria-label="Select a plan"
          selectionMode="single"
          style={styles.listbox}
        >
          <ListBox2Item id="free" textValue="Free">
            <ListBox2ItemContent>
              <ListBox2ItemText slot="label">Free</ListBox2ItemText>
              <ListBox2ItemText slot="description" size="sm" color="lo">
                Basic features
              </ListBox2ItemText>
            </ListBox2ItemContent>
          </ListBox2Item>
          <ListBox2Item id="pro" textValue="Pro">
            <ListBox2ItemContent>
              <ListBox2ItemText slot="label">Pro</ListBox2ItemText>
              <ListBox2ItemText slot="description" size="sm" color="lo">
                Advanced features
              </ListBox2ItemText>
            </ListBox2ItemContent>
          </ListBox2Item>
          <ListBox2Item id="enterprise" textValue="Enterprise" isDisabled>
            <ListBox2ItemContent>
              <ListBox2ItemText slot="label">Enterprise</ListBox2ItemText>
              <ListBox2ItemText slot="description" size="sm" color="lo">
                Coming soon
              </ListBox2ItemText>
            </ListBox2ItemContent>
          </ListBox2Item>
        </ListBox2>
      </Flex>

      {/* Default Selected */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Default Selected
        </Text>
        <Text size="sm" color="lo">
          Set initial selection using defaultSelectedKeys (uncontrolled).
        </Text>
        <ListBox2
          aria-label="Default selection"
          selectionMode="single"
          defaultSelectedKeys={['option2']}
          style={styles.listbox}
        >
          <ListBox2Item id="option1">Option 1</ListBox2Item>
          <ListBox2Item id="option2">Option 2 (default)</ListBox2Item>
          <ListBox2Item id="option3">Option 3</ListBox2Item>
        </ListBox2>
      </Flex>

      {/* Empty State */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Empty State
        </Text>
        <Text size="sm" color="lo">
          ListBox2 with no items shows an empty container.
        </Text>
        <ListBox2
          aria-label="Empty listbox"
          selectionMode="single"
          style={styles.listbox}
          renderEmptyState={() => (
            <Text size="sm" color="lo">
              No items available
            </Text>
          )}
        >
          {[]}
        </ListBox2>
      </Flex>
    </Flex>
  )
}
