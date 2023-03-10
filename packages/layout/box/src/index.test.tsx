import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Box} from './index'

describe('[Box]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Box data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
