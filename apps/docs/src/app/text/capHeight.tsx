import * as stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Link } from '@urban-ui/link'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'

const styles = stylex.create({
  exampleContainer: {
    backgroundColor: tone.component,
    width: 240,
  },
})

export function CapHeight() {
  return (
    <Flex direction="v" gap="400" asChild>
      <section>
        <Text size="lg" weight="medium" asChild>
          <h2>Cap height</h2>
        </Text>

        <Text asChild>
          <p>
            The cap height is the distance from the baseline to the highest
            ascender of a font. It is used to align text vertically and ensure
            that the text is properly aligned with other elements.
          </p>
        </Text>

        <Text asChild>
          <p>
            Urban UI uses{' '}
            <Link href="https://caniuse.com/?search=text-box">text-box</Link> as
            a default for text elements.
          </p>
        </Text>

        <Flex direction="v" gap="400">
          <Flex direction="h" gap="200" align="flex-start">
            <Flex style={styles.exampleContainer}>
              <Text>
                This is an example that uses the default text-box value from
                text to ensure that the layout of a Text component matches every
                other element.
              </Text>
            </Flex>
            <Flex style={styles.exampleContainer}>
              <Text textBox="none">
                Without trimming the text will align with a gap with respect to
                other elements.
              </Text>
            </Flex>
          </Flex>

          <Flex direction="h" gap="200" align="flex-start">
            <Flex direction="h">
              <Text size="xxl" weight="semibold">
                Aligned
              </Text>
              <Flex>
                <img
                  src="https://picsum.photos/240"
                  alt="Placeholder to show how the link element can wrap arbitrary content"
                />
              </Flex>
            </Flex>
            <Flex direction="h">
              <Text size="xxl" weight="semibold" textBox="none">
                Gap
              </Text>
              <Flex>
                <img
                  src="https://picsum.photos/240"
                  alt="Placeholder to show how the link element can wrap arbitrary content"
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </section>
    </Flex>
  )
}
