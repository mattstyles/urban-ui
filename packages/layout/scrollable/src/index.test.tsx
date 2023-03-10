import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import * as Scrollable from './index'

describe('[Scrollable]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Scrollable.Root data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
