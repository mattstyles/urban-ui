import stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { borderStyles, radii } from '@urban-ui/theme/borders.stylex'
import { background, border, foreground } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from '@urban-ui/theme/type.stylex'

const styles = stylex.create({
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    color: foreground.neutral,
    marginBlockEnd: space[200],
  },
  description: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    color: foreground.neutralFaded,
    marginBlockEnd: space[400],
  },
  section: {
    marginBlockEnd: space[600],
  },
  main: {
    paddingLeft: space.xl,
    paddingRight: space.xl,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: foreground.neutral,
    marginBlockEnd: space[200],
  },
  box: {
    backgroundColor: background.accent,
    borderRadius: radii.sm,
    width: 24,
    height: 24,
    color: 'white',
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.xs,
  },
  example: {
    backgroundColor: background.pageFaded,
    padding: space[300],
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: borderStyles.solid,
    borderColor: border.neutralFaded,
    marginBlockEnd: space[400],
  },
  exampleInnerContainer: {
    padding: space[200],
    backgroundColor: background.neutralFaded,
  },
  exampleContainer: {
    backgroundColor: background.pageFaded,
    padding: space[300],
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: borderStyles.solid,
    borderColor: border.neutralFaded,
    marginBlockEnd: space[400],
  },
  alignmentContainer: {
    minHeight: '88px',
  },
  exampleTitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: foreground.neutral,
    marginBlockEnd: space[200],
  },
  sizeLabel: {
    fontSize: fontSizes.sm,
    color: foreground.neutralFaded,
    marginInlineEnd: space[200],
    width: '3rem',
  },
  sizeBlock: {
    backgroundColor: background.accent,
    borderRadius: radii.sm,
  },
})

function Box({ children }: React.PropsWithChildren) {
  return (
    <Flex style={[styles.box]} align="center" justify="center" inline>
      {children}
    </Flex>
  )
}

export default function FlexPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <h1 {...stylex.props(styles.title)}>Flex Component</h1>
      <p {...stylex.props(styles.description)}>
        The Flex component provides a simple and intuitive way to create
        flexible layouts. It wraps the CSS Flexbox model into a prop-based API,
        making it easy to control layout direction, alignment, spacing, and
        more.
      </p>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Direction Control</h2>

        <div {...stylex.props(styles.example)}>
          <h3 {...stylex.props(styles.exampleTitle)}>Row (default)</h3>
          <Flex gap="50">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>

        <div {...stylex.props(styles.example)}>
          <h3 {...stylex.props(styles.exampleTitle)}>Column</h3>
          <Flex direction="column" gap="50">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>

        <div {...stylex.props(styles.example)}>
          <h3 {...stylex.props(styles.exampleTitle)}>Row Reverse</h3>
          <Flex direction="row-reverse" gap="50">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>

        <div {...stylex.props(styles.example)}>
          <h3 {...stylex.props(styles.exampleTitle)}>Column Reverse</h3>
          <Flex direction="column-reverse" gap="50">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>

        <div {...stylex.props(styles.example)}>
          <h3 {...stylex.props(styles.exampleTitle)}>
            Using Aliases (h/horizontal)
          </h3>
          <Flex direction="h" gap="50">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>

        <div {...stylex.props(styles.example)}>
          <h3 {...stylex.props(styles.exampleTitle)}>
            Using Aliases (v/vertical)
          </h3>
          <Flex direction="v" gap="50">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Alignment Options</h2>

        <div {...stylex.props(styles.example)}>
          <h3 {...stylex.props(styles.exampleTitle)}>Align Items</h3>
          <Flex direction="column" gap="200">
            <Flex
              gap="50"
              align="flex-start"
              style={[styles.exampleInnerContainer, styles.alignmentContainer]}
            >
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
            <Flex
              gap="50"
              align="center"
              style={[styles.exampleInnerContainer, styles.alignmentContainer]}
            >
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
            <Flex
              gap="50"
              align="flex-end"
              style={[styles.exampleInnerContainer, styles.alignmentContainer]}
            >
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
            <Flex
              gap="50"
              align="stretch"
              style={[styles.exampleInnerContainer, styles.alignmentContainer]}
            >
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
          </Flex>
        </div>

        <div {...stylex.props(styles.example)}>
          <h3 {...stylex.props(styles.exampleTitle)}>Justify Content</h3>
          <Flex direction="column" gap="200">
            <Flex
              gap="50"
              justify="flex-start"
              style={[styles.exampleInnerContainer, styles.alignmentContainer]}
            >
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
            <Flex
              gap="50"
              justify="center"
              style={[styles.exampleInnerContainer, styles.alignmentContainer]}
            >
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
            <Flex
              gap="50"
              justify="flex-end"
              style={[styles.exampleInnerContainer, styles.alignmentContainer]}
            >
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
            <Flex
              gap="50"
              justify="space-between"
              style={[styles.exampleInnerContainer, styles.alignmentContainer]}
            >
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
            <Flex
              gap="50"
              justify="space-around"
              style={[styles.exampleInnerContainer, styles.alignmentContainer]}
            >
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
            <Flex
              gap="50"
              justify="space-evenly"
              style={[styles.exampleInnerContainer, styles.alignmentContainer]}
            >
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
          </Flex>
        </div>

        <div {...stylex.props(styles.example)}>
          <h3 {...stylex.props(styles.exampleTitle)}>Combining Alignments</h3>
          <Flex
            gap="50"
            align="center"
            justify="space-between"
            style={[styles.exampleInnerContainer, styles.alignmentContainer]}
          >
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Semantic Size Scale</h2>
        <p {...stylex.props(styles.description)}>
          The semantic size scale provides consistent spacing across the design
          system. Each size is fluid, scaling between viewport widths of 320px
          and 1240px.
        </p>
        <p {...stylex.props(styles.description)}>
          Try resizing your browser window to see how these values adapt. For
          example, the xxs token scales from 2px to 2px (fixed), while xxl
          scales from 44px to 60px. This fluid scaling ensures that spacing
          remains proportional across different screen sizes, maintaining visual
          harmony without requiring breakpoint-specific adjustments.
        </p>
        <div {...stylex.props(styles.exampleContainer)}>
          <Flex direction="v" gap="200">
            <div {...stylex.props(styles.exampleTitle)}>Size Scale</div>
            <Flex direction="v" gap="200">
              <Flex gap="100" align="center">
                <span {...stylex.props(styles.sizeLabel)}>xxs</span>
                <div
                  {...stylex.props(styles.sizeBlock)}
                  style={{ width: space.xxs, height: space.xxs }}
                />
              </Flex>
              <Flex gap="100" align="center">
                <span {...stylex.props(styles.sizeLabel)}>xs</span>
                <div
                  {...stylex.props(styles.sizeBlock)}
                  style={{ width: space.xs, height: space.xs }}
                />
              </Flex>
              <Flex gap="100" align="center">
                <span {...stylex.props(styles.sizeLabel)}>sm</span>
                <div
                  {...stylex.props(styles.sizeBlock)}
                  style={{ width: space.sm, height: space.sm }}
                />
              </Flex>
              <Flex gap="100" align="center">
                <span {...stylex.props(styles.sizeLabel)}>md</span>
                <div
                  {...stylex.props(styles.sizeBlock)}
                  style={{ width: space.md, height: space.md }}
                />
              </Flex>
              <Flex gap="100" align="center">
                <span {...stylex.props(styles.sizeLabel)}>lg</span>
                <div
                  {...stylex.props(styles.sizeBlock)}
                  style={{ width: space.lg, height: space.lg }}
                />
              </Flex>
              <Flex gap="100" align="center">
                <span {...stylex.props(styles.sizeLabel)}>xl</span>
                <div
                  {...stylex.props(styles.sizeBlock)}
                  style={{ width: space.xl, height: space.xl }}
                />
              </Flex>
              <Flex gap="100" align="center">
                <span {...stylex.props(styles.sizeLabel)}>xxl</span>
                <div
                  {...stylex.props(styles.sizeBlock)}
                  style={{ width: space.xxl, height: space.xxl }}
                />
              </Flex>
            </Flex>
          </Flex>
        </div>
      </section>
    </main>
  )
}
