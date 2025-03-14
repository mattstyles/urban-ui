import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { primary as primaryTheme } from '@urban-ui/theme'
import { primary, tone } from '@urban-ui/theme/colors.stylex'

import { ButtonExample } from './button'

export default function TonePage() {
  return (
    <Flex direction="column" gap="200">
      <Text size="xl" weight="semibold">
        Colour tone examples
      </Text>
      <ButtonExample />
    </Flex>
  )
}
