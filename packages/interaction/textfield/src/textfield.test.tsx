import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TextField } from './textfield'

describe('TextField', () => {
  it('should render with a label', () => {
    render(<TextField label="Email" data-testid="test-field" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('should render with a placeholder', () => {
    render(<TextField placeholder="Enter email" data-testid="test-field" />)
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('should render with description text', () => {
    render(
      <TextField
        label="Email"
        description="We'll never share your email"
        data-testid="test-field"
      />,
    )
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
  })

  it('should handle user input', async () => {
    const user = userEvent.setup()
    render(<TextField label="Email" data-testid="test-field" />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'test@example.com')

    expect(input).toHaveValue('test@example.com')
  })

  it('should handle disabled state', async () => {
    const user = userEvent.setup()
    render(<TextField label="Email" isDisabled data-testid="test-field" />)

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()

    await user.type(input, 'Test')
    expect(input).toHaveValue('')
  })

  it('should apply size styles', () => {
    render(<TextField label="Email" size="lg" data-testid="test-field" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should handle controlled value', () => {
    render(
      <TextField
        label="Email"
        value="test@example.com"
        data-testid="test-field"
      />,
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('test@example.com')
  })

  it('should handle name attribute for forms', () => {
    render(<TextField label="Email" name="email" data-testid="test-field" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'email')
  })

  it('should handle type attribute', () => {
    render(<TextField label="Password" type="password" data-testid="test-field" />)
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })

  it('should display error message when invalid', () => {
    render(
      <TextField
        label="Email"
        isInvalid
        errorMessage="Invalid email address"
        data-testid="test-field"
      />,
    )
    expect(screen.getByText('Invalid email address')).toBeInTheDocument()
  })

  it('should be required when isRequired is true', () => {
    render(<TextField label="Email" isRequired data-testid="test-field" />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })
})
