import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { Bell, Home, Search, Settings, User } from 'lucide-react'

import { NavItem } from './nav-item'

export const Route = createFileRoute('/patterns/link/navigation')({
  component: NavigationPatterns,
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
  nav: {
    backgroundColor: tone.solid,
    borderRadius: radii.md,
    padding: space[100],
  },
})

function NavigationPatterns() {
  return (
    <Flex direction="column" gap="400" style={[styles.page]}>
      <Text size="xxl" weight="bold">
        Custom Navigation Links
      </Text>

      <div {...stylex.props(themes.accent)}>
        <NavItem to="/" icon={Home} label="Home" />
      </div>

      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Navigation
        </Text>
      </Flex>

      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Icon Navigation Bar
        </Text>
        <Text size="sm" color="lo">
          Custom styled links with hover accent bar using
          variant=&quot;clear&quot;
        </Text>

        <Flex gap="50" style={[styles.nav, themes.primary]}>
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/patterns" icon={Search} label="Search" />
          <NavItem to="/patterns/link" icon={Bell} label="Notifications" />
          <NavItem to="/patterns/text" icon={User} label="Profile" />
          <NavItem
            to="/patterns/link/navigation"
            icon={Settings}
            label="Settings"
          />
        </Flex>
      </Flex>

      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Different Tones
        </Text>

        <Flex gap="300" wrap="wrap">
          <Flex gap="50" style={[styles.nav, themes.accent]}>
            <NavItem to="/" icon={Home} label="Home" />
            <NavItem to="/patterns" icon={Search} label="Search" />
            <NavItem to="/patterns/link" icon={Settings} label="Settings" />
          </Flex>

          <Flex gap="50" style={[styles.nav, themes.neutral]}>
            <NavItem to="/" icon={Home} label="Home" />
            <NavItem to="/patterns" icon={Search} label="Search" />
            <NavItem to="/patterns/link" icon={Settings} label="Settings" />
          </Flex>

          <Flex gap="50" style={[styles.nav, themes.positive]}>
            <NavItem to="/" icon={Home} label="Home" />
            <NavItem to="/patterns" icon={Search} label="Search" />
            <NavItem to="/patterns/link" icon={Settings} label="Settings" />
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Implementation Notes
        </Text>
        <Text size="sm" color="lo">
          This pattern uses Link with variant=&quot;clear&quot; to remove
          default link styling, then applies custom styles via the style prop.
          The accent bar uses CSS transitions on width with absolute positioning
          to avoid affecting layout. Hover and active states are managed through
          StyleX pseudo-selectors.
        </Text>
      </Flex>
    </Flex>
  )
}
