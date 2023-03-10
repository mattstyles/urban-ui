import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Absolute} from './index'

describe('[Absolute]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Absolute data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
