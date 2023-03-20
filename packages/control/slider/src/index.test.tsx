import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import * as Slider from './index'

describe('[Slider]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Slider.Root data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
