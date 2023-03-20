import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import * as Radio from './index'

describe('[Radio]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Radio.Root data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
