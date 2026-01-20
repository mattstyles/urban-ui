import * as stylex from '@stylexjs/stylex'
import { Button } from '@urban-ui/button'
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

export const Route = createFileRoute('/components/button')({
  component: ButtonDemo,
})

function ButtonDemo() {
  return (
    <Flex direction="column" gap="lg" style={styles.container}>
      <Flex gap="md">
        <Link to="/" {...stylex.props(styles.link)}>
          Home
        </Link>
        <Link to="/components" {...stylex.props(styles.link)}>
          ← Components
        </Link>
      </Flex>

      <Text size="xl" weight="bold">
        Button Component
      </Text>

      <Flex direction="column" gap="md">
        <Flex direction="column" gap="sm" style={styles.section}>
          <Text weight="semibold">Tones</Text>
          <Flex gap="sm" wrap="wrap">
            <Button tone="neutral">Neutral</Button>
            <Button tone="primary">Primary</Button>
            <Button tone="accent">Accent</Button>
            <Button tone="positive">Positive</Button>
            <Button tone="warning">Warning</Button>
            <Button tone="critical">Critical</Button>
            <Button tone="info">Info</Button>
          </Flex>
        </Flex>

        <Flex direction="column" gap="sm" style={styles.section}>
          <Text weight="semibold">Sizes</Text>
          <Flex gap="sm" align="center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Flex>
        </Flex>

        <Flex direction="column" gap="sm" style={styles.section}>
          <Text weight="semibold">States</Text>
          <Flex gap="sm">
            <Button>Default</Button>
            <Button isDisabled>Disabled</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
