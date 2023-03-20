import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Select} from './index'

describe('[Select]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Select data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
