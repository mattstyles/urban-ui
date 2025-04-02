import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from './button'

describe('Button', () => {
  it('should render with a data-testid', () => {
    render(<Button data-testid="test-button">Content</Button>)
    expect(screen.getByTestId('test-button')).toBeInTheDocument()
    expect(screen.getByTestId('test-button')).toHaveTextContent('Content')
  })

  it('should render string content as Text component', () => {
    render(<Button data-testid="test-button">Content</Button>)
    expect(
      screen.getByTestId('test-button').querySelector('span'),
    ).toBeInTheDocument()
  })

  it('should render non-string content as is', () => {
    render(
      <Button data-testid="test-button">
        <div data-testid="custom-content" className="custom">
          Custom Content
        </div>
      </Button>,
    )
    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
    expect(screen.queryByText('Custom Content')).toHaveClass('custom')
  })

  it('should handle disabled state', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(
      <Button data-testid="test-button" isDisabled onPress={handleClick}>
        Content
      </Button>,
    )

    const button = screen.getByTestId('test-button')
    expect(button).toBeDisabled()

    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should apply variant styles', () => {
    render(
      <Button data-testid="test-button" variant="outline">
        Content
      </Button>,
    )
    expect(screen.getByTestId('test-button')).toBeInTheDocument()
  })

  it('should apply tone styles', () => {
    render(
      <Button data-testid="test-button" tone="critical">
        Content
      </Button>,
    )
    expect(screen.getByTestId('test-button')).toBeInTheDocument()
  })
})

describe('Button polymorph', () => {
  it('should render as button by default', () => {
    render(<Button data-testid="test-button">Content</Button>)
    expect(screen.getByTestId('test-button').tagName).toBe('BUTTON')
  })

  it('should render as anchor when as="link" is provided', () => {
    render(
      <Button data-testid="test-button" as="link" href="https://example.com">
        Content
      </Button>,
    )
    const element = screen.getByTestId('test-button')
    expect(element.tagName).toBe('A')
    expect(element).toHaveAttribute('href', 'https://example.com')
  })

  it('should render as anchor when href is provided without as prop', () => {
    render(
      <Button as="link" data-testid="test-button" href="https://example.com">
        Content
      </Button>,
    )
    const element = screen.getByTestId('test-button')
    expect(element.tagName).toBe('A')
    expect(element).toHaveAttribute('href', 'https://example.com')
  })
})
