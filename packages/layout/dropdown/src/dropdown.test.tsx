import { render, screen } from '@testing-library/react'
import { DropdownItem, DropdownItemText, DropdownListBox } from './index'

describe('DropdownListBox', () => {
  it('renders a basic listbox with items', () => {
    render(
      <DropdownListBox aria-label="Options" selectionMode="single">
        <DropdownItem id="option1">Option 1</DropdownItem>
        <DropdownItem id="option2">Option 2</DropdownItem>
        <DropdownItem id="option3">Option 3</DropdownItem>
      </DropdownListBox>
    )

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('links aria-labelledby to the label text id', () => {
    render(
      <DropdownListBox aria-label="Permissions" selectionMode="single">
        <DropdownItem id="read" textValue="Read">
          <DropdownItemText slot="label">Read</DropdownItemText>
          <DropdownItemText slot="description" size="sm" color="lo">
            View content only
          </DropdownItemText>
        </DropdownItem>
      </DropdownListBox>
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
      <DropdownListBox aria-label="Permissions" selectionMode="single">
        <DropdownItem id="read" textValue="Read">
          <DropdownItemText slot="label">Read</DropdownItemText>
          <DropdownItemText slot="description" size="sm" color="lo">
            View content only
          </DropdownItemText>
        </DropdownItem>
      </DropdownListBox>
    )

    const option = screen.getByRole('option')
    const describedById = option.getAttribute('aria-describedby')

    expect(describedById).toBeTruthy()

    // The aria-describedby should point to the description text element
    const descriptionElement = document.getElementById(describedById!)
    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement).toHaveTextContent('View content only')
  })
})
