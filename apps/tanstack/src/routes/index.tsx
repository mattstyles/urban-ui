import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { createFileRoute, Link } from '@tanstack/react-router'

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
    <Flex direction="column" gap="lg" style={styles.container}>
      <Text size="xl" weight="bold">
        Urban UI - TanStack Router Demo
      </Text>
      <Text>
        This application demonstrates Urban UI components with TanStack Router.
      </Text>
      <Flex direction="column" style={styles.nav}>
        <Text weight="semibold">Component Demos:</Text>
        <Link to="/components" {...stylex.props(styles.link)}>
          All Components
        </Link>
        <Link to="/components/button" {...stylex.props(styles.link)}>
          Button
        </Link>
        <Link to="/components/text" {...stylex.props(styles.link)}>
          Text
        </Link>
        <Link to="/components/flex" {...stylex.props(styles.link)}>
          Flex
        </Link>
      </Flex>
    </Flex>
  )
}
