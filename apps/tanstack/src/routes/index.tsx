import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link as RouterLink } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Link } from '@urban-ui/link'
import { Text } from '@urban-ui/text'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  container: {
    padding: space[400],
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
      <Flex direction="column" gap="100">
        <Text weight="semibold">Patterns:</Text>
        <Text>
          <Link asChild>
            <RouterLink to="/patterns">All Patterns</RouterLink>
          </Link>
        </Text>
        <Text>
          <Link asChild>
            <RouterLink to="/patterns/text">Text</RouterLink>
          </Link>
        </Text>
        <Text>
          <Link asChild>
            <RouterLink to="/patterns/link">Link</RouterLink>
          </Link>
        </Text>
      </Flex>
    </Flex>
  )
}
