import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Center } from '@urban-ui/center'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

export const Route = createFileRoute('/patterns/layout/center/')({
  component: CenterPatterns,
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
  box: {
    width: 200,
    height: 200,
    backgroundColor: tone.surfaceMuted,
    borderRadius: radii.md,
  },
  smallBox: {
    width: 80,
    height: 80,
    backgroundColor: tone.solid,
    borderRadius: radii.sm,
  },
  fullHeight: {
    height: 300,
  },
  card: {
    padding: space[300],
    backgroundColor: tone.surfaceMuted,
    borderRadius: radii.md,
  },
  fill: {
    flex: 1,
  },
})

function CenterPatterns() {
  return (
    <Flex direction="column" gap="400" style={styles.page}>
      <Text size="xxl" weight="bold">
        Center Patterns
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Text size="sm" color="lo">
          Center positions children in the middle of its container.
        </Text>
        <Flex style={[styles.box]}>
          <Center>
            <Text>Centered</Text>
          </Center>
        </Flex>
      </Flex>

      {/* Full Width Centering */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Full Width Centering
        </Text>
        <Text size="sm" color="lo">
          Center with flex-grow fills available space.
        </Text>
        <Flex style={styles.fullHeight}>
          <Center style={styles.fill}>
            <Flex direction="v" gap="100" align="center" style={styles.card}>
              <Text weight="semibold">Card Title</Text>
              <Text size="sm" color="lo">
                This card is centered in the container.
              </Text>
            </Flex>
          </Center>
        </Flex>
      </Flex>

      {/* Centering Multiple Items */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Centering Multiple Items
        </Text>
        <Text size="sm" color="lo">
          Center with a Flex child to arrange multiple items.
        </Text>
        <Flex style={[styles.box, styles.fullHeight]}>
          <Center style={styles.fill}>
            <Flex direction="v" gap="200" align="center">
              <div {...stylex.props(styles.smallBox)} />
              <Text>Label</Text>
            </Flex>
          </Center>
        </Flex>
      </Flex>

      {/* Loading State Example */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Loading State Example
        </Text>
        <Text size="sm" color="lo">
          Common use case: centering a loading indicator.
        </Text>
        <Flex style={[styles.box, styles.fullHeight]}>
          <Center style={styles.fill}>
            <Flex direction="v" gap="100" align="center">
              <Text size="lg">Loading...</Text>
              <Text size="sm" color="lo">
                Please wait
              </Text>
            </Flex>
          </Center>
        </Flex>
      </Flex>

      {/* Empty State Example */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Empty State Example
        </Text>
        <Text size="sm" color="lo">
          Common use case: centering empty state content.
        </Text>
        <Flex style={[styles.box, styles.fullHeight]}>
          <Center style={styles.fill}>
            <Flex direction="v" gap="200" align="center">
              <Text size="xl" color="lo">
                No items found
              </Text>
              <Text size="sm" color="lo">
                Try adjusting your filters
              </Text>
            </Flex>
          </Center>
        </Flex>
      </Flex>
    </Flex>
  )
}
