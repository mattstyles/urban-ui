import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Center} from './index'

describe('[Center]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Center data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
