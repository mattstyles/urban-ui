import { render, screen } from '@testing-library/react'
import { Button } from 'react-aria-components'

import { Select } from './select'
import { SelectItem } from './select-item'
import { SelectListBox } from './select-listbox'
import { SelectValue } from './select-value'

describe('Select', () => {
  it('should render with items', () => {
    render(
      <Select data-testid="select" aria-label="Select an option">
        <Button>
          <SelectValue />
        </Button>
        <SelectListBox>
          <SelectItem id="option1">Option 1</SelectItem>
          <SelectItem id="option2">Option 2</SelectItem>
        </SelectListBox>
      </Select>,
    )

    expect(screen.getByTestId('select')).toBeInTheDocument()
  })

  it('should show placeholder when no value selected', () => {
    render(
      <Select aria-label="Select an option" placeholder="Choose an option">
        <Button>
          <SelectValue />
        </Button>
        <SelectListBox>
          <SelectItem id="option1">Option 1</SelectItem>
        </SelectListBox>
      </Select>,
    )

    expect(screen.getByText('Choose an option')).toBeInTheDocument()
  })
})
