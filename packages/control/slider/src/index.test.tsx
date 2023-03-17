import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Slider} from './index'

describe('[Slider]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Slider data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
