import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Separator} from './index'

describe('[Separator]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Separator data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
