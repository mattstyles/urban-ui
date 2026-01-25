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
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { surface, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import {
  Copy,
  Ellipsis,
  Facebook,
  FolderOpen,
  Instagram,
  Linkedin,
  Mail,
  Pencil,
  Share,
  Smartphone,
  Trash,
  Twitter,
} from 'lucide-react'
import { useState } from 'react'
import { Header, Text as AriaText } from 'react-aria-components'
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

      {/* Complete Example */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Complete Example
        </Text>
        <Text size="sm" color="lo">
          Full-featured menu with icons, keyboard shortcuts, submenus, and
          section selection.
        </Text>
        <MenuTrigger>
          <Button aria-label="Actions">
            <Ellipsis size={18} />
          </Button>
          <Menu>
            <MenuSection>
              <MenuItem onAction={() => alert('open')}>
                <FolderOpen size={16} />
                <AriaText slot="label">Open</AriaText>
                <Keyboard>⌘O</Keyboard>
              </MenuItem>
              <MenuItem onAction={() => alert('rename')}>
                <Pencil size={16} />
                <AriaText slot="label">Rename…</AriaText>
                <Keyboard>⌘R</Keyboard>
              </MenuItem>
              <MenuItem onAction={() => alert('duplicate')}>
                <Copy size={16} />
                <AriaText slot="label">Duplicate</AriaText>
                <Keyboard>⌘D</Keyboard>
              </MenuItem>
              <MenuItem
                onAction={() => alert('delete')}
                variant="destructive"
              >
                <Trash size={16} />
                <AriaText slot="label">Delete…</AriaText>
                <Keyboard>⌘⌫</Keyboard>
              </MenuItem>
              <SubmenuTrigger>
                <MenuItem>
                  <Share size={16} />
                  <AriaText slot="label">Share</AriaText>
                </MenuItem>
                <Menu>
                  <MenuItem>
                    <Mail size={16} />
                    <AriaText slot="label">Email</AriaText>
                  </MenuItem>
                  <MenuItem>
                    <Smartphone size={16} />
                    <AriaText slot="label">SMS</AriaText>
                  </MenuItem>
                  <MenuItem>
                    <Instagram size={16} />
                    <AriaText slot="label">Instagram</AriaText>
                  </MenuItem>
                </Menu>
              </SubmenuTrigger>
            </MenuSection>
            <Separator />
            <MenuSection
              selectionMode="multiple"
              defaultSelectedKeys={['files']}
            >
              <MenuItem id="files">Show files</MenuItem>
              <MenuItem id="folders">Show folders</MenuItem>
            </MenuSection>
          </Menu>
        </MenuTrigger>
      </Flex>

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
          <Menu
            aria-label="Actions"
            onAction={(key) => console.log('Action:', key)}
          >
            <MenuItem id="cut">Cut</MenuItem>
            <MenuItem id="copy">Copy</MenuItem>
            <MenuItem id="paste">Paste</MenuItem>
          </Menu>
        </MenuTrigger>
      </Flex>

      {/* With Keyboard Shortcuts */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Keyboard Shortcuts
        </Text>
        <Text size="sm" color="lo">
          Menu items can display keyboard shortcuts using the Keyboard
          component.
        </Text>
        <MenuTrigger>
          <Button>Edit</Button>
          <Menu aria-label="Edit actions">
            <MenuItem id="cut" textValue="Cut">
              <AriaText slot="label">Cut</AriaText>
              <Keyboard>⌘X</Keyboard>
            </MenuItem>
            <MenuItem id="copy" textValue="Copy">
              <AriaText slot="label">Copy</AriaText>
              <Keyboard>⌘C</Keyboard>
            </MenuItem>
            <MenuItem id="paste" textValue="Paste">
              <AriaText slot="label">Paste</AriaText>
              <Keyboard>⌘V</Keyboard>
            </MenuItem>
            <Separator />
            <MenuItem id="selectAll" textValue="Select All">
              <AriaText slot="label">Select All</AriaText>
              <Keyboard>⌘A</Keyboard>
            </MenuItem>
          </Menu>
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
        </MenuTrigger>
      </Flex>

      {/* Sections with Headers */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Sections with Headers
        </Text>
        <Text size="sm" color="lo">
          Group related items with section headers. Use Header from
          react-aria-components or MenuHeader.
        </Text>
        <MenuTrigger>
          <Button>File</Button>
          <Menu aria-label="File menu">
            <MenuSection>
              <Header>Document</Header>
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
        </MenuTrigger>
      </Flex>

      {/* Single Selection */}
      <SingleSelectionExample />

      {/* Multiple Selection */}
      <MultipleSelectionExample />

      {/* Section-Level Selection */}
      <SectionSelectionExample />

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
          <Menu aria-label="Touch menu" size="lg">
            <MenuItem id="profile">Profile</MenuItem>
            <MenuItem id="settings">Settings</MenuItem>
            <MenuItem id="help">Help</MenuItem>
            <Separator />
            <MenuItem id="logout" variant="destructive">
              Log Out
            </MenuItem>
          </Menu>
        </MenuTrigger>
      </Flex>

      {/* Submenus */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Submenus
        </Text>
        <Text size="sm" color="lo">
          Nested menus for hierarchical navigation. No Popover wrapper needed.
        </Text>
        <MenuTrigger>
          <Button>Actions</Button>
          <Menu aria-label="Actions with submenus">
            <MenuItem id="cut">Cut</MenuItem>
            <MenuItem id="copy">Copy</MenuItem>
            <MenuItem id="paste">Paste</MenuItem>
            <Separator />
            <SubmenuTrigger>
              <MenuItem id="share">Share</MenuItem>
              <Menu aria-label="Share options">
                <MenuItem id="email">Email</MenuItem>
                <MenuItem id="message">Message</MenuItem>
                <MenuItem id="airdrop">AirDrop</MenuItem>
                <SubmenuTrigger>
                  <MenuItem id="social">Social Media</MenuItem>
                  <Menu aria-label="Social media options">
                    <MenuItem id="twitter">
                      <Twitter size={16} />
                      <AriaText slot="label">Twitter</AriaText>
                    </MenuItem>
                    <MenuItem id="facebook">
                      <Facebook size={16} />
                      <AriaText slot="label">Facebook</AriaText>
                    </MenuItem>
                    <MenuItem id="linkedin">
                      <Linkedin size={16} />
                      <AriaText slot="label">LinkedIn</AriaText>
                    </MenuItem>
                  </Menu>
                </SubmenuTrigger>
              </Menu>
            </SubmenuTrigger>
          </Menu>
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
          <Menu aria-label="Long press menu">
            <MenuItem id="quick">Quick Action</MenuItem>
            <MenuItem id="advanced">Advanced Options</MenuItem>
          </Menu>
        </MenuTrigger>
      </Flex>

      {/* Links */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Links
        </Text>
        <Text size="sm" color="lo">
          Menu items can be links using the href prop.
        </Text>
        <MenuTrigger>
          <Button>Resources</Button>
          <Menu aria-label="Resource links">
            <MenuItem
              href="https://react-spectrum.adobe.com/react-aria/"
              target="_blank"
            >
              React Aria Docs
            </MenuItem>
            <MenuItem href="https://stylexjs.com/" target="_blank">
              StyleX Docs
            </MenuItem>
            <MenuItem
              href="https://github.com/mattstyles/urban-ui"
              target="_blank"
            >
              GitHub Repository
            </MenuItem>
          </Menu>
        </MenuTrigger>
      </Flex>

      {/* Dynamic Collections */}
      <DynamicCollectionExample />
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
      </MenuTrigger>
    </Flex>
  )
}

function MultipleSelectionExample() {
  const [selected, setSelected] = useState<Selection>(
    new Set(['bold', 'italic']),
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
      </MenuTrigger>
    </Flex>
  )
}

function DynamicCollectionExample() {
  const items = [
    { id: 1, name: 'New file…' },
    { id: 2, name: 'New window' },
    { id: 3, name: 'Open…' },
    { id: 4, name: 'Save' },
    { id: 5, name: 'Save as…' },
    { id: 6, name: 'Revert file' },
  ]

  return (
    <Flex direction="v" gap="200" style={styles.container}>
      <Text size="lg" weight="semibold">
        Dynamic Collections
      </Text>
      <Text size="sm" color="lo">
        Pass items array and render function for dynamic menu content.
      </Text>
      <MenuTrigger>
        <Button>File</Button>
        <Menu
          aria-label="File menu"
          items={items}
          onAction={(key) => console.log('Action:', key)}
        >
          {(item) => <MenuItem>{item.name}</MenuItem>}
        </Menu>
      </MenuTrigger>
    </Flex>
  )
}

function SectionSelectionExample() {
  const [style, setStyle] = useState<Selection>(new Set(['bold']))
  const [align, setAlign] = useState<Selection>(new Set(['left']))

  return (
    <Flex direction="v" gap="200" style={styles.container}>
      <Text size="lg" weight="semibold">
        Section-Level Selection
      </Text>
      <Text size="sm" color="lo">
        Each section can have independent selection. Style:{' '}
        {[...style].join(', ')} | Align: {[...align].join(', ')}
      </Text>
      <MenuTrigger>
        <Button>Format</Button>
        <Menu aria-label="Text formatting">
          <MenuSection
            selectionMode="multiple"
            selectedKeys={style}
            onSelectionChange={setStyle}
          >
            <Header>Text Style</Header>
            <MenuItem id="bold">Bold</MenuItem>
            <MenuItem id="italic">Italic</MenuItem>
            <MenuItem id="underline">Underline</MenuItem>
          </MenuSection>
          <MenuSection
            selectionMode="single"
            selectedKeys={align}
            onSelectionChange={setAlign}
          >
            <Header>Alignment</Header>
            <MenuItem id="left">Left</MenuItem>
            <MenuItem id="center">Center</MenuItem>
            <MenuItem id="right">Right</MenuItem>
          </MenuSection>
        </Menu>
      </MenuTrigger>
    </Flex>
  )
}
