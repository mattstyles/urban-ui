import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { createFileRoute, Link } from '@tanstack/react-router'

const styles = stylex.create({
  container: {
    padding: '2rem',
  },
  link: {
    color: 'var(--color-primary)',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  section: {
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-surface, #f5f5f5)',
  },
})

export const Route = createFileRoute('/components/text')({
  component: TextDemo,
})

function TextDemo() {
  return (
    <Flex direction="column" gap="300" style={styles.container}>
      <Flex gap="200">
        <Link to="/" {...stylex.props(styles.link)}>
          Home
        </Link>
        <Link to="/components" {...stylex.props(styles.link)}>
          ← Components
        </Link>
      </Flex>

      <Text size="xl" weight="bold">
        Text Component
      </Text>

      <Flex direction="column" gap="200">
        <Flex direction="column" gap="100" style={styles.section}>
          <Text weight="semibold">Sizes</Text>
          <Flex direction="column">
            <Text size="xs">Extra Small Text (xs)</Text>
            <Text size="sm">Small Text (sm)</Text>
            <Text size="md">Medium Text (md)</Text>
            <Text size="lg">Large Text (lg)</Text>
            <Text size="xl">Extra Large Text (xl)</Text>
          </Flex>
        </Flex>

        <Flex direction="column" gap="100" style={styles.section}>
          <Text weight="semibold">Weights</Text>
          <Flex direction="column">
            <Text weight="light">Light Weight</Text>
            <Text weight="normal">Normal Weight</Text>
            <Text weight="medium">Medium Weight</Text>
            <Text weight="semibold">Semibold Weight</Text>
            <Text weight="bold">Bold Weight</Text>
          </Flex>
        </Flex>

        <Flex direction="column" gap="100" style={styles.section}>
          <Text weight="semibold">Tracking</Text>
          <Flex direction="column">
            <Text tracking="tight">Tight Tracking</Text>
            <Text tracking="normal">Normal Tracking</Text>
            <Text tracking="wide">Wide Tracking</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
