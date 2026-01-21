'use client'

import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Form } from '@urban-ui/form'
import { Text } from '@urban-ui/text'
import { TextField } from '@urban-ui/textfield'
import { themes } from '@urban-ui/theme'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

export const Route = createFileRoute('/patterns/form/')({
  component: FormPatterns,
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
  formContainer: {
    maxWidth: '320px',
  },
  successMessage: {
    padding: space[200],
    backgroundColor: tone.surface,
    color: tone.fgHi,
    borderRadius: radii.sm,
  },
})

function FormPatterns() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  function handleReset() {
    setSubmitted(false)
  }

  return (
    <Flex direction="column" gap="400" style={[styles.page]}>
      <Text size="xxl" weight="bold">
        Form Patterns
      </Text>

      {/* Login Form */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Login Form
        </Text>
        <Text size="sm" color="lo">
          Email and password form with client-side validation.
        </Text>

        <Form
          onSubmit={handleSubmit}
          style={styles.formContainer}
          validationBehavior="native"
        >
          <Flex direction="column" gap="300">
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              isRequired
              description="We'll never share your email."
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              isRequired
              minLength={8}
              description="Must be at least 8 characters."
            />

            <Flex gap="200">
              <Button type="submit" tone="primary" size="lg">
                Sign In
              </Button>
              <Button type="reset" tone="neutral" size="lg" onPress={handleReset}>
                Reset
              </Button>
            </Flex>

            {submitted && (
              <div {...stylex.props(styles.successMessage, themes.positive)}>
                <Text size="sm">Form submitted successfully!</Text>
              </div>
            )}
          </Flex>
        </Form>
      </Flex>
    </Flex>
  )
}
