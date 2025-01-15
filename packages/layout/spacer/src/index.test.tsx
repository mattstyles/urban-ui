import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import '@testing-library/jest-dom/vitest'

import { Spacer } from './index'

describe('[Spacer]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Spacer data-testid="some-id" />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
