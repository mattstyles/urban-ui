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
          <Tag variant="accent">Design</Tag>
          <Tag variant="accent">Development</Tag>
          <Tag variant="accent">Marketing</Tag>
          <Tag variant="accent">Research</Tag>
        </Flex>
      </div>

      {/* Priority levels */}
      <div {...stylex.props(styles.example)}>
        <div {...stylex.props(styles.title)}>Priority Levels</div>
        <Flex gap="100" wrap="wrap">
          <Tag variant="danger" size="lg">
            High
          </Tag>
          <Tag variant="warning">Medium</Tag>
          <Tag variant="info">Low</Tag>
        </Flex>
      </div>

      {/* Mixed usage */}
      <div {...stylex.props(styles.example)}>
        <div {...stylex.props(styles.title)}>Mixed Usage</div>
        <Flex direction="v" gap="100">
          <Flex gap="100" align="center">
            <Tag variant="positive" size="lg">Online</Tag>
            <Tag variant="accent">Premium</Tag>
            <Tag variant="info">New</Tag>
          </Flex>
          <Flex gap="100" align="center">
            <Tag variant="warning" size="lg">In Progress</Tag>
            <Tag variant="danger">Urgent</Tag>
            <Tag variant="neutral">Draft</Tag>
          </Flex>
          <Flex gap="100" align="center">
            <Tag variant="disabled">Archived</Tag>
            <Tag variant="disabled">Expired</Tag>
            <Tag variant="disabled">Inactive</Tag>
          </Flex>
        </Flex>
      </div>
    </Flex>
  )
}
