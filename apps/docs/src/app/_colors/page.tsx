import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { tokens } from '@urban-ui/theme/_colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { ColorBlock } from './colorBlock'
import { InteractiveBlock } from './interactiveBlock'

const styles = stylex.create({
  container: {
    padding: space[200],
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: space[200],
  },
})

export default function ColorsPage() {
  return (
    <Flex direction="v" gap="400">
      <Flex direction="v" gap="200" style={[styles.container]}>
        <Text size="xl" weight="semibold">
          Color Themes
        </Text>
        <div {...stylex.props(styles.grid)}>
          <ColorBlock title="Neutral" theme="neutral" />
          <ColorBlock title="Neutral Faded" theme="neutralFaded" />
          <ColorBlock title="Accent" theme="accent" />
          <ColorBlock title="Info" theme="info" />
          <ColorBlock title="Positive" theme="positive" />
          <ColorBlock title="Warning" theme="warning" />
          <ColorBlock title="Danger" theme="danger" />
        </div>
      </Flex>
      <Flex direction="v" gap="200" style={[styles.container]}>
        <Text size="xl" weight="semibold">
          Interactive modifiers
        </Text>
        <div {...stylex.props(styles.grid)}>
          <InteractiveBlock title="Neutral" theme="neutral" />
          <InteractiveBlock title="Neutral Faded" theme="neutralFaded" />
          <InteractiveBlock title="Accent" theme="accent" />
          <InteractiveBlock title="Info" theme="info" />
          <InteractiveBlock title="Positive" theme="positive" />
          <InteractiveBlock title="Warning" theme="warning" />
          <InteractiveBlock title="Danger" theme="danger" />
        </div>
      </Flex>
    </Flex>
  )
}
