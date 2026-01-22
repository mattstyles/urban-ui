import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import {
  Dropdown,
  DropdownItem,
  DropdownItemContent,
  DropdownItemText,
} from '@urban-ui/dropdown'
import {
  Listbox,
  ListboxItem,
  ListboxItemContent,
  ListboxItemText,
} from '@urban-ui/listbox'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

export const Route = createFileRoute('/patterns/listbox/')({
  component: ListboxComparisonPatterns,
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
  listbox: {
    maxWidth: 300,
    maxHeight: 300,
  },
  sideBySide: {
    gap: space[400],
  },
})

function ListboxComparisonPatterns() {
  return (
    <Flex direction="column" gap="400" style={styles.page}>
      <Text size="xxl" weight="bold">
        Listbox vs Dropdown Comparison
      </Text>
      <Text color="lo">
        Both components use the same underlying AriaListBox but are styled for
        different contexts. Listbox is for standalone selection, Dropdown is
        optimized for use within Select and other overlay components.
      </Text>

      {/* Basic Comparison */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Basic Usage
        </Text>
        <Text size="sm" color="lo">
          Side-by-side comparison of Listbox and Dropdown.
        </Text>
        <Flex style={styles.sideBySide}>
          <Flex direction="v" gap="100">
            <Text size="sm" weight="semibold">
              Listbox
            </Text>
            <Listbox
              aria-label="Listbox example"
              selectionMode="single"
              style={styles.listbox}
            >
              <ListboxItem id="option1">Option 1</ListboxItem>
              <ListboxItem id="option2">Option 2</ListboxItem>
              <ListboxItem id="option3">Option 3</ListboxItem>
            </Listbox>
          </Flex>
          <Flex direction="v" gap="100">
            <Text size="sm" weight="semibold">
              Dropdown
            </Text>
            <Dropdown
              aria-label="Dropdown example"
              selectionMode="single"
              style={styles.listbox}
            >
              <DropdownItem id="option1">Option 1</DropdownItem>
              <DropdownItem id="option2">Option 2</DropdownItem>
              <DropdownItem id="option3">Option 3</DropdownItem>
            </Dropdown>
          </Flex>
        </Flex>
      </Flex>

      {/* With Content */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          With Label and Description
        </Text>
        <Text size="sm" color="lo">
          Both support structured content with labels and descriptions.
        </Text>
        <Flex style={styles.sideBySide}>
          <Flex direction="v" gap="100">
            <Text size="sm" weight="semibold">
              Listbox
            </Text>
            <Listbox
              aria-label="Listbox with content"
              selectionMode="single"
              style={styles.listbox}
            >
              <ListboxItem id="read" textValue="Read">
                <ListboxItemContent>
                  <ListboxItemText slot="label">Read</ListboxItemText>
                  <ListboxItemText slot="description" size="sm" color="lo">
                    View content only
                  </ListboxItemText>
                </ListboxItemContent>
              </ListboxItem>
              <ListboxItem id="write" textValue="Write">
                <ListboxItemContent>
                  <ListboxItemText slot="label">Write</ListboxItemText>
                  <ListboxItemText slot="description" size="sm" color="lo">
                    Create and edit
                  </ListboxItemText>
                </ListboxItemContent>
              </ListboxItem>
            </Listbox>
          </Flex>
          <Flex direction="v" gap="100">
            <Text size="sm" weight="semibold">
              Dropdown
            </Text>
            <Dropdown
              aria-label="Dropdown with content"
              selectionMode="single"
              style={styles.listbox}
            >
              <DropdownItem id="read" textValue="Read">
                <DropdownItemContent>
                  <DropdownItemText slot="label">Read</DropdownItemText>
                  <DropdownItemText slot="description" size="sm" color="lo">
                    View content only
                  </DropdownItemText>
                </DropdownItemContent>
              </DropdownItem>
              <DropdownItem id="write" textValue="Write">
                <DropdownItemContent>
                  <DropdownItemText slot="label">Write</DropdownItemText>
                  <DropdownItemText slot="description" size="sm" color="lo">
                    Create and edit
                  </DropdownItemText>
                </DropdownItemContent>
              </DropdownItem>
            </Dropdown>
          </Flex>
        </Flex>
      </Flex>

      {/* Multiple Selection */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Multiple Selection
        </Text>
        <Text size="sm" color="lo">
          Both support multiple selection mode.
        </Text>
        <Flex style={styles.sideBySide}>
          <Flex direction="v" gap="100">
            <Text size="sm" weight="semibold">
              Listbox
            </Text>
            <Listbox
              aria-label="Listbox multi-select"
              selectionMode="multiple"
              style={styles.listbox}
            >
              <ListboxItem id="cheese">Cheese</ListboxItem>
              <ListboxItem id="pepperoni">Pepperoni</ListboxItem>
              <ListboxItem id="mushrooms">Mushrooms</ListboxItem>
            </Listbox>
          </Flex>
          <Flex direction="v" gap="100">
            <Text size="sm" weight="semibold">
              Dropdown
            </Text>
            <Dropdown
              aria-label="Dropdown multi-select"
              selectionMode="multiple"
              style={styles.listbox}
            >
              <DropdownItem id="cheese">Cheese</DropdownItem>
              <DropdownItem id="pepperoni">Pepperoni</DropdownItem>
              <DropdownItem id="mushrooms">Mushrooms</DropdownItem>
            </Dropdown>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
