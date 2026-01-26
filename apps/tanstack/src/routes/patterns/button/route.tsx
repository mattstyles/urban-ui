import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Icon } from '@urban-ui/icon'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Send,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/patterns/button/')({
  component: ButtonPatterns,
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
})

function ButtonPatterns() {
  return (
    <Flex direction="column" gap="400" style={[styles.page]}>
      <Text size="xxl" weight="bold">
        Button Patterns
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button>Default</Button>
          <Button tone="primary">Primary</Button>
          <Button tone="neutral">Neutral</Button>
        </Flex>
      </Flex>

      {/* Variants */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Variants
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button variant="solid" tone="primary">
            Solid
          </Button>
          <Button variant="muted" tone="primary">
            Muted
          </Button>
          <Button variant="outline" tone="primary">
            Outline
          </Button>
          <Button variant="ghost" tone="primary">
            Ghost
          </Button>
        </Flex>
        <Text size="sm" color="lo">
          Neutral tone:
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button variant="solid" tone="neutral">
            Solid
          </Button>
          <Button variant="muted" tone="neutral">
            Muted
          </Button>
          <Button variant="outline" tone="neutral">
            Outline
          </Button>
          <Button variant="ghost" tone="neutral">
            Ghost
          </Button>
        </Flex>
      </Flex>

      {/* Tones */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Tones
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button tone="primary">Primary</Button>
          <Button tone="neutral">Neutral</Button>
          <Button tone="accent">Accent</Button>
          <Button tone="positive">Positive</Button>
          <Button tone="warning">Warning</Button>
          <Button tone="critical">Critical</Button>
          <Button tone="info">Info</Button>
        </Flex>
        <Text size="sm" color="lo">
          With variant=&quot;outline&quot;:
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button tone="primary" variant="outline">
            Primary
          </Button>
          <Button tone="neutral" variant="outline">
            Neutral
          </Button>
          <Button tone="accent" variant="outline">
            Accent
          </Button>
          <Button tone="positive" variant="outline">
            Positive
          </Button>
          <Button tone="warning" variant="outline">
            Warning
          </Button>
          <Button tone="critical" variant="outline">
            Critical
          </Button>
          <Button tone="info" variant="outline">
            Info
          </Button>
        </Flex>
      </Flex>

      {/* Sizes */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Sizes
        </Text>
        <Flex gap="200" wrap="wrap" align="center">
          <Button size="md" tone="primary">
            Medium (default)
          </Button>
          <Button size="lg" tone="primary">
            Large
          </Button>
        </Flex>
        <Text size="sm" color="lo">
          Equal padding (for icon buttons):
        </Text>
        <Flex gap="200" wrap="wrap" align="center">
          <Button size="md-equal" tone="primary" aria-label="Add">
            <Icon size="md">
              <Plus />
            </Icon>
          </Button>
          <Button size="lg-equal" tone="primary" aria-label="Add">
            <Icon size="lg">
              <Plus />
            </Icon>
          </Button>
        </Flex>
      </Flex>

      {/* Shapes */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Shapes
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button shape="rounded" tone="primary">
            Rounded (default)
          </Button>
          <Button shape="pill" tone="primary">
            Pill
          </Button>
          <Button shape="square" tone="primary">
            Square
          </Button>
        </Flex>
      </Flex>

      {/* Disabled State */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Disabled State
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button isDisabled variant="solid" tone="primary">
            Disabled Solid
          </Button>
          <Button isDisabled variant="outline" tone="primary">
            Disabled Outline
          </Button>
          <Button isDisabled variant="ghost" tone="primary">
            Disabled Ghost
          </Button>
        </Flex>
      </Flex>

      {/* Pending State */}
      <PendingStateSection />

      {/* Common Patterns */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Common Patterns
        </Text>
        <Text size="sm" color="lo">
          Form actions:
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button variant="solid" tone="primary">
            Save Changes
          </Button>
          <Button variant="ghost" tone="neutral">
            Cancel
          </Button>
        </Flex>
        <Text size="sm" color="lo">
          Destructive confirmation:
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button variant="solid" tone="critical">
            Delete
          </Button>
          <Button variant="outline" tone="neutral">
            Cancel
          </Button>
        </Flex>
        <Text size="sm" color="lo">
          Action group:
        </Text>
        <Flex gap="100" wrap="wrap">
          <Button
            variant="ghost"
            tone="neutral"
            size="md-equal"
            aria-label="Previous"
          >
            <Icon size="md">
              <ChevronLeft />
            </Icon>
          </Button>
          <Button
            variant="ghost"
            tone="neutral"
            size="md-equal"
            aria-label="Next"
          >
            <Icon size="md">
              <ChevronRight />
            </Icon>
          </Button>
        </Flex>
      </Flex>

      {/* Buttons with Icons */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Buttons with Icons
        </Text>
        <Text size="sm" color="lo">
          Prefix icon:
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button tone="primary">
            <Icon size="sm">
              <Plus />
            </Icon>
            Add Item
          </Button>
          <Button tone="positive">
            <Icon size="sm">
              <Download />
            </Icon>
            Download
          </Button>
          <Button tone="critical">
            <Icon size="sm">
              <Trash2 />
            </Icon>
            Delete
          </Button>
        </Flex>
        <Text size="sm" color="lo">
          Suffix icon:
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button tone="primary">
            Continue
            <Icon size="sm">
              <ArrowRight />
            </Icon>
          </Button>
          <Button tone="accent">
            Send
            <Icon size="sm">
              <Send />
            </Icon>
          </Button>
        </Flex>
        <Text size="sm" color="lo">
          Large size with icons:
        </Text>
        <Flex gap="200" wrap="wrap">
          <Button tone="primary" size="lg">
            <Icon size="md">
              <Plus />
            </Icon>
            Create New
          </Button>
          <Button tone="neutral" size="lg" variant="outline">
            Learn More
            <Icon size="md">
              <ArrowRight />
            </Icon>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

function PendingStateSection() {
  const [isPending, setIsPending] = useState(false)

  const handlePress = () => {
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
    }, 2000)
  }

  return (
    <Flex direction="v" gap="200" style={styles.container}>
      <Text size="lg" weight="semibold">
        Pending State
      </Text>
      <Text size="sm" color="lo">
        Shows a loading spinner while maintaining button dimensions. Click to
        simulate a 2 second async operation:
      </Text>
      <Flex gap="200" wrap="wrap">
        <Button isPending={isPending} onPress={handlePress} tone="primary">
          Save Changes
        </Button>
        <Button
          isPending={isPending}
          onPress={handlePress}
          tone="primary"
          variant="outline"
        >
          Save Changes
        </Button>
        <Button
          isPending={isPending}
          onPress={handlePress}
          tone="neutral"
          variant="muted"
        >
          Save Changes
        </Button>
      </Flex>
      <Text size="sm" color="lo">
        With icons:
      </Text>
      <Flex gap="200" wrap="wrap">
        <Button isPending={isPending} onPress={handlePress} tone="positive">
          <Icon size="sm">
            <Download />
          </Icon>
          Download
        </Button>
        <Button isPending={isPending} onPress={handlePress} tone="critical">
          <Icon size="sm">
            <Trash2 />
          </Icon>
          Delete
        </Button>
      </Flex>
      <Text size="sm" color="lo">
        Icon-only (md-equal):
      </Text>
      <Flex gap="200" wrap="wrap">
        <Button
          isPending={isPending}
          onPress={handlePress}
          tone="primary"
          size="md-equal"
          aria-label="Add"
        >
          <Icon size="md">
            <Plus />
          </Icon>
        </Button>
        <Button
          isPending={isPending}
          onPress={handlePress}
          tone="positive"
          size="md-equal"
          aria-label="Download"
        >
          <Icon size="md">
            <Download />
          </Icon>
        </Button>
        <Button
          isPending={isPending}
          onPress={handlePress}
          tone="critical"
          size="md-equal"
          variant="outline"
          aria-label="Delete"
        >
          <Icon size="md">
            <Trash2 />
          </Icon>
        </Button>
        <Button
          isPending={isPending}
          onPress={handlePress}
          tone="neutral"
          size="md-equal"
          variant="ghost"
          aria-label="Send"
        >
          <Icon size="md">
            <Send />
          </Icon>
        </Button>
      </Flex>
      <Text size="sm" color="lo">
        Always pending (static examples):
      </Text>
      <Flex gap="200" wrap="wrap">
        <Button isPending tone="primary">
          Saving...
        </Button>
        <Button isPending tone="accent" variant="outline">
          Loading
        </Button>
        <Button isPending tone="neutral" variant="ghost">
          Please wait
        </Button>
      </Flex>
    </Flex>
  )
}
