import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'

export const Route = createFileRoute('/patterns/text/')({
  component: TextPatterns,
})

function TextPatterns() {
  return (
    <Flex direction="column" gap="200">
      <Text size="xxl">Page Title</Text>
      <Text size="lg">Section heading</Text>
      <Text size="md">Body text</Text>
      <Text size="sm">Secondary info</Text>
    </Flex>
  )
}
