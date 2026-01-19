import * as stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { borderWidths, radii } from '@urban-ui/theme/borders.stylex'
import { base, neutral, surface, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { shadows } from '@urban-ui/theme/shadows.stylex'

import { shadows as tonalShadows } from '@urban-ui/theme/xstyle'

const styles = stylex.create({
  block: {
    borderRadius: radii.md,
  },
  blockNeutral: {
    backgroundColor: neutral.surfaceMuted,
  },
  blockH: {
    width: 240,
    aspectRatio: 2.2,
  },
  blockS: {
    width: 196,
    aspectRatio: 1,
  },
  section: {
    backgroundColor: tone.surface,
    paddingInline: space[800],
    paddingTop: space[400],
    paddingBottom: space[800],
    borderRadius: radii.lg,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
  },
  tonalContainer: {
    backgroundColor: tone.surface,
    padding: space[800],
  },
})

const baseShadows = stylex.create({
  sm: {
    boxShadow: shadows.sm,
    transform: 'scale(0.7)',
  },
  md: {
    boxShadow: shadows.md,
    transform: 'scale(0.85)',
  },
  lg: {
    boxShadow: shadows.lg,
  },
})

// const tonalShadows = stylex.create({
//   sm: {
//     boxShadow: tonal.sm,
//   },
//   md: {
//     boxShadow: tonal.md,
//   },
//   lg: {
//     boxShadow: tonal.lg,
//   },
//   test: {
//     boxShadow: `0px 0px 1px 30px ${tone.shadow}`,
//   },
// })

export default function ShadowsPage() {
  return (
    <Flex direction="v" gap="800" asChild>
      <main>
        <Flex direction="v" gap="400">
          <Text size="xl" weight="semibold">
            Shadows
          </Text>
          <Text asChild>
            <p>
              Shadows are used to create depth and hierarchy in the UI. They use
              a hybrid approach combining CSS Custom Properties for theming with
              StyleX for static styles.
            </p>
          </Text>
        </Flex>
        <Flex direction="v" gap="400" asChild>
          <section>
            <Text size="lg" weight="medium" asChild>
              <h2>Tones</h2>
            </Text>
            <Text asChild>
              <p>
                Shadows default to using the neutral tone, but can be used with
                other tones. The tone should match that of the background.
              </p>
            </Text>
            <Flex direction="v" gap="400" style={styles.section}>
              <Text size="sm" weight="medium" asChild>
                <h3>Base shadows use the neutral tone exclusively</h3>
              </Text>
              <Flex gap="800" wrap="wrap">
                <Block shadow="sm" />
                <Block shadow="md" />
                <Block shadow="lg" />
              </Flex>
            </Flex>

            <Flex direction="v" gap="400">
              <Text size="sm" weight="medium" asChild>
                <h3>
                  Tonal shadows use the tone associated with this rendering tree
                </h3>
              </Text>
              <Flex gap="800" wrap="wrap">
                <ThemedBlock theme="neutral" shadow="md" />
                <ThemedBlock theme="primary" shadow="md" />
                <ThemedBlock theme="positive" shadow="md" />
                <ThemedBlock theme="critical" shadow="md" />
                <ThemedBlock theme="warning" shadow="md" />
                <ThemedBlock theme="accent" shadow="md" />
                <ThemedBlock theme="info" shadow="md" />
              </Flex>
            </Flex>
          </section>
        </Flex>
      </main>
    </Flex>
  )
}

function Block({ shadow }: { shadow: keyof typeof baseShadows }) {
  return (
    <Flex
      style={[
        styles.block,
        styles.blockNeutral,
        styles.blockH,
        baseShadows[shadow],
      ]}
    />
  )
}

function ThemedBlock({
  theme,
  shadow,
}: {
  theme: keyof typeof themes
  shadow: keyof typeof baseShadows
}) {
  return (
    <Flex style={[themes[theme], styles.tonalContainer, tonalShadows]}>
      <Flex
        style={[
          styles.block,
          styles.blockNeutral,
          styles.blockS,
          baseShadows[shadow],
        ]}
      />
    </Flex>
  )
}
