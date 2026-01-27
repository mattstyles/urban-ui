import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link as RouterLink } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Link } from '@urban-ui/link'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

export const Route = createFileRoute('/patterns/')({
  component: PatternsIndex,
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
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    paddingBlock: space[100],
  },
})

const patterns = [
  { to: '/patterns/button', label: 'Button' },
  { to: '/patterns/form', label: 'Form' },
  { to: '/patterns/input', label: 'Input' },
  { to: '/patterns/layout/center', label: 'Layout: Center' },
  { to: '/patterns/layout/content', label: 'Layout: Content' },
  { to: '/patterns/link', label: 'Link' },
  { to: '/patterns/listbox', label: 'Listbox' },
  { to: '/patterns/menu', label: 'Menu' },
  { to: '/patterns/popover', label: 'Popover' },
  { to: '/patterns/select', label: 'Select' },
  { to: '/patterns/text', label: 'Text' },
  { to: '/patterns/textfield', label: 'TextField' },
] as const

function PatternsIndex() {
  return (
    <Flex direction="column" gap="400" style={[styles.page]}>
      <Text size="xxl" weight="bold">
        Patterns
      </Text>

      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Table of Contents
        </Text>
        <nav aria-label="Pattern examples">
          <ul {...stylex.props(styles.list)}>
            {patterns.map(({ to, label }) => (
              <li key={to} {...stylex.props(styles.listItem)}>
                <Text>
                  <Link asChild>
                    <RouterLink to={to}>{label}</RouterLink>
                  </Link>
                </Text>
              </li>
            ))}
          </ul>
        </nav>
      </Flex>
    </Flex>
  )
}
