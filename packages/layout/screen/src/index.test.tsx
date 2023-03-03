import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Screen} from './index'

describe('[Screen]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Screen data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
