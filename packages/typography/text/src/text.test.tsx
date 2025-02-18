import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { Text } from './text'

describe('Text', () => {
  it('should render with a data-testid', () => {
    render(<Text data-testid="test-text">Content</Text>)
    expect(screen.getByTestId('test-text')).toBeInTheDocument()
    expect(screen.getByTestId('test-text')).toHaveTextContent('Content')
  })
})
