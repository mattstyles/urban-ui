'use client'

import stylex from '@stylexjs/stylex'
import { useState } from 'react'

import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { grays, primary } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'

const styles = stylex.create({
  checkboxContainer: {
    display: 'flex',
    gap: space[100],
    alignItems: 'center',
    marginBlockEnd: space[200],
  },
  checkboxLabel: {
    fontSize: fontSizes.sm,
    color: grays[700],
  },
  textContainer: {
    background: grays[100],
    padding: space[100],
    width: '100%',
  },
  sizeLabel: {
    fontSize: fontSizes.sm,
    color: grays[500],
    marginInlineEnd: space[200],
    width: '3rem',
  },
  textBlockIndicator: {
    display: 'flex',
    borderColor: primary[400],
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeft: 'none',
    borderRight: 'none',
  },
  hidden: {
    borderColor: 'transparent',
  },
})

export function TextExamples() {
  const [showIndicators, setShowIndicators] = useState(true)

  return (
    <>
      <div {...stylex.props(styles.checkboxContainer)}>
        <input
          type="checkbox"
          id="showIndicators"
          checked={showIndicators}
          onChange={(e) => setShowIndicators(e.target.checked)}
        />
        <label htmlFor="showIndicators" {...stylex.props(styles.checkboxLabel)}>
          Show text block indicators
        </label>
      </div>

      <Flex direction="v" gap="200">
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>xxs</span>
            <span
              {...stylex.props(
                styles.textBlockIndicator,
                !showIndicators && styles.hidden,
              )}
            >
              <Text size="xxs">
                Extra extra small text with optimized letter spacing for
                readability
              </Text>
            </span>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>xs</span>
            <span
              {...stylex.props(
                styles.textBlockIndicator,
                !showIndicators && styles.hidden,
              )}
            >
              <Text size="xs">
                Extra small text with enhanced spacing for small sizes
              </Text>
            </span>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>sm</span>
            <span
              {...stylex.props(
                styles.textBlockIndicator,
                !showIndicators && styles.hidden,
              )}
            >
              <Text size="sm">Small text with comfortable reading metrics</Text>
            </span>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>md</span>
            <span
              {...stylex.props(
                styles.textBlockIndicator,
                !showIndicators && styles.hidden,
              )}
            >
              <Text size="md">
                Medium text (default) with optimal reading line height
              </Text>
            </span>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>lg</span>
            <span
              {...stylex.props(
                styles.textBlockIndicator,
                !showIndicators && styles.hidden,
              )}
            >
              <Text size="lg">
                Large text with adjusted spacing for headlines
              </Text>
            </span>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>xl</span>
            <span
              {...stylex.props(
                styles.textBlockIndicator,
                !showIndicators && styles.hidden,
              )}
            >
              <Text size="xl">
                Extra large text with tighter letter spacing
              </Text>
            </span>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>xxl</span>
            <span
              {...stylex.props(
                styles.textBlockIndicator,
                !showIndicators && styles.hidden,
              )}
            >
              <Text size="xxl">
                Extra extra large text optimized for display
              </Text>
            </span>
          </Flex>
        </div>
      </Flex>
    </>
  )
}
