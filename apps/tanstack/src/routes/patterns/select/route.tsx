import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Select, SelectItem } from '@urban-ui/select'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

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
  wideSelect: {
    minWidth: 280,
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
          A simple select with label and checkmark indicators for selected
          items.
        </Text>
        <Select label="Favorite Animal" placeholder="Select an animal">
          <SelectItem id="cat">Cat</SelectItem>
          <SelectItem id="dog">Dog</SelectItem>
          <SelectItem id="rabbit">Rabbit</SelectItem>
          <SelectItem id="hamster">Hamster</SelectItem>
        </Select>
      </Flex>

      {/* Without Label */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Without Label
        </Text>
        <Text size="sm" color="lo">
          Select without a visible label (uses aria-label for accessibility).
        </Text>
        <Select aria-label="Favorite Color" placeholder="Choose a color">
          <SelectItem id="red">Red</SelectItem>
          <SelectItem id="green">Green</SelectItem>
          <SelectItem id="blue">Blue</SelectItem>
          <SelectItem id="yellow">Yellow</SelectItem>
          <SelectItem id="purple">Purple</SelectItem>
        </Select>
      </Flex>

      {/* Default Value */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Default Value
        </Text>
        <Text size="sm" color="lo">
          Select with a pre-selected default value.
        </Text>
        <Select label="T-Shirt Size" defaultSelectedKey="medium">
          <SelectItem id="xs">Extra Small</SelectItem>
          <SelectItem id="small">Small</SelectItem>
          <SelectItem id="medium">Medium</SelectItem>
          <SelectItem id="large">Large</SelectItem>
          <SelectItem id="xl">Extra Large</SelectItem>
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
        <Select
          label="Subscription Plan"
          placeholder="Select a plan"
          triggerStyle={styles.wideSelect}
        >
          <SelectItem id="free">Free - Basic features</SelectItem>
          <SelectItem id="pro">Pro - Advanced features</SelectItem>
          <SelectItem id="enterprise" isDisabled>
            Enterprise - Coming soon
          </SelectItem>
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
        <Select label="Status" isDisabled defaultSelectedKey="locked">
          <SelectItem id="locked">Locked</SelectItem>
          <SelectItem id="unlocked">Unlocked</SelectItem>
        </Select>
      </Flex>

      {/* Scrollable List */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Scrollable List
        </Text>
        <Text size="sm" color="lo">
          Lists with many items are scrollable within a constrained height.
        </Text>
        <Select
          label="Country"
          placeholder="Select a country"
          triggerStyle={styles.wideSelect}
        >
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
        </Select>
      </Flex>

      {/* Multiple Selects */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Multiple Selects
        </Text>
        <Text size="sm" color="lo">
          Multiple select components working together.
        </Text>
        <Flex gap="200" wrap="wrap">
          <Select label="Year" placeholder="Year">
            <SelectItem id="2024">2024</SelectItem>
            <SelectItem id="2025">2025</SelectItem>
            <SelectItem id="2026">2026</SelectItem>
          </Select>

          <Select label="Month" placeholder="Month">
            <SelectItem id="jan">January</SelectItem>
            <SelectItem id="feb">February</SelectItem>
            <SelectItem id="mar">March</SelectItem>
            <SelectItem id="apr">April</SelectItem>
            <SelectItem id="may">May</SelectItem>
            <SelectItem id="jun">June</SelectItem>
          </Select>

          <Select label="Day" placeholder="Day">
            <SelectItem id="1">1</SelectItem>
            <SelectItem id="2">2</SelectItem>
            <SelectItem id="3">3</SelectItem>
            <SelectItem id="15">15</SelectItem>
            <SelectItem id="28">28</SelectItem>
            <SelectItem id="30">30</SelectItem>
          </Select>
        </Flex>
      </Flex>
    </Flex>
  )
}
