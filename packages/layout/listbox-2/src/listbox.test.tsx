import { render, screen } from '@testing-library/react'
import {
  ListBox2,
  ListBox2Item,
  ListBox2ItemContent,
  ListBox2ItemText,
  ListBox2Header,
  ListBox2Section,
} from './index'

describe('ListBox2', () => {
  it('renders a basic listbox with items', () => {
    render(
      <ListBox2 aria-label="Options" selectionMode="single">
        <ListBox2Item id="option1">Option 1</ListBox2Item>
        <ListBox2Item id="option2">Option 2</ListBox2Item>
        <ListBox2Item id="option3">Option 3</ListBox2Item>
      </ListBox2>,
    )

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('supports multiple selection mode', () => {
    render(
      <ListBox2 aria-label="Options" selectionMode="multiple">
        <ListBox2Item id="option1">Option 1</ListBox2Item>
        <ListBox2Item id="option2">Option 2</ListBox2Item>
      </ListBox2>,
    )

    const listbox = screen.getByRole('listbox')
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true')
  })

  it('links aria-labelledby to the label text id', () => {
    render(
      <ListBox2 aria-label="Permissions" selectionMode="single">
        <ListBox2Item id="read" textValue="Read">
          <ListBox2ItemContent>
            <ListBox2ItemText slot="label">Read</ListBox2ItemText>
            <ListBox2ItemText slot="description" size="sm" color="lo">
              View content only
            </ListBox2ItemText>
          </ListBox2ItemContent>
        </ListBox2Item>
      </ListBox2>,
    )

    const option = screen.getByRole('option')
    const labelledById = option.getAttribute('aria-labelledby')

    expect(labelledById).toBeTruthy()

    // The aria-labelledby should point to the label text element
    const labelElement = document.getElementById(labelledById!)
    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveTextContent('Read')
  })

  it('links aria-describedby to the description text id', () => {
    render(
      <ListBox2 aria-label="Permissions" selectionMode="single">
        <ListBox2Item id="read" textValue="Read">
          <ListBox2ItemContent>
            <ListBox2ItemText slot="label">Read</ListBox2ItemText>
            <ListBox2ItemText slot="description" size="sm" color="lo">
              View content only
            </ListBox2ItemText>
          </ListBox2ItemContent>
        </ListBox2Item>
      </ListBox2>,
    )

    const option = screen.getByRole('option')
    const describedById = option.getAttribute('aria-describedby')

    expect(describedById).toBeTruthy()

    // The aria-describedby should point to the description text element
    const descriptionElement = document.getElementById(describedById!)
    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement).toHaveTextContent('View content only')
  })

  it('renders sections with headers', () => {
    render(
      <ListBox2 aria-label="Options" selectionMode="single">
        <ListBox2Section>
          <ListBox2Header>Section A</ListBox2Header>
          <ListBox2Item id="a1">Item A1</ListBox2Item>
          <ListBox2Item id="a2">Item A2</ListBox2Item>
        </ListBox2Section>
        <ListBox2Section>
          <ListBox2Header>Section B</ListBox2Header>
          <ListBox2Item id="b1">Item B1</ListBox2Item>
        </ListBox2Section>
      </ListBox2>,
    )

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
    expect(screen.getByText('Section A')).toBeInTheDocument()
    expect(screen.getByText('Section B')).toBeInTheDocument()
  })

  it('supports different size variants', () => {
    const { rerender } = render(
      <ListBox2 aria-label="Options" selectionMode="single" size="sm">
        <ListBox2Item id="option1">Small</ListBox2Item>
      </ListBox2>,
    )
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    rerender(
      <ListBox2 aria-label="Options" selectionMode="single" size="md">
        <ListBox2Item id="option1">Medium</ListBox2Item>
      </ListBox2>,
    )
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    rerender(
      <ListBox2 aria-label="Options" selectionMode="single" size="lg">
        <ListBox2Item id="option1">Large</ListBox2Item>
      </ListBox2>,
    )
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('supports disabled items', () => {
    render(
      <ListBox2 aria-label="Options" selectionMode="single">
        <ListBox2Item id="option1">Enabled</ListBox2Item>
        <ListBox2Item id="option2" isDisabled>
          Disabled
        </ListBox2Item>
      </ListBox2>,
    )

    const options = screen.getAllByRole('option')
    expect(options[0]).not.toHaveAttribute('aria-disabled')
    expect(options[1]).toHaveAttribute('aria-disabled', 'true')
  })
})
