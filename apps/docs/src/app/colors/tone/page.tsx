import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { space } from '@urban-ui/theme/layout.stylex'

import { ButtonExample } from './button'
import { MenuExample } from './menu'
import { TextExample } from './text'

const styles = stylex.create({
  page: {
    padding: space[400],
  },
})

export default function TonePage() {
  return (
    <Flex direction="column" gap="600" style={styles.page}>
      <TextExample />
      <MenuExample />
      <Flex direction="v" gap="200">
        <Text size="xl" weight="semibold">
          Colour tone examples
        </Text>
        <ButtonExample />
        <div {...stylex.props(themes.primary)}>
          <ButtonExample />
        </div>
        <div {...stylex.props(themes.critical)}>
          <ButtonExample />
        </div>
        <div {...stylex.props(themes.warning)}>
          <ButtonExample />
        </div>
        <div {...stylex.props(themes.positive)}>
          <ButtonExample />
        </div>
        <div {...stylex.props(themes.info)}>
          <ButtonExample />
        </div>
        <div {...stylex.props(themes.accent)}>
          <ButtonExample />
        </div>
      </Flex>
    </Flex>
  )
}
