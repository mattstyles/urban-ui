import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { DialogTrigger, OverlayArrow, Popover } from '@urban-ui/popover'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { Dialog } from 'react-aria-components'

export const Route = createFileRoute('/patterns/popover/')({
  component: PopoverPatterns,
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
  popoverContent: {
    padding: space[200],
    outline: 'none',
  },
  popoverWide: {
    padding: space[300],
    outline: 'none',
    maxWidth: 300,
  },
})

function PopoverPatterns() {
  return (
    <Flex direction="column" gap="400" style={styles.page}>
      <Text size="xxl" weight="bold">
        Popover Patterns
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Text size="sm" color="lo">
          A simple popover triggered by a button.
        </Text>
        <DialogTrigger>
          <Button>Open Popover</Button>
          <Popover>
            <Dialog {...stylex.props(styles.popoverContent)}>
              <Text>Hello from the popover!</Text>
            </Dialog>
          </Popover>
        </DialogTrigger>
      </Flex>

      {/* Placement Options */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Placement Options
        </Text>
        <Text size="sm" color="lo">
          Popovers can be positioned relative to their trigger.
        </Text>
        <Flex gap="200" wrap="wrap">
          <DialogTrigger>
            <Button variant="outline">Top</Button>
            <Popover placement="top">
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Positioned at top</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>

          <DialogTrigger>
            <Button variant="outline">Bottom</Button>
            <Popover placement="bottom">
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Positioned at bottom</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>

          <DialogTrigger>
            <Button variant="outline">Left</Button>
            <Popover placement="left">
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Positioned at left</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>

          <DialogTrigger>
            <Button variant="outline">Right</Button>
            <Popover placement="right">
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Positioned at right</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>
        </Flex>
      </Flex>

      {/* With Arrow */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Arrow
        </Text>
        <Text size="sm" color="lo">
          Add an arrow pointing to the trigger element.
        </Text>
        <Flex gap="200" wrap="wrap">
          <DialogTrigger>
            <Button>With Arrow (Bottom)</Button>
            <Popover placement="bottom">
              <OverlayArrow />
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Arrow points up to trigger</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>

          <DialogTrigger>
            <Button variant="outline">With Arrow (Top)</Button>
            <Popover placement="top">
              <OverlayArrow />
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Arrow points down to trigger</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>
        </Flex>
      </Flex>

      {/* Offset */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Custom Offset
        </Text>
        <Text size="sm" color="lo">
          Control the distance from the trigger with offset prop.
        </Text>
        <Flex gap="200" wrap="wrap">
          <DialogTrigger>
            <Button variant="outline">Default Offset (8px)</Button>
            <Popover>
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Default spacing</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>

          <DialogTrigger>
            <Button variant="outline">Large Offset (16px)</Button>
            <Popover offset={16}>
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>More spacing from trigger</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>

          <DialogTrigger>
            <Button variant="outline">No Offset (0px)</Button>
            <Popover offset={0}>
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Touching the trigger</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>
        </Flex>
      </Flex>

      {/* Cross Offset */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Cross Offset
        </Text>
        <Text size="sm" color="lo">
          Shift the popover along the cross axis.
        </Text>
        <Flex gap="200" wrap="wrap">
          <DialogTrigger>
            <Button variant="outline">Cross Offset (-50px)</Button>
            <Popover crossOffset={-50}>
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Shifted left</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>

          <DialogTrigger>
            <Button variant="outline">Cross Offset (50px)</Button>
            <Popover crossOffset={50}>
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Shifted right</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>
        </Flex>
      </Flex>

      {/* Rich Content */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Rich Content
        </Text>
        <Text size="sm" color="lo">
          Popovers can contain any content.
        </Text>
        <DialogTrigger>
          <Button tone="accent">User Info</Button>
          <Popover>
            <Dialog {...stylex.props(styles.popoverWide)}>
              <Flex direction="column" gap="150">
                <Text size="lg" weight="semibold">
                  John Doe
                </Text>
                <Text size="sm" color="lo">
                  Senior Developer
                </Text>
                <Text size="sm">
                  Building great user experiences with React and TypeScript.
                </Text>
                <Flex gap="100">
                  <Button size="md" variant="muted">
                    View Profile
                  </Button>
                  <Button size="md" variant="ghost">
                    Message
                  </Button>
                </Flex>
              </Flex>
            </Dialog>
          </Popover>
        </DialogTrigger>
      </Flex>

      {/* Non-Modal */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Non-Modal Popover
        </Text>
        <Text size="sm" color="lo">
          Allows interaction with elements outside the popover (useful for
          comboboxes).
        </Text>
        <Flex gap="200" align="center">
          <DialogTrigger>
            <Button variant="outline">Non-Modal</Button>
            <Popover isNonModal>
              <Dialog {...stylex.props(styles.popoverContent)}>
                <Text>Click outside - I stay open!</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>
          <Button variant="ghost" tone="neutral">
            Try clicking me
          </Button>
        </Flex>
      </Flex>

      {/* Flipping Behavior */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Flipping Behavior
        </Text>
        <Text size="sm" color="lo">
          Popovers automatically flip when there&apos;s not enough space (scroll
          down to test).
        </Text>
        <DialogTrigger>
          <Button>Auto-flip Popover</Button>
          <Popover placement="bottom">
            <Dialog {...stylex.props(styles.popoverWide)}>
              <Text>
                This popover will flip to the top if there&apos;s not enough
                space below. Try scrolling the page while this is open.
              </Text>
            </Dialog>
          </Popover>
        </DialogTrigger>
      </Flex>
    </Flex>
  )
}
