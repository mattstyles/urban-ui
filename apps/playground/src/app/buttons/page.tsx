'use client'

import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { borderWidths, radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

import { AsyncButton, Mountable } from './async'
import CharactersRemaining from './chars'
import { ResizeableButtonExample } from './resizeable'
import { WorkButton, WorkButtonExample } from './work'

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
  const [isOn, setIsOn] = useState(true)
  return (
    <Flex direction="v" gap="600" asChild style={styles.page}>
      <main>
        {/* <Text asChild size="xl" weight="semibold">
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
            <WorkButtonExample variant="clear">
              <img
                src="https://placehold.co/64x64"
                alt="placeholder"
                style={{ borderRadius: '8px' }}
              />
            </WorkButtonExample>

            <WorkButtonExample>Hello world</WorkButtonExample>
          </section>
        </Flex> */}

        {/* <Flex
          direction="v"
          gap="400"
          align="flex-start"
          style={styles.container}
          asChild
        >
          <section>
            <Text asChild>
              <p>
                Testing changing button size and making sure WorkButton still
                responds correctly to the size change.
              </p>
            </Text>

            <Flex direction="v" gap="200" align="flex-start">
              <Button>{isOn ? 'Hello world' : 'Goodbye cruel world'}</Button>
              <WorkButtonExample>
                {isOn ? 'Hello world' : 'Goodbye cruel world'}
              </WorkButtonExample>
              <Button
                onPress={() => {
                  setIsOn(!isOn)
                }}
              >
                {isOn ? 'On' : 'Off'}
              </Button>
            </Flex>
          </section>
        </Flex> */}

        <Flex
          direction="v"
          gap="400"
          align="flex-start"
          style={styles.container}
          asChild
        >
          <section>
            <Text asChild>
              <p>Playground resizable button.</p>
            </Text>

            <Flex direction="v" gap="200" align="flex-start">
              <ResizeableButtonExample />
            </Flex>

            <Text asChild>
              <p>
                The transform for width applies a scale to animate the content,
                which affects the border rounding.
              </p>
            </Text>
          </section>
        </Flex>
      </main>
    </Flex>
  )
}
