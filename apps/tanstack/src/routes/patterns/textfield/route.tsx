import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { TextField } from '@urban-ui/textfield'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

export const Route = createFileRoute('/patterns/textfield/')({
  component: TextFieldPatterns,
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
  fieldContainer: {
    maxWidth: '320px',
  },
})

function TextFieldPatterns() {
  return (
    <Flex direction="column" gap="400" style={[styles.page]}>
      <Text size="xxl" weight="bold">
        TextField Patterns
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Flex direction="column" gap="300" style={styles.fieldContainer}>
          <TextField label="Name" placeholder="Enter your name" />
          <TextField label="Email" placeholder="email@example.com" type="email" />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
          />
        </Flex>
      </Flex>

      {/* With Description */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Description
        </Text>
        <Flex direction="column" gap="300" style={styles.fieldContainer}>
          <TextField
            label="Email"
            placeholder="email@example.com"
            description="We'll never share your email with anyone else."
          />
          <TextField
            label="Username"
            placeholder="johndoe"
            description="Choose a unique username. This will be visible to others."
          />
        </Flex>
      </Flex>

      {/* Sizes */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Sizes
        </Text>
        <Flex direction="column" gap="300" style={styles.fieldContainer}>
          <TextField label="Small (32px)" placeholder="Small input" size="sm" />
          <TextField
            label="Medium (~47px)"
            placeholder="Medium input"
            size="md"
          />
        </Flex>
      </Flex>

      {/* States */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          States
        </Text>
        <Flex direction="column" gap="300" style={styles.fieldContainer}>
          <TextField
            label="Default"
            placeholder="Default text field"
          />
          <TextField
            label="Disabled"
            placeholder="Disabled text field"
            isDisabled
          />
          <TextField
            label="Read Only"
            value="Read-only value"
            isReadOnly
          />
        </Flex>
      </Flex>

      {/* Validation */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Validation
        </Text>
        <Flex direction="column" gap="300" style={styles.fieldContainer}>
          <TextField
            label="Required Field"
            placeholder="This field is required"
            isRequired
          />
          <TextField
            label="Invalid Field"
            placeholder="Enter value"
            isInvalid
            errorMessage="This field has an error."
          />
          <TextField
            label="Email with Validation"
            placeholder="email@example.com"
            type="email"
            isInvalid
            errorMessage="Please enter a valid email address."
            description="Enter your work email."
          />
        </Flex>
      </Flex>

      {/* Form Example */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Form Example
        </Text>
        <Flex direction="column" gap="300" style={styles.fieldContainer}>
          <TextField
            label="Full Name"
            placeholder="John Doe"
            isRequired
          />
          <TextField
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            isRequired
            description="We'll use this for account recovery."
          />
          <TextField
            label="Password"
            placeholder="Enter a strong password"
            type="password"
            isRequired
            description="Must be at least 8 characters."
          />
          <Button size="lg" tone="primary">
            Create Account
          </Button>
        </Flex>
      </Flex>

      {/* With Controlled Value */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Default Value
        </Text>
        <Flex direction="column" gap="300" style={styles.fieldContainer}>
          <TextField
            label="Pre-filled Field"
            defaultValue="Default text value"
          />
          <TextField
            label="Website"
            defaultValue="https://example.com"
            type="url"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
