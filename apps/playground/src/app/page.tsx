import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  page: {
    padding: space[800],
  },
})

export default function Home() {
  return (
    <Flex direction="v" gap="200" style={styles.page}>
      <Text size="xxl">
        Consulem in campo et competitores tuos interficere voluisti, compressi
        fugam meditere, tu ut ullum exilium cogites? Utinam tibi
      </Text>
      <Text size="xxl" weight="bold">
        Consulem in campo et competitores tuos interficere voluisti, compressi
        fugam meditere, tu ut ullum exilium cogites? Utinam tibi
      </Text>
    </Flex>
  )
}
