import { createFileRoute } from '@tanstack/react-router'
import { Text } from '@urban-ui/text'

export const Route = createFileRoute('/patterns/')({
  component: PatternsIndex,
})

function PatternsIndex() {
  return (
    <Text size="xl" weight="bold">
      Patterns
    </Text>
  )
}
