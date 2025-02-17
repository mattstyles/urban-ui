import stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Tag } from '@urban-ui/tag'
import { background, foreground } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'

const styles = stylex.create({
  example: {
    backgroundColor: background.page,
    padding: space[200],
    borderRadius: '8px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: background.neutralFaded,
  },
  title: {
    fontSize: fontSizes.sm,
    color: foreground.neutral,
    marginBlockEnd: space[100],
  },
})

export function TagExamples() {
  return (
    <Flex direction="v" gap="200">
      {/* Status indicators */}
      <div {...stylex.props(styles.example)}>
        <div {...stylex.props(styles.title)}>Status Indicators</div>
        <Flex gap="100" wrap="wrap">
          <Tag variant="positive">Active</Tag>
          <Tag variant="warning">Pending</Tag>
          <Tag variant="danger">Failed</Tag>
          <Tag variant="neutral">Inactive</Tag>
        </Flex>
      </div>

      {/* Categories */}
      <div {...stylex.props(styles.example)}>
        <div {...stylex.props(styles.title)}>Categories</div>
        <Flex gap="100" wrap="wrap">
          <Tag variant="accent" size="sm">Design</Tag>
          <Tag variant="accent" size="sm">Development</Tag>
          <Tag variant="accent" size="sm">Marketing</Tag>
          <Tag variant="accent" size="sm">Research</Tag>
        </Flex>
      </div>

      {/* Priority levels */}
      <div {...stylex.props(styles.example)}>
        <div {...stylex.props(styles.title)}>Priority Levels</div>
        <Flex gap="100" wrap="wrap">
          <Tag variant="danger" size="sm">High</Tag>
          <Tag variant="warning" size="sm">Medium</Tag>
          <Tag variant="info" size="sm">Low</Tag>
        </Flex>
      </div>

      {/* Mixed usage */}
      <div {...stylex.props(styles.example)}>
        <div {...stylex.props(styles.title)}>Mixed Usage</div>
        <Flex direction="v" gap="100">
          <Flex gap="100" align="center">
            <Tag variant="positive">Online</Tag>
            <Tag variant="accent" size="sm">Premium</Tag>
            <Tag variant="info" size="sm">New</Tag>
          </Flex>
          <Flex gap="100" align="center">
            <Tag variant="warning">In Progress</Tag>
            <Tag variant="danger" size="sm">Urgent</Tag>
            <Tag variant="neutral" size="sm">Draft</Tag>
          </Flex>
        </Flex>
      </div>
    </Flex>
  )
}
