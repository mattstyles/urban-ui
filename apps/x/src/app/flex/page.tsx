import stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { spacing } from '@urban-ui/theme/spacing.stylex'

const styles = stylex.create({
  block: {
    backgroundColor: 'hotpink',
    width: spacing.xl,
    height: spacing.xl,
  },
})

function Block() {
  return <div {...stylex.props(styles.block)} />
}

export default function FlexPage() {
  return (
    <>
      <h1>Flex</h1>
      <Flex orientation="v" gap="sm">
        <div>gap: sm</div>
        <Flex gap="sm" bg>
          <Block />
          <Block />
          <Block />
          <Block />
          hello world
        </Flex>
        <div>gap: md</div>
        <Flex gap="md">
          <Block />
          <Block />
          <Block />
          <Block />
        </Flex>
        <div>gap: lg</div>
        <Flex gap="lg">
          <Block />
          <Block />
          <Block />
          <Block />
        </Flex>
      </Flex>
      <div style={{ paddingBottom: 24 }} />
    </>
  )
}
