import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Scrollable} from './index'

describe('[Scrollable]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Scrollable data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
