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

export const Route = createFileRoute('/components/')({
  component: ComponentsIndex,
})

function ComponentsIndex() {
  return (
    <Flex direction="column" gap="lg" style={styles.container}>
      <Link to="/" {...stylex.props(styles.link)}>
        ← Back to Home
      </Link>

      <Text size="xl" weight="bold">
        Component Overview
      </Text>

      <Flex direction="column" gap="md">
        <Flex direction="column" gap="sm" style={styles.section}>
          <Text weight="semibold">Button</Text>
          <Text size="sm">Interactive button component with variants and tones.</Text>
          <Flex gap="sm">
            <Button>Default</Button>
            <Button tone="primary">Primary</Button>
            <Button tone="critical">Critical</Button>
          </Flex>
          <Link to="/components/button" {...stylex.props(styles.link)}>
            View Button Demo →
          </Link>
        </Flex>

        <Flex direction="column" gap="sm" style={styles.section}>
          <Text weight="semibold">Text</Text>
          <Text size="sm">Typography component with size and weight options.</Text>
          <Flex direction="column">
            <Text size="lg">Large Text</Text>
            <Text>Default Text</Text>
            <Text size="sm">Small Text</Text>
          </Flex>
          <Link to="/components/text" {...stylex.props(styles.link)}>
            View Text Demo →
          </Link>
        </Flex>

        <Flex direction="column" gap="sm" style={styles.section}>
          <Text weight="semibold">Flex</Text>
          <Text size="sm">Flexible layout component for arranging elements.</Text>
          <Flex gap="sm">
            <div style={{ padding: '0.5rem', backgroundColor: '#ddd' }}>Item 1</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#ddd' }}>Item 2</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#ddd' }}>Item 3</div>
          </Flex>
          <Link to="/components/flex" {...stylex.props(styles.link)}>
            View Flex Demo →
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}
