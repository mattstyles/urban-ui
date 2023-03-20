import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import * as Switch from './index'

describe('[Switch]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Switch.Root data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
