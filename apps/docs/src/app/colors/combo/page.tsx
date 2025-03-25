import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
// import { critical, primary } from '@urban-ui/theme'
import { space } from '@urban-ui/theme/layout.stylex'

import { Adjacency } from './adjacency'
import { TextCombo } from './text'

const styles = stylex.create({
  page: {
    padding: space[400],
  },
})

export default function TonePage() {
  return (
    <Flex direction="column" gap="600" style={styles.page}>
      <Text size="xl">Common scale combinations</Text>
      <TextCombo />
      <Adjacency />
    </Flex>
  )
}
