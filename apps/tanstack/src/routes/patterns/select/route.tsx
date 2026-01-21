import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Label } from '@urban-ui/form'
import { Popover } from '@urban-ui/popover'
import { Select, SelectItem, SelectListBox, SelectValue } from '@urban-ui/select'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { ChevronDown } from 'lucide-react'

export const Route = createFileRoute('/patterns/select/')({
  component: SelectPatterns,
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
  selectButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[100],
    minWidth: 200,
  },
  selectButtonWide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[100],
    minWidth: 280,
  },
  chevron: {
    flexShrink: 0,
    transition: 'transform 0.2s',
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  listbox: {
    minWidth: 200,
    maxHeight: 300,
  },
  listboxWide: {
    minWidth: 280,
    maxHeight: 300,
  },
})

function SelectPatterns() {
  return (
    <Flex direction="column" gap="400" style={styles.page}>
      <Text size="xxl" weight="bold">
        Select Patterns
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Text size="sm" color="lo">
          A simple select with checkmark indicators for selected items.
        </Text>
        <Select aria-label="Select an animal" placeholder="Select an animal">
          <Button variant="outline" style={styles.selectButton}>
            <SelectValue />
            <ChevronDown size={16} {...stylex.props(styles.chevron)} />
          </Button>
          <Popover>
            <SelectListBox style={styles.listbox}>
              <SelectItem id="cat">Cat</SelectItem>
              <SelectItem id="dog">Dog</SelectItem>
              <SelectItem id="rabbit">Rabbit</SelectItem>
              <SelectItem id="hamster">Hamster</SelectItem>
            </SelectListBox>
          </Popover>
        </Select>
      </Flex>

      {/* With Label */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Label
        </Text>
        <Text size="sm" color="lo">
          Select with associated label for accessibility.
        </Text>
        <Select placeholder="Choose a color">
          <Label>Favorite Color</Label>
          <Button variant="outline" style={styles.selectButton}>
            <SelectValue />
            <ChevronDown size={16} {...stylex.props(styles.chevron)} />
          </Button>
          <Popover>
            <SelectListBox style={styles.listbox}>
              <SelectItem id="red">Red</SelectItem>
              <SelectItem id="green">Green</SelectItem>
              <SelectItem id="blue">Blue</SelectItem>
              <SelectItem id="yellow">Yellow</SelectItem>
              <SelectItem id="purple">Purple</SelectItem>
            </SelectListBox>
          </Popover>
        </Select>
      </Flex>

      {/* Controlled Value */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Default Value
        </Text>
        <Text size="sm" color="lo">
          Select with a pre-selected default value.
        </Text>
        <Select defaultSelectedKey="medium">
          <Label>T-Shirt Size</Label>
          <Button variant="outline" style={styles.selectButton}>
            <SelectValue />
            <ChevronDown size={16} {...stylex.props(styles.chevron)} />
          </Button>
          <Popover>
            <SelectListBox style={styles.listbox}>
              <SelectItem id="xs">Extra Small</SelectItem>
              <SelectItem id="small">Small</SelectItem>
              <SelectItem id="medium">Medium</SelectItem>
              <SelectItem id="large">Large</SelectItem>
              <SelectItem id="xl">Extra Large</SelectItem>
            </SelectListBox>
          </Popover>
        </Select>
      </Flex>

      {/* Disabled Items */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Disabled Items
        </Text>
        <Text size="sm" color="lo">
          Some items can be disabled and cannot be selected.
        </Text>
        <Select placeholder="Select a plan">
          <Label>Subscription Plan</Label>
          <Button variant="outline" style={styles.selectButtonWide}>
            <SelectValue />
            <ChevronDown size={16} {...stylex.props(styles.chevron)} />
          </Button>
          <Popover>
            <SelectListBox style={styles.listboxWide}>
              <SelectItem id="free">Free - Basic features</SelectItem>
              <SelectItem id="pro">Pro - Advanced features</SelectItem>
              <SelectItem id="enterprise" isDisabled>
                Enterprise - Coming soon
              </SelectItem>
            </SelectListBox>
          </Popover>
        </Select>
      </Flex>

      {/* Disabled Select */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Disabled Select
        </Text>
        <Text size="sm" color="lo">
          The entire select can be disabled.
        </Text>
        <Select isDisabled defaultSelectedKey="locked">
          <Label>Status</Label>
          <Button variant="outline" style={styles.selectButton}>
            <SelectValue />
            <ChevronDown size={16} {...stylex.props(styles.chevron)} />
          </Button>
          <Popover>
            <SelectListBox style={styles.listbox}>
              <SelectItem id="locked">Locked</SelectItem>
              <SelectItem id="unlocked">Unlocked</SelectItem>
            </SelectListBox>
          </Popover>
        </Select>
      </Flex>

      {/* Long List */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Scrollable List
        </Text>
        <Text size="sm" color="lo">
          Lists with many items are scrollable within a constrained height.
        </Text>
        <Select placeholder="Select a country">
          <Label>Country</Label>
          <Button variant="outline" style={styles.selectButtonWide}>
            <SelectValue />
            <ChevronDown size={16} {...stylex.props(styles.chevron)} />
          </Button>
          <Popover>
            <SelectListBox style={styles.listboxWide}>
              <SelectItem id="us">United States</SelectItem>
              <SelectItem id="uk">United Kingdom</SelectItem>
              <SelectItem id="ca">Canada</SelectItem>
              <SelectItem id="au">Australia</SelectItem>
              <SelectItem id="de">Germany</SelectItem>
              <SelectItem id="fr">France</SelectItem>
              <SelectItem id="jp">Japan</SelectItem>
              <SelectItem id="kr">South Korea</SelectItem>
              <SelectItem id="br">Brazil</SelectItem>
              <SelectItem id="mx">Mexico</SelectItem>
              <SelectItem id="in">India</SelectItem>
              <SelectItem id="cn">China</SelectItem>
            </SelectListBox>
          </Popover>
        </Select>
      </Flex>

      {/* Different Trigger Styles */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Trigger Variants
        </Text>
        <Text size="sm" color="lo">
          Select triggers can use different button variants.
        </Text>
        <Flex gap="200" wrap="wrap">
          <Select placeholder="Solid variant">
            <Button variant="solid" style={styles.selectButton}>
              <SelectValue />
              <ChevronDown size={16} {...stylex.props(styles.chevron)} />
            </Button>
            <Popover>
              <SelectListBox style={styles.listbox}>
                <SelectItem id="opt1">Option 1</SelectItem>
                <SelectItem id="opt2">Option 2</SelectItem>
                <SelectItem id="opt3">Option 3</SelectItem>
              </SelectListBox>
            </Popover>
          </Select>

          <Select placeholder="Muted variant">
            <Button variant="muted" style={styles.selectButton}>
              <SelectValue />
              <ChevronDown size={16} {...stylex.props(styles.chevron)} />
            </Button>
            <Popover>
              <SelectListBox style={styles.listbox}>
                <SelectItem id="opt1">Option 1</SelectItem>
                <SelectItem id="opt2">Option 2</SelectItem>
                <SelectItem id="opt3">Option 3</SelectItem>
              </SelectListBox>
            </Popover>
          </Select>

          <Select placeholder="Ghost variant">
            <Button variant="ghost" style={styles.selectButton}>
              <SelectValue />
              <ChevronDown size={16} {...stylex.props(styles.chevron)} />
            </Button>
            <Popover>
              <SelectListBox style={styles.listbox}>
                <SelectItem id="opt1">Option 1</SelectItem>
                <SelectItem id="opt2">Option 2</SelectItem>
                <SelectItem id="opt3">Option 3</SelectItem>
              </SelectListBox>
            </Popover>
          </Select>
        </Flex>
      </Flex>
    </Flex>
  )
}
