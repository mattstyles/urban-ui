import * as stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'
import { FontFamilies } from './fontFamilies'
import { TextExamples } from './textExamples'
import { TextLeading } from './textLeading'
import { TextTracking } from './textTracking'
import { TextWeights } from './textWeights'

const styles = stylex.create({
  container: {
    padding: space[200],
  },
})

export default function TextPage() {
  return (
    <Flex direction="v" gap="800" style={styles.container}>
      <Flex direction="v" gap="300">
        <Text weight="semibold" size="xl" asChild>
          <h1>Text component</h1>
        </Text>
        <Text size="md" asChild>
          <p>
            The Text component is a foundational building block for typography
            in the Urban UI design system. It provides consistent text styling
            with support for different sizes, weights, and colors while
            maintaining the design system&apos;s typographic scale.
          </p>
        </Text>
        <Text size="md" asChild>
          <p>
            Urban UI text uses a fluid scale that adapts to the viewport width.
            Each size includes appropriate line height and letter spacing
            optimizations, with &apos;md&apos; serving as the baseline size.
          </p>
        </Text>
      </Flex>

      <Flex direction="v" gap="400">
        <Text size="lg" weight="medium" asChild>
          <h2>Text Sizes</h2>
        </Text>
        <TextExamples />
      </Flex>

      <Flex direction="v" gap="400">
        <Text size="lg" weight="medium" asChild>
          <h2>Font Weights</h2>
        </Text>
        <TextWeights />
      </Flex>

      <Flex direction="v" gap="400">
        <Text size="lg" weight="medium" asChild>
          <h2>Font Families</h2>
        </Text>
        <Text size="md" asChild>
          <p>
            The Text component supports three font families: display for
            headlines, body for regular text, and mono for code. Each font is
            optimized for its intended use case while maintaining consistent
            styling.
          </p>
        </Text>
        <FontFamilies />
      </Flex>

      <Flex direction="v" gap="400">
        <Text size="lg" weight="medium" asChild>
          <h2>Leading</h2>
        </Text>
        <Text size="md" asChild>
          <p>
            Line heights are optimized for each text size. Smaller text uses
            more generous line heights for improved readability, while larger
            text uses tighter line heights for headlines.
          </p>
        </Text>
        <TextLeading />
      </Flex>

      <Flex direction="v" gap="400">
        <Text size="lg" weight="medium" asChild>
          <h2>Tracking</h2>
        </Text>
        <Text size="md" asChild>
          <p>
            Letter spacing (tracking) can be adjusted to improve readability and
            create visual hierarchy. Tighter tracking works well for headlines,
            while wider tracking can enhance legibility for small text or create
            emphasis.
          </p>
        </Text>
        <TextTracking />
      </Flex>
    </Flex>
  )
}
