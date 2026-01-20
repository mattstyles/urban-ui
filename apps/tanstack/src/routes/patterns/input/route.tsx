import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Input } from '@urban-ui/input'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

export const Route = createFileRoute('/patterns/input/')({
  component: InputPatterns,
})

const styles = stylex.create({
  page: {
    padding: space[600],
  },
  container: {
    padding: space[300],
    backgroundColor: base.white,
    color: tone.fgHi,
    borderRadius: radii.md,
  },
  inputContainer: {
    maxWidth: '320px',
  },
})

function InputPatterns() {
  return (
    <Flex direction="column" gap="400" style={[styles.page]}>
      <Text size="xxl" weight="bold">
        Input Patterns
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Flex direction="column" gap="200" style={styles.inputContainer}>
          <Input placeholder="Enter your name" />
          <Input placeholder="Enter your email" type="email" />
          <Input placeholder="Enter password" type="password" />
        </Flex>
      </Flex>

      {/* Sizes */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Sizes
        </Text>
        <Flex direction="column" gap="200" style={styles.inputContainer}>
          <Text size="sm" color="lo">
            Small:
          </Text>
          <Input size="sm" placeholder="Small input" />
          <Text size="sm" color="lo">
            Medium (default):
          </Text>
          <Input size="md" placeholder="Medium input" />
          <Text size="sm" color="lo">
            Large:
          </Text>
          <Input size="lg" placeholder="Large input" />
        </Flex>
      </Flex>

      {/* States */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          States
        </Text>
        <Flex direction="column" gap="200" style={styles.inputContainer}>
          <Text size="sm" color="lo">
            Default:
          </Text>
          <Input placeholder="Default input" />
          <Text size="sm" color="lo">
            Disabled:
          </Text>
          <Input placeholder="Disabled input" disabled />
          <Text size="sm" color="lo">
            Error:
          </Text>
          <Input placeholder="Input with error" hasError />
        </Flex>
      </Flex>

      {/* Input Types */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Input Types
        </Text>
        <Flex direction="column" gap="200" style={styles.inputContainer}>
          <Text size="sm" color="lo">
            Text:
          </Text>
          <Input type="text" placeholder="Text input" />
          <Text size="sm" color="lo">
            Email:
          </Text>
          <Input type="email" placeholder="email@example.com" />
          <Text size="sm" color="lo">
            Password:
          </Text>
          <Input type="password" placeholder="Enter password" />
          <Text size="sm" color="lo">
            Number:
          </Text>
          <Input type="number" placeholder="Enter a number" />
          <Text size="sm" color="lo">
            Search:
          </Text>
          <Input type="search" placeholder="Search..." />
          <Text size="sm" color="lo">
            URL:
          </Text>
          <Input type="url" placeholder="https://example.com" />
          <Text size="sm" color="lo">
            Telephone:
          </Text>
          <Input type="tel" placeholder="+1 (555) 123-4567" />
        </Flex>
      </Flex>

      {/* With Values */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Values
        </Text>
        <Flex direction="column" gap="200" style={styles.inputContainer}>
          <Text size="sm" color="lo">
            Default value:
          </Text>
          <Input defaultValue="Default text value" />
          <Text size="sm" color="lo">
            Read-only:
          </Text>
          <Input value="Read-only value" readOnly />
        </Flex>
      </Flex>
    </Flex>
  )
}
