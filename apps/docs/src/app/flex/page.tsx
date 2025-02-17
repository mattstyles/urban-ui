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
    backgroundColor: background.accentFaded,
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
    <div>
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
    </div>
  )
}
