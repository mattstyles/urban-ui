import { render, screen, within } from '@testing-library/react'

import { Select } from './select'
import { SelectItem } from './select-item'

describe('Select', () => {
  it('should render with items', () => {
    render(
      <Select data-testid="select" aria-label="Select an option">
        <SelectItem id="option1">Option 1</SelectItem>
        <SelectItem id="option2">Option 2</SelectItem>
      </Select>,
    )

    expect(screen.getByTestId('select')).toBeInTheDocument()
  })

  it('should show placeholder when no value selected', () => {
    render(
      <Select aria-label="Animals" placeholder="Choose an animal">
        <SelectItem id="cat">Cat</SelectItem>
        <SelectItem id="dog">Dog</SelectItem>
      </Select>,
    )

    expect(screen.getByText('Choose an animal')).toBeInTheDocument()
  })

  it('should show default selected value', () => {
    render(
      <Select aria-label="Options" defaultSelectedKey="b">
        <SelectItem id="a">Option A</SelectItem>
        <SelectItem id="b">Option B</SelectItem>
      </Select>,
    )

    const trigger = screen.getByRole('button')
    expect(within(trigger).getByText('Option B')).toBeInTheDocument()
  })
})
