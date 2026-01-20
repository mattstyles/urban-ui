import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link as RouterLink } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Link } from '@urban-ui/link'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

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
  section: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: tone.border,
    paddingBottom: space[300],
  },
})

function LinkPatterns() {
  return (
    <Flex direction="column" gap="400" style={[styles.page]}>
      <Text size="xxl" weight="bold">
        Link Patterns
      </Text>

      {/* Basic Link */}
      <Flex direction="v" gap="200" style={[styles.container, styles.section]}>
        <Text size="lg" weight="semibold">
          Basic Link
        </Text>
        <Flex gap="200" wrap="wrap">
          <Link href="#basic">Default link</Link>
          <Link href="#basic" variant="solid">
            Solid variant
          </Link>
          <Link href="#basic" variant="clear">
            Clear variant
          </Link>
        </Flex>
      </Flex>

      {/* Tanstack Router Integration */}
      <Flex direction="v" gap="200" style={[styles.container, styles.section]}>
        <Text size="lg" weight="semibold">
          Tanstack Router Integration
        </Text>
        <Text size="sm" color="lo">
          Use asChild to apply Link styles to RouterLink
        </Text>
        <Flex gap="200" wrap="wrap">
          <Link asChild>
            <RouterLink to="/">Home</RouterLink>
          </Link>
          <Link asChild tone="primary">
            <RouterLink to="/patterns">Patterns</RouterLink>
          </Link>
          <Link asChild tone="accent">
            <RouterLink to="/patterns/text">Text Patterns</RouterLink>
          </Link>
        </Flex>
      </Flex>

      {/* Inline Links */}
      <Flex direction="v" gap="200" style={[styles.container, styles.section]}>
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
      <Flex direction="v" gap="200" style={[styles.container, styles.section]}>
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
      </Flex>

      {/* Tones */}
      <Flex direction="v" gap="200" style={[styles.container, styles.section]}>
        <Text size="lg" weight="semibold">
          Tones
        </Text>
        <Flex gap="200" wrap="wrap">
          <Link href="#tone" tone="info">
            Info (default)
          </Link>
          <Link href="#tone" tone="neutral">
            Neutral
          </Link>
          <Link href="#tone" tone="primary">
            Primary
          </Link>
          <Link href="#tone" tone="positive">
            Positive
          </Link>
          <Link href="#tone" tone="warning">
            Warning
          </Link>
          <Link href="#tone" tone="critical">
            Critical
          </Link>
        </Flex>
      </Flex>

      {/* Navigation Pattern */}
      <Flex direction="v" gap="200" style={[styles.container]}>
        <Text size="lg" weight="semibold">
          Navigation Header Pattern
        </Text>
        <Flex
          justify="space-between"
          align="center"
          style={[themes.neutral]}
        >
          <Text size="lg" weight="bold">
            Logo
          </Text>
          <Flex gap="300">
            <Link asChild variant="solid" tone="neutral">
              <RouterLink to="/patterns">Features</RouterLink>
            </Link>
            <Link asChild variant="solid" tone="neutral">
              <RouterLink to="/patterns/text">Docs</RouterLink>
            </Link>
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
    </Flex>
  )
}
