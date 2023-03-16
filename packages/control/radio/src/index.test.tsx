import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Radio} from './index'

describe('[Radio]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Radio data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
