import * as stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Icon } from '@urban-ui/icon'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { borderWidths, radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

import {
  BellAlertIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import {
  AcademicCapIcon,
  FaceSmileIcon,
  GlobeAmericasIcon,
  GlobeAsiaAustraliaIcon,
  GlobeEuropeAfricaIcon,
} from '@heroicons/react/24/solid'
import { Banana } from 'lucide-react'
import { GiBowlSpiral } from 'react-icons/gi'

const styles = stylex.create({
  section: {
    backgroundColor: tone.surface,
    padding: space[300],
    borderRadius: radii.lg,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
  },
  sizeLabel: {
    minWidth: '4rem',
    textAlign: 'end',
  },
  customSize: {
    width: 96,
    height: 96,
  },
  current: {
    color: tone.fgHi,
  },
  onBlock: {
    color: tone.fgOnBlock,
    background: tone.solid,
    padding: space[200],
  },
})

export default function IconsPage() {
  return (
    <Flex direction="v" gap="500" asChild>
      <main>
        <Flex direction="v" gap="400">
          <Text size="xl" weight="semibold">
            Icon
          </Text>
          <Text asChild>
            <p>
              Urban UI does not provide icons out of the box, but you can use
              any icon library you prefer.
            </p>
          </Text>
        </Flex>

        <Flex direction="h" gap="200" asChild style={styles.section}>
          <section>
            <Icon>
              <Banana />
            </Icon>
            <Icon>
              <GiBowlSpiral />
            </Icon>
          </section>
        </Flex>

        <Flex direction="v" gap="400" asChild style={styles.section}>
          <section>
            <Text size="lg" weight="medium" asChild>
              <h2>Tones</h2>
            </Text>

            <Flex direction="h" gap="200" wrap="wrap">
              <Icon size="xl" color="hi" tone="neutral">
                <BellAlertIcon />
              </Icon>
              <Icon size="xl" color="hi" tone="primary">
                <BellAlertIcon />
              </Icon>
              <Icon size="xl" color="hi" tone="accent">
                <BellAlertIcon />
              </Icon>
              <Icon size="xl" color="hi" tone="positive">
                <CheckCircleIcon />
              </Icon>
              <Icon size="xl" color="hi" tone="warning">
                <ExclamationTriangleIcon />
              </Icon>
              <Icon size="xl" color="hi" tone="critical">
                <ExclamationCircleIcon />
              </Icon>
              <Icon size="xl" color="hi" tone="info">
                <InformationCircleIcon />
              </Icon>
            </Flex>

            <Text asChild>
              <p>Icons will inherit the current colour</p>
            </Text>

            <Flex
              direction="h"
              gap="200"
              wrap="wrap"
              align="center"
              style={[styles.current, themes.accent]}
            >
              <Icon size="xl">
                <GlobeEuropeAfricaIcon />
              </Icon>
              <Icon size="xl" tone="neutral">
                <GlobeAmericasIcon />
              </Icon>
              <Icon size="xl" tone="neutral" color="hi">
                <GlobeAsiaAustraliaIcon />
              </Icon>
              <Flex justify="center" align="center" style={styles.onBlock}>
                <Icon size="xl">
                  <FaceSmileIcon />
                </Icon>
              </Flex>
            </Flex>
          </section>
        </Flex>

        <Flex direction="v" gap="400" asChild style={styles.section}>
          <section>
            <Text size="lg" weight="medium" asChild>
              <h2>Sizes</h2>
            </Text>
            <Text asChild>
              <p>
                Icon sizes are designed to align with the typographic scale used
                by the Text component. This ensures visual consistency when
                icons are used alongside text.
              </p>
            </Text>

            <Flex direction="v" gap="300">
              <Flex direction="h" gap="200" align="center">
                <Text size="xxs" color="lo" style={styles.sizeLabel}>
                  xxs
                </Text>
                <Icon size="xxs">
                  <AcademicCapIcon />
                </Icon>
              </Flex>
              <Flex direction="h" gap="200" align="center">
                <Text size="xs" color="lo" style={styles.sizeLabel}>
                  xs
                </Text>
                <Icon size="xs">
                  <AcademicCapIcon />
                </Icon>
              </Flex>
              <Flex direction="h" gap="200" align="center">
                <Text size="sm" color="lo" style={styles.sizeLabel}>
                  sm
                </Text>
                <Icon size="sm">
                  <AcademicCapIcon />
                </Icon>
              </Flex>
              <Flex direction="h" gap="200" align="center">
                <Text size="md" color="lo" style={styles.sizeLabel}>
                  md
                </Text>
                <Icon size="md">
                  <AcademicCapIcon />
                </Icon>
              </Flex>
              <Flex direction="h" gap="200" align="center">
                <Text size="lg" color="lo" style={styles.sizeLabel}>
                  lg
                </Text>
                <Icon size="lg">
                  <AcademicCapIcon />
                </Icon>
              </Flex>
              <Flex direction="h" gap="200" align="center">
                <Text size="xl" color="lo" style={styles.sizeLabel}>
                  xl
                </Text>
                <Icon size="xl">
                  <AcademicCapIcon />
                </Icon>
              </Flex>
              <Flex direction="h" gap="200" align="center">
                <Text size="xxl" color="lo" style={styles.sizeLabel}>
                  xxl
                </Text>
                <Icon size="xxl">
                  <AcademicCapIcon />
                </Icon>
              </Flex>
              <Flex direction="h" gap="200" align="center">
                <Text size="lg" color="lo" style={styles.sizeLabel}>
                  fit
                </Text>
                <div {...stylex.props(styles.customSize)}>
                  <Icon size="fit">
                    <AcademicCapIcon />
                  </Icon>
                </div>
              </Flex>
            </Flex>
          </section>
        </Flex>
      </main>
    </Flex>
  )
}
