import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link as RouterLink } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Icon } from '@urban-ui/icon'
import { Link } from '@urban-ui/link'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { Bell, Home, Search, Settings, User } from 'lucide-react'

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
  navItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: radii.md,
    color: tone.fgOnBlock,
    backgroundColor: {
      default: 'transparent',
      ':hover': tone.solidHover,
      ':active': tone.solidActive,
    },
    transition: 'background-color 150ms ease',
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    height: 3,
    width: {
      default: 0,
      [stylex.when.ancestor(':hover')]: 24,
    },
    backgroundColor: base.white,
    borderRadius: radii.full,
    transition: 'width 200ms ease',
    pointerEvents: 'none',
  },
})

function NavigationPatterns() {
  return (
    <Flex direction="column" gap="400" style={[styles.page]}>
      <Text size="xxl" weight="bold">
        Custom Navigation Links
      </Text>

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

interface NavItemProps {
  to: string
  icon: React.ComponentType
  label: string
}

function NavItem({ to, icon: LucideIcon, label }: NavItemProps) {
  return (
    <Link asChild variant="clear" style={[styles.navItem, stylex.defaultMarker()]}>
      <RouterLink to={to} aria-label={label}>
        <Icon size="xl">
          <LucideIcon />
        </Icon>
        <span {...stylex.props(styles.accentBar)} />
      </RouterLink>
    </Link>
  )
}
