import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { critical, neutral, primary, success, warning } from '@urban-ui/theme'

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
        <div {...stylex.props(primary)}>
          <ButtonExample />
        </div>
        <div {...stylex.props(critical)}>
          <ButtonExample />
        </div>
        <div {...stylex.props(success)}>
          <ButtonExample />
        </div>
        <div {...stylex.props(warning)}>
          <ButtonExample />
        </div>
      </Flex>
    </Flex>
  )
}
