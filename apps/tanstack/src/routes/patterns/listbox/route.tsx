import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import {
  ListBox,
  ListBoxHeader,
  ListBoxItem,
  ListBoxSection,
} from '@urban-ui/listbox'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

export const Route = createFileRoute('/patterns/listbox/')({
  component: ListBoxPatterns,
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
  listboxContainer: {
    maxWidth: 300,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
    borderRadius: radii.md,
    backgroundColor: base.white,
  },
})

function ListBoxPatterns() {
  return (
    <Flex direction="column" gap="400" style={styles.page}>
      <Text size="xxl" weight="bold">
        ListBox Patterns
      </Text>

      {/* Basic Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Text size="sm" color="lo">
          A simple list with single selection.
        </Text>
        <div {...stylex.props(styles.listboxContainer)}>
          <ListBox aria-label="Animals" selectionMode="single">
            <ListBoxItem id="cat">Cat</ListBoxItem>
            <ListBoxItem id="dog">Dog</ListBoxItem>
            <ListBoxItem id="fish">Fish</ListBoxItem>
            <ListBoxItem id="bird">Bird</ListBoxItem>
          </ListBox>
        </div>
      </Flex>

      {/* Multiple Selection */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Multiple Selection
        </Text>
        <Text size="sm" color="lo">
          Allow users to select multiple items.
        </Text>
        <div {...stylex.props(styles.listboxContainer)}>
          <ListBox aria-label="Favorite colors" selectionMode="multiple">
            <ListBoxItem id="red">Red</ListBoxItem>
            <ListBoxItem id="blue">Blue</ListBoxItem>
            <ListBoxItem id="green">Green</ListBoxItem>
            <ListBoxItem id="yellow">Yellow</ListBoxItem>
            <ListBoxItem id="purple">Purple</ListBoxItem>
          </ListBox>
        </div>
      </Flex>

      {/* With Sections */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Sections
        </Text>
        <Text size="sm" color="lo">
          Group related items with headers.
        </Text>
        <div {...stylex.props(styles.listboxContainer)}>
          <ListBox aria-label="Food" selectionMode="single">
            <ListBoxSection>
              <ListBoxHeader>Fruits</ListBoxHeader>
              <ListBoxItem id="apple">Apple</ListBoxItem>
              <ListBoxItem id="banana">Banana</ListBoxItem>
              <ListBoxItem id="orange">Orange</ListBoxItem>
            </ListBoxSection>
            <ListBoxSection>
              <ListBoxHeader>Vegetables</ListBoxHeader>
              <ListBoxItem id="carrot">Carrot</ListBoxItem>
              <ListBoxItem id="broccoli">Broccoli</ListBoxItem>
              <ListBoxItem id="spinach">Spinach</ListBoxItem>
            </ListBoxSection>
          </ListBox>
        </div>
      </Flex>

      {/* With Label and Description */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Label and Description
        </Text>
        <Text size="sm" color="lo">
          Use text slots for rich content in items.
        </Text>
        <div {...stylex.props(styles.listboxContainer)}>
          <ListBox aria-label="Permissions" selectionMode="single">
            <ListBoxItem id="read" textValue="Read">
              <Text slot="label">Read</Text>
              <Text slot="description" size="sm" color="lo">
                View content only
              </Text>
            </ListBoxItem>
            <ListBoxItem id="write" textValue="Write">
              <Text slot="label">Write</Text>
              <Text slot="description" size="sm" color="lo">
                Create and edit content
              </Text>
            </ListBoxItem>
            <ListBoxItem id="admin" textValue="Admin">
              <Text slot="label">Admin</Text>
              <Text slot="description" size="sm" color="lo">
                Full access to all features
              </Text>
            </ListBoxItem>
          </ListBox>
        </div>
      </Flex>

      {/* Disabled Items */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Disabled Items
        </Text>
        <Text size="sm" color="lo">
          Some items can be disabled.
        </Text>
        <div {...stylex.props(styles.listboxContainer)}>
          <ListBox
            aria-label="Subscription plans"
            selectionMode="single"
            disabledKeys={['enterprise']}
          >
            <ListBoxItem id="free">Free</ListBoxItem>
            <ListBoxItem id="pro">Pro</ListBoxItem>
            <ListBoxItem id="enterprise">Enterprise (Coming Soon)</ListBoxItem>
          </ListBox>
        </div>
      </Flex>

      {/* Large Size */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Large Size
        </Text>
        <Text size="sm" color="lo">
          Larger touch targets for improved accessibility.
        </Text>
        <div {...stylex.props(styles.listboxContainer)}>
          <ListBox aria-label="Options" selectionMode="single" size="lg">
            <ListBoxItem id="option1" size="lg" textValue="Option 1">
              Option 1
            </ListBoxItem>
            <ListBoxItem id="option2" size="lg" textValue="Option 2">
              Option 2
            </ListBoxItem>
            <ListBoxItem id="option3" size="lg" textValue="Option 3">
              Option 3
            </ListBoxItem>
          </ListBox>
        </div>
      </Flex>

      {/* Dynamic Collection */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Dynamic Collection
        </Text>
        <Text size="sm" color="lo">
          Generate items from data using the items prop.
        </Text>
        <div {...stylex.props(styles.listboxContainer)}>
          <ListBox
            aria-label="Countries"
            selectionMode="single"
            items={[
              { id: 'us', name: 'United States' },
              { id: 'uk', name: 'United Kingdom' },
              { id: 'ca', name: 'Canada' },
              { id: 'au', name: 'Australia' },
              { id: 'de', name: 'Germany' },
            ]}
          >
            {(item) => (
              <ListBoxItem id={item.id} textValue={item.name}>
                {item.name}
              </ListBoxItem>
            )}
          </ListBox>
        </div>
      </Flex>

      {/* Default Selection */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Default Selection
        </Text>
        <Text size="sm" color="lo">
          Pre-select items using defaultSelectedKeys.
        </Text>
        <div {...stylex.props(styles.listboxContainer)}>
          <ListBox
            aria-label="Notifications"
            selectionMode="multiple"
            defaultSelectedKeys={['email', 'push']}
          >
            <ListBoxItem id="email">Email notifications</ListBoxItem>
            <ListBoxItem id="push">Push notifications</ListBoxItem>
            <ListBoxItem id="sms">SMS notifications</ListBoxItem>
            <ListBoxItem id="slack">Slack notifications</ListBoxItem>
          </ListBox>
        </div>
      </Flex>
    </Flex>
  )
}
