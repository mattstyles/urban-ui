import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link as RouterLink } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Link } from '@urban-ui/link'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { Bell, Home, Search, Settings, User } from 'lucide-react'

import { NavItem } from './nav-item'

export const Route = createFileRoute('/patterns/link/')({
  component: LinkPatterns,
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

function LinkPatterns() {
  return (
    <Flex direction="column" gap="400" style={[styles.page]}>
      <Text size="xxl" weight="bold">
        Link Patterns
      </Text>

      {/* Basic Link */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Link
        </Text>
        <Flex gap="200" wrap="wrap">
          <Text>
            <Link href="#basic">Default link</Link>
          </Text>
          <Text>
            <Link href="#basic" variant="solid">
              Solid variant
            </Link>
          </Text>
          <Text>
            <Link href="#basic" variant="clear">
              Clear variant
            </Link>
          </Text>
        </Flex>
      </Flex>

      {/* Tanstack Router Integration */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Tanstack Router Integration
        </Text>
        <Text size="sm" color="lo">
          Use asChild to apply Link styles to RouterLink
        </Text>
        <Flex gap="200" wrap="wrap">
          <Text>
            <Link asChild>
              <RouterLink to="/">Home</RouterLink>
            </Link>
          </Text>
          <Text>
            <Link asChild tone="primary">
              <RouterLink to="/patterns">Patterns</RouterLink>
            </Link>
          </Text>
          <Text>
            <Link asChild tone="accent">
              <RouterLink to="/patterns/text">Text Patterns</RouterLink>
            </Link>
          </Text>
        </Flex>
      </Flex>

      {/* Inline Links */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Inline Links
        </Text>
        <Text>
          Read the <Link href="#docs">documentation</Link> for more information.
        </Text>
        <Text>
          Visit your{' '}
          <Link asChild>
            <RouterLink to="/patterns">patterns page</RouterLink>
          </Link>{' '}
          to see examples.
        </Text>
        <Text size="lg">
          Links <Link href="#inherit">inherit size</Link> from parent text.
        </Text>
      </Flex>

      {/* Button-styled Links */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Button-styled Links
        </Text>
        <Flex gap="200" wrap="wrap">
          <Link href="#cta" display="button" variant="solid" tone="primary">
            Get Started
          </Link>
          <Link href="#cta" display="button" variant="ghost" tone="neutral">
            Sign In
          </Link>
          <Link href="#cta" display="button" variant="outline" tone="neutral">
            Learn More
          </Link>
        </Flex>
        <Text size="sm" color="lo">
          With Tanstack Router:
        </Text>
        <Flex gap="200" wrap="wrap">
          <Link asChild display="button" variant="solid" tone="primary">
            <RouterLink to="/patterns">View Patterns</RouterLink>
          </Link>
          <Link asChild display="button" variant="ghost" tone="neutral">
            <RouterLink to="/">Back Home</RouterLink>
          </Link>
        </Flex>
        <Text size="sm" color="lo">
          With icons (tests gap styling):
        </Text>
        <Flex gap="200" wrap="wrap">
          <Link href="#icon" display="button" variant="solid" tone="primary">
            <Home size="1em" />
            Home
          </Link>
          <Link href="#icon" display="button" variant="muted" tone="neutral">
            <Settings size="1em" />
            Settings
          </Link>
          <Link href="#icon" display="button" variant="outline" tone="accent">
            <Search size="1em" />
            Search
          </Link>
          <Link href="#icon" display="button" variant="ghost" tone="info">
            <Bell size="1em" />
            Notifications
          </Link>
          <Link href="#icon" display="button" variant="solid" tone="positive">
            <User size="1em" />
            Profile
          </Link>
        </Flex>
        <Text size="sm" color="lo">
          Icon on right side:
        </Text>
        <Flex gap="200" wrap="wrap">
          <Link href="#icon" display="button" variant="solid" tone="primary">
            Continue
            <Search size="1em" />
          </Link>
          <Link href="#icon" display="button" variant="outline" tone="neutral">
            Open Settings
            <Settings size="1em" />
          </Link>
        </Flex>
      </Flex>

      {/* Tones */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Tones
        </Text>
        <Flex gap="200" wrap="wrap">
          <Text>
            <Link href="#tone" tone="info">
              Info (default)
            </Link>
          </Text>
          <Text>
            <Link href="#tone" tone="neutral">
              Neutral
            </Link>
          </Text>
          <Text>
            <Link href="#tone" tone="primary">
              Primary
            </Link>
          </Text>
          <Text>
            <Link href="#tone" tone="positive">
              Positive
            </Link>
          </Text>
          <Text>
            <Link href="#tone" tone="warning">
              Warning
            </Link>
          </Text>
          <Text>
            <Link href="#tone" tone="critical">
              Critical
            </Link>
          </Text>
        </Flex>
        <Text size="sm" color="lo">
          With variant=&quot;solid&quot;:
        </Text>
        <Flex gap="200" wrap="wrap">
          <Text>
            <Link href="#tone" tone="info" variant="solid">
              Info (default)
            </Link>
          </Text>
          <Text>
            <Link href="#tone" tone="neutral" variant="solid">
              Neutral
            </Link>
          </Text>
          <Text>
            <Link href="#tone" tone="primary" variant="solid">
              Primary
            </Link>
          </Text>
          <Text>
            <Link href="#tone" tone="positive" variant="solid">
              Positive
            </Link>
          </Text>
          <Text>
            <Link href="#tone" tone="warning" variant="solid">
              Warning
            </Link>
          </Text>
          <Text>
            <Link href="#tone" tone="critical" variant="solid">
              Critical
            </Link>
          </Text>
        </Flex>
      </Flex>

      {/* Navigation Pattern */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Navigation Header Pattern
        </Text>
        <Flex justify="space-between" align="center" style={[themes.neutral]}>
          <Text size="lg" weight="bold">
            Logo
          </Text>
          <Flex gap="300">
            <Text>
              <Link asChild variant="solid" tone="neutral">
                <RouterLink to="/patterns">Features</RouterLink>
              </Link>
            </Text>
            <Text>
              <Link asChild variant="solid" tone="neutral">
                <RouterLink to="/patterns/text">Docs</RouterLink>
              </Link>
            </Text>
          </Flex>
          <Flex gap="100">
            <Link asChild display="button" variant="ghost" tone="neutral">
              <RouterLink to="/">Sign In</RouterLink>
            </Link>
            <Link asChild display="button" variant="solid" tone="primary">
              <RouterLink to="/patterns">Get Started</RouterLink>
            </Link>
          </Flex>
        </Flex>
      </Flex>

      {/* Icon Navigation Bar */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Icon Navigation Bar
        </Text>
        <Text size="sm" color="lo">
          Custom styled links with hover accent bar using variant="clear"
        </Text>

        <Flex gap="50" style={[styles.nav, themes.primary]}>
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/patterns" icon={Search} label="Search" />
          <NavItem to="/patterns/link" icon={Bell} label="Notifications" />
          <NavItem to="/patterns/text" icon={User} label="Profile" />
          <NavItem to="/patterns/button" icon={Settings} label="Settings" />
        </Flex>
      </Flex>

      {/* Navigation Tones */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Navigation Tones
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

        <Text size="sm" color="lo">
          This pattern uses Link with variant="clear" to remove default link
          styling, then applies custom styles via the style prop. The accent bar
          uses CSS transitions on width with absolute positioning.
        </Text>
      </Flex>
    </Flex>
  )
}
