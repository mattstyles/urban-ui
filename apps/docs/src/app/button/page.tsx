'use client'

import * as stylex from '@stylexjs/stylex'

import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Icon } from '@urban-ui/icon'
import { Text } from '@urban-ui/text'
import { borderWidths, radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

import { ChevronRight, HeartPlus, Plus } from 'lucide-react'
import * as React from 'react'
import { RxCross2, RxHeartFilled } from 'react-icons/rx'

const styles = stylex.create({
  container: {
    padding: space[200],
  },
  section: {
    backgroundColor: tone.surface,
    padding: space[300],
    borderRadius: radii.lg,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
  },
})

export default function ButtonPage() {
  return (
    <Flex direction="v" gap="500" style={styles.container}>
      <Flex direction="v" gap="400">
        <Text size="xl" weight="semibold">
          Button
        </Text>
        <Text asChild>
          <p>
            Buttons are interactive elements that trigger actions. Built on top
            of react-aria-components for robust accessibility, they support
            multiple variants and semantic color tones to communicate purpose
            and hierarchy.
          </p>
        </Text>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Variants & Tones</h2>
          </Text>
          <Text asChild>
            <p>
              Buttons come in three variants: solid, muted, and outline. Each
              variant can be combined with any of the semantic color tones to
              communicate different purposes.
            </p>
          </Text>

          <Flex direction="v" gap="500">
            <Flex direction="v" gap="200">
              <Text asChild size="md" weight="medium">
                <h3>Solid</h3>
              </Text>

              <Flex gap="200" wrap="wrap">
                <Button variant="solid" tone="neutral">
                  Neutral
                </Button>
                <Button variant="solid" tone="primary">
                  Primary
                </Button>
                <Button variant="solid" tone="accent">
                  Accent
                </Button>
                <Button variant="solid" tone="positive">
                  Positive
                </Button>
                <Button variant="solid" tone="warning">
                  Warning
                </Button>
                <Button variant="solid" tone="critical">
                  Critical
                </Button>
                <Button variant="solid" tone="info">
                  Info
                </Button>
              </Flex>
            </Flex>

            <Flex direction="v" gap="200">
              <Text asChild size="md" weight="medium">
                <h3>Muted</h3>
              </Text>

              <Flex gap="200" wrap="wrap">
                <Button variant="muted" tone="neutral">
                  Neutral
                </Button>
                <Button variant="muted" tone="primary">
                  Primary
                </Button>
                <Button variant="muted" tone="accent">
                  Accent
                </Button>
                <Button variant="muted" tone="positive">
                  Positive
                </Button>
                <Button variant="muted" tone="warning">
                  Warning
                </Button>
                <Button variant="muted" tone="critical">
                  Critical
                </Button>
                <Button variant="muted" tone="info">
                  Info
                </Button>
              </Flex>
            </Flex>

            <Flex direction="v" gap="200">
              <Text asChild size="md" weight="medium">
                <h3>Outline</h3>
              </Text>

              <Flex gap="200" wrap="wrap">
                <Button variant="outline" tone="neutral">
                  Neutral
                </Button>
                <Button variant="outline" tone="primary">
                  Primary
                </Button>
                <Button variant="outline" tone="accent">
                  Accent
                </Button>
                <Button variant="outline" tone="positive">
                  Positive
                </Button>
                <Button variant="outline" tone="warning">
                  Warning
                </Button>
                <Button variant="outline" tone="critical">
                  Critical
                </Button>
                <Button variant="outline" tone="info">
                  Info
                </Button>
              </Flex>
            </Flex>

            <Flex direction="v" gap="200">
              <Text asChild size="md" weight="medium">
                <h3>Ghost</h3>
              </Text>

              <Flex gap="200" wrap="wrap">
                <Button variant="ghost" tone="neutral">
                  Neutral
                </Button>
                <Button variant="ghost" tone="primary">
                  Primary
                </Button>
                <Button variant="ghost" tone="accent">
                  Accent
                </Button>
                <Button variant="ghost" tone="positive">
                  Positive
                </Button>
                <Button variant="ghost" tone="warning">
                  Warning
                </Button>
                <Button variant="ghost" tone="critical">
                  Critical
                </Button>
                <Button variant="ghost" tone="info">
                  Info
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>States</h2>
          </Text>
          <Text asChild>
            <p>
              Buttons respond to user interaction with hover and active states,
              and can be disabled when actions are unavailable.
            </p>
          </Text>

          <Flex gap="200" wrap="wrap">
            <Button
              onPress={() => {
                window.alert('Press')
              }}
            >
              Default
            </Button>
            <Button variant="solid" isDisabled>
              isDisabled
            </Button>
            <Button
              disabled
              tone="critical"
              onPress={() => {
                window.alert('I should not trigger')
              }}
            >
              Disabled
            </Button>
          </Flex>

          <Flex direction="v" gap="200">
            <Text asChild>
              <p>
                Buttons will flex to full width when used in a flex container.
              </p>
            </Text>
            <Button>Default</Button>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Focus styling</h2>
          </Text>

          <Flex gap="0" wrap="wrap">
            <Button tone="info">Info</Button>
            <Button tone="neutral" variant="muted">
              Neutral
            </Button>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Sizes</h2>
          </Text>

          <Flex gap="200" wrap="wrap" align="center">
            <Button size="md">md</Button>
            <Button size="lg">lg</Button>
          </Flex>

          <Text asChild>
            <p>
              Equal size clamps the aspect ratio to 1:1. Buttons will still size
              to fit the content.
            </p>
          </Text>

          <Flex gap="200" wrap="wrap" align="center">
            <Button size="md-equal">
              <Icon>
                <RxCross2 />
              </Icon>
            </Button>
            <Button size="lg-equal">
              <Icon>
                <RxCross2 />
              </Icon>
            </Button>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Shape</h2>
          </Text>

          <Flex gap="200" wrap="wrap">
            <Button shape="rounded">Rounded</Button>
            <Button shape="pill">Pill</Button>
            <Button shape="square">Square</Button>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Clear</h2>
          </Text>
          <Text asChild>
            <p>
              Buttons can be styled to be clear, removing the background and
              border, to allow applying button functionality to arbitrary
              content.
            </p>
          </Text>

          <Flex gap="0" wrap="wrap">
            <Button variant="clear">
              <CustomImage />
            </Button>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Icon</h2>
          </Text>

          <Flex gap="200" wrap="wrap" align="center">
            <div style={{ background: 'hotpink', height: 100, width: 12 }} />
            <Button variant="solid">Only text</Button>

            <Button variant="solid">
              <Icon>
                <RxHeartFilled />
              </Icon>
              Favourite
            </Button>
            <Button variant="solid">
              Activate
              <Icon size="md">
                <ChevronRight />
              </Icon>
            </Button>
            <Button variant="solid">
              <Icon size="md">
                <ChevronRight />
              </Icon>
            </Button>
            <Button size="md-equal">
              <Icon>
                <RxCross2 />
              </Icon>
            </Button>
            <Button variant="solid" size="lg">
              Button lg
            </Button>
            <Button variant="solid" size="lg">
              <Text textBox="none">Cap</Text>
              <Icon>
                <RxHeartFilled />
              </Icon>
            </Button>
            <Button variant="solid" size="lg">
              <Icon>
                <HeartPlus />
              </Icon>
            </Button>
            <Button size="lg-equal">
              <Icon>
                <RxCross2 />
              </Icon>
            </Button>
            <Button
              size="lg-equal"
              shape="pill"
              variant="outline"
              tone="neutral"
            >
              <Icon>
                <RxCross2 />
              </Icon>
            </Button>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Content</h2>
          </Text>
          <Text asChild>
            <p>
              Buttons are styled such that content is a plain text node,
              however, they come with a minimum height which has the side effect
              that passing a Text component (which uses text box cap sizing)
              will still have consistent height.
            </p>
          </Text>
          <Text asChild>
            <p>Buttons always grow to fit their content.</p>
          </Text>

          <Flex gap="200" wrap="wrap" align="center">
            <Button variant="solid">
              <Text textBox="none">Button</Text>
            </Button>
            <Button variant="solid">
              <Text textBox="none">Cap</Text>
              <Icon>
                <RxHeartFilled />
              </Icon>
            </Button>
            <Button variant="solid">
              <Text textBox="none">Add</Text>
              <Icon size="sm">
                <Plus />
              </Icon>
            </Button>
            <Button variant="solid">
              <Text>Different height</Text>
            </Button>
          </Flex>

          <Text asChild>
            <p>
              Arbitrary content can be used and the buttons will fit the
              content.
            </p>
          </Text>

          <ListSelection />
        </section>
      </Flex>
    </Flex>
  )
}

const imageStyles = stylex.create({
  base: {
    padding: space[50],
    borderRadius: radii.lg,
    borderWidth: borderWidths.md,
    borderColor: base.transparent,
    borderStyle: 'solid',
    background: tone.component,
    transition: 'border-color 200ms',

    ':hover': {
      borderColor: tone.border,
    },
  },
  image: {
    borderRadius: radii.md,
    userSelect: 'none',
    userDrag: 'none',
    pointerEvents: 'none',
  },
})

function CustomImage() {
  return (
    <Flex style={imageStyles.base}>
      <img
        {...stylex.props(imageStyles.image)}
        src="https://loremflickr.com/320/240"
        alt="Placeholder to show how the link element can wrap arbitrary content"
      />
    </Flex>
  )
}

const listSelectionStyles = stylex.create({
  container: {
    backgroundColor: tone.surfaceMuted,
    paddingBlock: space[100],
    paddingInline: space[100],
    borderRadius: radii.xl,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
    width: 320,
  },
  buttonSize: {
    padding: space[100],
  },
})

function ListSelection() {
  return (
    <Flex direction="v" style={listSelectionStyles.container}>
      <Button variant="ghost" style={listSelectionStyles.buttonSize}>
        <Flex align="center" flex="1" gap="200">
          <Icon size="xl">
            <RxHeartFilled />
          </Icon>
          <Flex direction="v" gap="100" align="flex-start" flex="1">
            <Text size="md" weight="semibold">
              Primary text
            </Text>
            <Text size="sm" weight="normal" color="lo">
              Secondary text
            </Text>
          </Flex>
        </Flex>
      </Button>
      <Button variant="ghost" style={listSelectionStyles.buttonSize}>
        <Flex align="center" flex="1" gap="200">
          <Icon size="xl">
            <RxHeartFilled />
          </Icon>
          <Flex direction="v" gap="100" align="flex-start" flex="1">
            <Text size="md" weight="semibold">
              Primary text
            </Text>
            <Text size="sm" weight="normal" color="lo">
              Secondary text
            </Text>
          </Flex>
        </Flex>
      </Button>
      <Button variant="ghost" style={listSelectionStyles.buttonSize}>
        <Flex align="center" flex="1" gap="200">
          <Icon size="xl">
            <RxHeartFilled />
          </Icon>
          <Flex direction="v" gap="100" align="flex-start" flex="1">
            <Text size="md" weight="semibold">
              Primary text
            </Text>
            <Text size="sm" weight="normal" color="lo">
              Secondary text
            </Text>
          </Flex>
        </Flex>
      </Button>
    </Flex>
  )
}
