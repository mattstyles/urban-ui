import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Stack} from './index'

describe('[Stack]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Stack data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
