import stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { borderStyles, radii } from '@urban-ui/theme/borders.stylex'
import { grays, primary } from '@urban-ui/theme/colors.stylex'
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
    color: grays[900],
    marginBlockEnd: space[200],
  },
  description: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    color: grays[700],
    marginBlockEnd: space[400],
  },
  section: {
    marginBlockEnd: space[600],
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: grays[800],
    marginBlockEnd: space[200],
  },
  box: {
    backgroundColor: primary[100],
    padding: space[50],
    borderRadius: radii.sm,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: primary[900],
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.xs,
  },
  example: {
    backgroundColor: grays[50],
    padding: space[300],
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: borderStyles.solid,
    borderColor: grays[200],
    marginBlockEnd: space[400],
  },
  exampleTitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: grays[600],
    marginBlockEnd: space[200],
  },
})

function Box({ children }: React.PropsWithChildren) {
  return <div {...stylex.props(styles.box)}>{children}</div>
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
    </div>
  )
}
