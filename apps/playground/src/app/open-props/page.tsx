import * as stylex from '@stylexjs/stylex'

import { shadows } from '@stylexjs/open-props/lib/shadows.stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: base.white,
    borderRadius: radii.md,
    color: tone.fgHi,
  },
  shadow1: { boxShadow: shadows.shadow1 },
  shadow2: { boxShadow: shadows.shadow2 },
  shadow3: { boxShadow: shadows.shadow3 },
  shadow4: { boxShadow: shadows.shadow4 },
  shadow5: { boxShadow: shadows.shadow5 },
  shadow6: { boxShadow: shadows.shadow6 },
  innerShadow0: { boxShadow: shadows.innerShadow0 },
  innerShadow1: { boxShadow: shadows.innerShadow1 },
  innerShadow2: { boxShadow: shadows.innerShadow2 },
  innerShadow3: { boxShadow: shadows.innerShadow3 },
  innerShadow4: { boxShadow: shadows.innerShadow4 },
})

export default function OpenPropsPage() {
  return (
    <Flex direction="column" gap="400">
      <Text size="xl" weight="semibold">
        Open Props Shadows
      </Text>
      <Text size="lg" weight="medium">
        Drop Shadows
      </Text>

      <Flex gap="200">
        <Flex
          style={[styles.box, styles.shadow1]}
          align="center"
          justify="center"
        >
          <Text size="sm" color="current">
            shadow1
          </Text>
        </Flex>
        <Flex
          style={[styles.box, styles.shadow2]}
          align="center"
          justify="center"
        >
          <Text size="sm">shadow2</Text>
        </Flex>
        <Flex
          style={[styles.box, styles.shadow3]}
          align="center"
          justify="center"
        >
          <Text size="sm">shadow3</Text>
        </Flex>
        <Flex
          style={[styles.box, styles.shadow4]}
          align="center"
          justify="center"
        >
          <Text size="sm">shadow4</Text>
        </Flex>
        <Flex
          style={[styles.box, styles.shadow5]}
          align="center"
          justify="center"
        >
          <Text size="sm">shadow5</Text>
        </Flex>
        <Flex
          style={[styles.box, styles.shadow6]}
          align="center"
          justify="center"
        >
          <Text size="sm">shadow6</Text>
        </Flex>
      </Flex>

      <Text size="lg" weight="medium">
        Inner Shadows
      </Text>
      <Flex gap="200">
        <Flex
          style={[styles.box, styles.innerShadow0]}
          align="center"
          justify="center"
        >
          <Text size="sm">inner0</Text>
        </Flex>
        <Flex
          style={[styles.box, styles.innerShadow1]}
          align="center"
          justify="center"
        >
          <Text size="sm">inner1</Text>
        </Flex>
        <Flex
          style={[styles.box, styles.innerShadow2]}
          align="center"
          justify="center"
        >
          <Text size="sm">inner2</Text>
        </Flex>
        <Flex
          style={[styles.box, styles.innerShadow3]}
          align="center"
          justify="center"
        >
          <Text size="sm">inner3</Text>
        </Flex>
        <Flex
          style={[styles.box, styles.innerShadow4]}
          align="center"
          justify="center"
        >
          <Text size="sm">inner4</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
