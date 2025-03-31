import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
// import { critical, neutral, primary, success, warning } from '@urban-ui/theme'
import { themes } from '@urban-ui/theme'
import { tone } from '@urban-ui/theme/colors.stylex'
import { ToneBlock } from './tone'

const styles = stylex.create({
  container: {
    padding: '32px',
    maxWidth: '320px',
    minHeight: '100vh',
  },
  description: {
    marginTop: '8px',
  },
})

export default function ColorsPage() {
  return (
    <Flex direction="column" gap="300">
      <Text size="xl" weight="semibold">
        Color Tokens
      </Text>
      <Text style={styles.description} size="md">
        A comprehensive set of semantic color tokens used throughout the Urban
        UI design system.
      </Text>
      <Flex align="flex-start" direction="horizontal">
        <Flex direction="column" gap="300" style={styles.container}>
          <ToneBlock id="Tone" />
        </Flex>
        <Flex direction="column" gap="300" style={styles.container}>
          <ToneBlock id="Neutral" theme={themes.neutral} />
        </Flex>
        <Flex direction="column" gap="300" style={styles.container}>
          <ToneBlock id="Primary" theme={themes.primary} />
        </Flex>
        <Flex direction="column" gap="300" style={styles.container}>
          <ToneBlock id="Critical" theme={themes.critical} />
        </Flex>
        <Flex direction="column" gap="300" style={styles.container}>
          <ToneBlock id="Positive" theme={themes.positive} />
        </Flex>
        <Flex direction="column" gap="300" style={styles.container}>
          <ToneBlock id="Warning" theme={themes.warning} />
        </Flex>
        <Flex direction="column" gap="300" style={styles.container}>
          <ToneBlock id="Info" theme={themes.info} />
        </Flex>
        <Flex direction="column" gap="300" style={styles.container}>
          <ToneBlock id="Accent" theme={themes.accent} />
        </Flex>
      </Flex>
    </Flex>
  )
}
