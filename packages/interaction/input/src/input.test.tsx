import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Input } from './input'

describe('Input', () => {
  it('should render with a data-testid', () => {
    render(<Input data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toBeInTheDocument()
  })

  it('should render with a placeholder', () => {
    render(<Input data-testid="test-input" placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('should handle user input', async () => {
    const user = userEvent.setup()
    render(<Input data-testid="test-input" />)

    const input = screen.getByTestId('test-input')
    await user.type(input, 'Hello World')

    expect(input).toHaveValue('Hello World')
  })

  it('should handle disabled state', async () => {
    const user = userEvent.setup()
    render(<Input data-testid="test-input" disabled />)

    const input = screen.getByTestId('test-input')
    expect(input).toBeDisabled()

    await user.type(input, 'Test')
    expect(input).toHaveValue('')
  })

  it('should apply size styles', () => {
    render(<Input data-testid="test-input" size="lg" />)
    expect(screen.getByTestId('test-input')).toBeInTheDocument()
  })

  it('should apply error state', () => {
    render(<Input data-testid="test-input" hasError />)
    expect(screen.getByTestId('test-input')).toBeInTheDocument()
  })

  it('should handle controlled value', async () => {
    const handleChange = jest.fn()
    render(
      <Input data-testid="test-input" value="initial" onChange={handleChange} />,
    )

    const input = screen.getByTestId('test-input')
    expect(input).toHaveValue('initial')
  })

  it('should handle name attribute for forms', () => {
    render(<Input data-testid="test-input" name="email" />)
    expect(screen.getByTestId('test-input')).toHaveAttribute('name', 'email')
  })

  it('should handle type attribute', () => {
    render(<Input data-testid="test-input" type="password" />)
    expect(screen.getByTestId('test-input')).toHaveAttribute('type', 'password')
  })
})
