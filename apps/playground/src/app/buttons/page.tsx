import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { borderWidths, radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

import { AsyncButton, Mountable } from './async'
import CharactersRemaining from './chars'
import { WorkButtonExample } from './work'

const styles = stylex.create({
  page: {
    padding: space[800],
  },
  container: {
    padding: space[200],
    backgroundColor: tone.surface,
    borderRadius: radii.lg,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
  },
})

export default function ButtonPage() {
  return (
    <Flex direction="v" gap="600" asChild style={styles.page}>
      <main>
        <Text asChild size="xl" weight="semibold">
          <h1>Buttons</h1>
        </Text>

        <Flex
          direction="h"
          gap="400"
          align="center"
          style={styles.container}
          asChild
        >
          <section>
            <AsyncButton />
          </section>
        </Flex>

        <Flex
          direction="h"
          gap="400"
          align="center"
          style={styles.container}
          asChild
        >
          <section>
            <Mountable>
              <AsyncButton />
            </Mountable>
          </section>
        </Flex>

        <Flex
          direction="h"
          gap="400"
          align="center"
          style={styles.container}
          asChild
        >
          <section>
            <CharactersRemaining />
          </section>
        </Flex>

        <Flex
          direction="h"
          gap="400"
          align="center"
          style={styles.container}
          asChild
        >
          <section>
            <WorkButtonExample>Hello world</WorkButtonExample>
          </section>
        </Flex>
      </main>
    </Flex>
  )
}
