import * as stylex from '@stylexjs/stylex'

import { shadows } from '@stylexjs/open-props/lib/shadows.stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { radii } from '@urban-ui/theme/borders.stylex'
import {
  accent,
  base,
  critical,
  neutral,
  surface,
  tone,
} from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: base.white,
    borderRadius: radii.md,
    color: tone.fgHi,
  },
  boxSurround: {
    padding: space[800],
    backgroundColor: tone.surface,
  },
  container: {
    padding: space[600],
    // backgroundColor: critical.surface,
  },
  neutralContainer: {
    padding: space[600],
    backgroundColor: surface.muted,
  },
})

export default function OpenPropsPage() {
  return (
    <Flex direction="column" gap="400">
      <Text size="xl" weight="semibold">
        Open props shadows
      </Text>

      <Flex gap="200" direction="v">
        <Text size="lg" weight="medium">
          Drop shadows
        </Text>
        <Flex gap="200">
          <OpenShadow shadow="shadow1">shadow1</OpenShadow>
          <OpenShadow shadow="shadow2">shadow2</OpenShadow>
          <OpenShadow shadow="shadow3">shadow3</OpenShadow>
          <OpenShadow shadow="shadow4">shadow4</OpenShadow>
          <OpenShadow shadow="shadow5">shadow5</OpenShadow>
          <OpenShadow shadow="shadow6">shadow6</OpenShadow>
        </Flex>
      </Flex>

      <Flex gap="200" direction="v">
        <Text size="lg" weight="medium">
          Inner shadows
        </Text>
        <Flex gap="200">
          <OpenShadow shadow="innerShadow0">inner0</OpenShadow>
          <OpenShadow shadow="innerShadow1">inner1</OpenShadow>
          <OpenShadow shadow="innerShadow2">inner2</OpenShadow>
          <OpenShadow shadow="innerShadow3">inner3</OpenShadow>
          <OpenShadow shadow="innerShadow4">inner4</OpenShadow>
        </Flex>
      </Flex>

      <Flex gap="200" direction="v">
        <Text size="lg" weight="medium">
          More shadows
        </Text>
        <Text size="md" weight="medium">
          By tone
        </Text>
        <Flex gap="900" wrap="wrap" style={styles.container}>
          <CustomShadow tone="primary" shadow="md">
            Primary
          </CustomShadow>
          <CustomShadow tone="accent" shadow="md">
            Accent
          </CustomShadow>
          <CustomShadow tone="critical" shadow="md">
            Critical
          </CustomShadow>
          <CustomShadow tone="info" shadow="md">
            Info
          </CustomShadow>
          <CustomShadow tone="neutral" shadow="md">
            Neutral
          </CustomShadow>
          <CustomShadow tone="positive" shadow="md">
            Positive
          </CustomShadow>
          <CustomShadow tone="warning" shadow="md">
            Warning
          </CustomShadow>
        </Flex>
      </Flex>

      <Flex gap="200" direction="v">
        <Text size="lg" weight="medium">
          More shadows
        </Text>
        <Text size="md" weight="medium">
          By elevation
        </Text>
        <Flex gap="900" wrap="wrap" style={styles.neutralContainer}>
          <CustomShadow tone="neutral" shadow="sm">
            Neutral
          </CustomShadow>
          <CustomShadow tone="neutral" shadow="md">
            Neutral
          </CustomShadow>
          <CustomShadow tone="neutral" shadow="lg">
            Neutral
          </CustomShadow>
        </Flex>
      </Flex>
    </Flex>
  )
}

const openShadows = stylex.create({
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

function OpenShadow({
  shadow,
  children,
}: React.PropsWithChildren<{ shadow: keyof typeof openShadows }>) {
  return (
    <Flex
      style={[styles.box, openShadows[shadow]]}
      align="center"
      justify="center"
    >
      <Text size="sm">{children}</Text>
    </Flex>
  )
}

const customShadows = stylex.create({
  // sm: {
  //   boxShadow: `
  //   0px 0.8px 0.9px oklch(from ${tone.surface} calc(l * 0.77) calc(c * 0.5) h / 0.34),
  //   0px 2.7px 3.2px -2.2px oklch(from ${tone.surface} calc(l * 0.77) calc(c * 0.5) h / 0.39)`,
  // },
  // md: {
  //   boxShadow: `
  //     0px 0.8px 0.9px oklch(from ${tone.surface} calc(l * 0.77) calc(c * 0.5) h / 0.32),
  //   0px 3.6px 4.2px -1.1px oklch(from ${tone.surface} calc(l * 0.77) calc(c * 0.5) h / 0.35),
  //   0px 13.3px 15.6px -2.2px oklch(from ${tone.surface} calc(l * 0.77) calc(c * 0.5) h / 0.38)
  //   `,
  // },
  // lg: {
  //   boxShadow: `
  //   0px 0.8px 0.9px oklch(from ${tone.surface} calc(l * 0.77) calc(c * 0.5) h / 0.36),
  //   0px 6.1px 6.1px -0.5px oklch(from ${tone.surface} calc(l * 0.77) calc(c * 0.5) h / 0.37),
  //   0px 13.8px 16.1px -1.1px oklch(from ${tone.surface} calc(l * 0.77) calc(c * 0.5) h / 0.39),
  //   0px 29.1px 34px -1.6px oklch(from ${tone.surface} calc(l * 0.77) calc(c * 0.5) h / 0.41),
  //   0px 57.3px 67px -2.2px oklch(from ${tone.surface} calc(l * 0.77) calc(c * 0.5) h / 0.43);
  //   `,
  // },
  sm: {
    boxShadow: `
    0px 0.8px 0.9px oklch(from ${tone.shadow} l c h / 0.34),
    0px 2.7px 3.2px -2.2px oklch(from ${tone.shadow} l c h / 0.39)`,
  },
  md: {
    boxShadow: `
      0px 0.8px 0.9px oklch(from ${tone.shadow} l c h / 0.32),
    0px 3.6px 4.2px -1.1px oklch(from ${tone.shadow} l c h / 0.35),
    0px 13.3px 15.6px -2.2px oklch(from ${tone.shadow} l c h / 0.38)
    `,
  },
  lg: {
    boxShadow: `
    0px 0.8px 0.9px oklch(from ${tone.shadow} l c h / 0.36),
    0px 6.1px 6.1px -0.5px oklch(from ${tone.shadow} l c h/ 0.37),
    0px 13.8px 16.1px -1.1px oklch(from ${tone.shadow} l c h / 0.39),
    0px 29.1px 34px -1.6px oklch(from ${tone.shadow} l c h / 0.41),
    0px 57.3px 67px -2.2px oklch(from ${tone.shadow} l c h / 0.43);
    `,
  },
})

function CustomShadow({
  shadow,
  tone,
  children,
}: React.PropsWithChildren<{
  shadow: keyof typeof customShadows
  tone: keyof typeof themes
}>) {
  return (
    <Flex
      style={[styles.boxSurround, themes[tone]]}
      align="center"
      justify="center"
    >
      <Flex
        style={[styles.box, customShadows[shadow]]}
        align="center"
        justify="center"
      >
        <Text size="sm">{children}</Text>
      </Flex>
    </Flex>
  )
}
