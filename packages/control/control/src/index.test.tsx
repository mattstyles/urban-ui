import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Control} from './index'

describe('[Control]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Control data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
