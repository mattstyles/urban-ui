import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'

const styles = stylex.create({
  container: {
    padding: '2rem',
  },
  nav: {
    gap: '0.5rem',
  },
  link: {
    color: 'var(--color-primary)',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
})

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <Flex direction="column" gap="300" style={styles.container}>
      <Text size="xl" weight="bold">
        Urban UI - TanStack Router Demo
      </Text>
      <Text>
        This application demonstrates Urban UI components with TanStack Router.
      </Text>
      <Flex direction="column" style={styles.nav}>
        <Text weight="semibold">Patterns:</Text>
        <Link to="/patterns" {...stylex.props(styles.link)}>
          All Patterns
        </Link>
        <Link to="/patterns/text" {...stylex.props(styles.link)}>
          Text
        </Link>
      </Flex>
    </Flex>
  )
}
