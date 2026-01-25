import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import {
  Keyboard,
  Menu,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuTrigger,
  Separator,
  SubmenuTrigger,
} from '@urban-ui/menu'
import { Popover } from '@urban-ui/popover'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { surface, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { Selection } from 'react-aria-components'

export const Route = createFileRoute('/patterns/menu/')({
  component: MenuPatterns,
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
})

function MenuPatterns() {
  return (
    <Flex direction="column" gap="400" style={styles.page}>
      <Text size="xxl" weight="bold">
        Menu Patterns
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Text size="sm" color="lo">
          A simple menu with action items.
        </Text>
        <MenuTrigger>
          <Button>Actions</Button>
          <Popover>
            <Menu
              aria-label="Actions"
              onAction={(key) => console.log('Action:', key)}
            >
              <MenuItem id="cut">Cut</MenuItem>
              <MenuItem id="copy">Copy</MenuItem>
              <MenuItem id="paste">Paste</MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </Flex>

      {/* With Keyboard Shortcuts */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Keyboard Shortcuts
        </Text>
        <Text size="sm" color="lo">
          Menu items can display keyboard shortcuts.
        </Text>
        <MenuTrigger>
          <Button>Edit</Button>
          <Popover>
            <Menu aria-label="Edit actions">
              <MenuItem id="cut" textValue="Cut">
                Cut
                <Keyboard>⌘X</Keyboard>
              </MenuItem>
              <MenuItem id="copy" textValue="Copy">
                Copy
                <Keyboard>⌘C</Keyboard>
              </MenuItem>
              <MenuItem id="paste" textValue="Paste">
                Paste
                <Keyboard>⌘V</Keyboard>
              </MenuItem>
              <Separator />
              <MenuItem id="selectAll" textValue="Select All">
                Select All
                <Keyboard>⌘A</Keyboard>
              </MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </Flex>

      {/* Variants */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Variants
        </Text>
        <Text size="sm" color="lo">
          Menu items support semantic variants for destructive and success
          actions.
        </Text>
        <MenuTrigger>
          <Button>File Actions</Button>
          <Popover>
            <Menu aria-label="File actions">
              <MenuItem id="edit">Edit</MenuItem>
              <MenuItem id="duplicate">Duplicate</MenuItem>
              <Separator />
              <MenuItem id="publish" variant="success">
                Publish
              </MenuItem>
              <MenuItem id="archive">Archive</MenuItem>
              <Separator />
              <MenuItem id="delete" variant="destructive">
                Delete
              </MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </Flex>

      {/* Sections with Headers */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Sections with Headers
        </Text>
        <Text size="sm" color="lo">
          Group related items with section headers.
        </Text>
        <MenuTrigger>
          <Button>File</Button>
          <Popover>
            <Menu aria-label="File menu">
              <MenuSection>
                <MenuHeader>Document</MenuHeader>
                <MenuItem id="new">New</MenuItem>
                <MenuItem id="open">Open</MenuItem>
                <MenuItem id="save">Save</MenuItem>
              </MenuSection>
              <Separator />
              <MenuSection>
                <MenuHeader>Export</MenuHeader>
                <MenuItem id="pdf">Export as PDF</MenuItem>
                <MenuItem id="image">Export as Image</MenuItem>
                <MenuItem id="markdown">Export as Markdown</MenuItem>
              </MenuSection>
            </Menu>
          </Popover>
        </MenuTrigger>
      </Flex>

      {/* Single Selection */}
      <SingleSelectionExample />

      {/* Multiple Selection */}
      <MultipleSelectionExample />

      {/* Disabled Items */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Disabled Items
        </Text>
        <Text size="sm" color="lo">
          Some items can be disabled and cannot be selected.
        </Text>
        <MenuTrigger>
          <Button>Options</Button>
          <Popover>
            <Menu aria-label="Options">
              <MenuItem id="view">View</MenuItem>
              <MenuItem id="edit">Edit</MenuItem>
              <MenuItem id="share" isDisabled>
                Share (Unavailable)
              </MenuItem>
              <MenuItem id="delete" variant="destructive">
                Delete
              </MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </Flex>

      {/* Large Size */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Large Size
        </Text>
        <Text size="sm" color="lo">
          Larger menu items for touch-friendly interfaces.
        </Text>
        <MenuTrigger>
          <Button>Touch Menu</Button>
          <Popover>
            <Menu aria-label="Touch menu" size="lg">
              <MenuItem id="profile">Profile</MenuItem>
              <MenuItem id="settings">Settings</MenuItem>
              <MenuItem id="help">Help</MenuItem>
              <Separator />
              <MenuItem id="logout" variant="destructive">
                Log Out
              </MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </Flex>

      {/* Submenus */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Submenus
        </Text>
        <Text size="sm" color="lo">
          Nested menus for hierarchical navigation.
        </Text>
        <MenuTrigger>
          <Button>Actions</Button>
          <Popover>
            <Menu aria-label="Actions with submenus">
              <MenuItem id="cut">Cut</MenuItem>
              <MenuItem id="copy">Copy</MenuItem>
              <MenuItem id="paste">Paste</MenuItem>
              <Separator />
              <SubmenuTrigger>
                <MenuItem id="share">Share</MenuItem>
                <Popover>
                  <Menu aria-label="Share options">
                    <MenuItem id="email">Email</MenuItem>
                    <MenuItem id="message">Message</MenuItem>
                    <MenuItem id="airdrop">AirDrop</MenuItem>
                    <SubmenuTrigger>
                      <MenuItem id="social">Social Media</MenuItem>
                      <Popover>
                        <Menu aria-label="Social media options">
                          <MenuItem id="twitter">Twitter</MenuItem>
                          <MenuItem id="facebook">Facebook</MenuItem>
                          <MenuItem id="linkedin">LinkedIn</MenuItem>
                        </Menu>
                      </Popover>
                    </SubmenuTrigger>
                  </Menu>
                </Popover>
              </SubmenuTrigger>
            </Menu>
          </Popover>
        </MenuTrigger>
      </Flex>

      {/* Long Press Trigger */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Long Press Trigger
        </Text>
        <Text size="sm" color="lo">
          Menu opens on long press instead of click.
        </Text>
        <MenuTrigger trigger="longPress">
          <Button>Long Press Me</Button>
          <Popover>
            <Menu aria-label="Long press menu">
              <MenuItem id="quick">Quick Action</MenuItem>
              <MenuItem id="advanced">Advanced Options</MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </Flex>
    </Flex>
  )
}

function SingleSelectionExample() {
  const [selected, setSelected] = useState<Selection>(new Set(['grid']))

  return (
    <Flex direction="v" gap="200" style={styles.container}>
      <Text size="lg" weight="semibold">
        Single Selection
      </Text>
      <Text size="sm" color="lo">
        Radio-style selection with checkmark indicator. Currently selected:{' '}
        {[...selected].join(', ')}
      </Text>
      <MenuTrigger>
        <Button>View</Button>
        <Popover>
          <Menu
            aria-label="View options"
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            <MenuItem id="list">List View</MenuItem>
            <MenuItem id="grid">Grid View</MenuItem>
            <MenuItem id="gallery">Gallery View</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </Flex>
  )
}

function MultipleSelectionExample() {
  const [selected, setSelected] = useState<Selection>(
    new Set(['bold', 'italic'])
  )

  return (
    <Flex direction="v" gap="200" style={styles.container}>
      <Text size="lg" weight="semibold">
        Multiple Selection
      </Text>
      <Text size="sm" color="lo">
        Checkbox-style selection allowing multiple items. Currently selected:{' '}
        {[...selected].join(', ')}
      </Text>
      <MenuTrigger>
        <Button>Format</Button>
        <Popover>
          <Menu
            aria-label="Text formatting"
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            <MenuItem id="bold">Bold</MenuItem>
            <MenuItem id="italic">Italic</MenuItem>
            <MenuItem id="underline">Underline</MenuItem>
            <MenuItem id="strikethrough">Strikethrough</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </Flex>
  )
}
