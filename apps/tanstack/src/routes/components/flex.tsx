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
  box: {
    padding: '0.75rem 1rem',
    backgroundColor: 'var(--color-primary, #0066cc)',
    color: 'white',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
  },
  demoContainer: {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.25rem',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
})

export const Route = createFileRoute('/components/flex')({
  component: FlexDemo,
})

function FlexDemo() {
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
        Flex Component
      </Text>

      <Flex direction="column" gap="200">
        <Flex direction="column" gap="100" style={styles.section}>
          <Text weight="semibold">Direction: Row (default)</Text>
          <div {...stylex.props(styles.demoContainer)}>
            <Flex gap="100">
              <div {...stylex.props(styles.box)}>Item 1</div>
              <div {...stylex.props(styles.box)}>Item 2</div>
              <div {...stylex.props(styles.box)}>Item 3</div>
            </Flex>
          </div>
        </Flex>

        <Flex direction="column" gap="100" style={styles.section}>
          <Text weight="semibold">Direction: Column</Text>
          <div {...stylex.props(styles.demoContainer)}>
            <Flex direction="column" gap="100">
              <div {...stylex.props(styles.box)}>Item 1</div>
              <div {...stylex.props(styles.box)}>Item 2</div>
              <div {...stylex.props(styles.box)}>Item 3</div>
            </Flex>
          </div>
        </Flex>

        <Flex direction="column" gap="100" style={styles.section}>
          <Text weight="semibold">Gap Sizes</Text>
          <Flex direction="column" gap="200">
            <Text size="sm">gap="50"</Text>
            <div {...stylex.props(styles.demoContainer)}>
              <Flex gap="50">
                <div {...stylex.props(styles.box)}>1</div>
                <div {...stylex.props(styles.box)}>2</div>
                <div {...stylex.props(styles.box)}>3</div>
              </Flex>
            </div>
            <Text size="sm">gap="200"</Text>
            <div {...stylex.props(styles.demoContainer)}>
              <Flex gap="200">
                <div {...stylex.props(styles.box)}>1</div>
                <div {...stylex.props(styles.box)}>2</div>
                <div {...stylex.props(styles.box)}>3</div>
              </Flex>
            </div>
            <Text size="sm">gap="400"</Text>
            <div {...stylex.props(styles.demoContainer)}>
              <Flex gap="400">
                <div {...stylex.props(styles.box)}>1</div>
                <div {...stylex.props(styles.box)}>2</div>
                <div {...stylex.props(styles.box)}>3</div>
              </Flex>
            </div>
          </Flex>
        </Flex>

        <Flex direction="column" gap="100" style={styles.section}>
          <Text weight="semibold">Alignment</Text>
          <Flex direction="column" gap="200">
            <Text size="sm">justify="center"</Text>
            <div {...stylex.props(styles.demoContainer)}>
              <Flex justify="center" gap="100">
                <div {...stylex.props(styles.box)}>1</div>
                <div {...stylex.props(styles.box)}>2</div>
              </Flex>
            </div>
            <Text size="sm">justify="space-between"</Text>
            <div {...stylex.props(styles.demoContainer)}>
              <Flex justify="space-between">
                <div {...stylex.props(styles.box)}>1</div>
                <div {...stylex.props(styles.box)}>2</div>
              </Flex>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
