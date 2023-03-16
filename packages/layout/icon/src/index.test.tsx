import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Icon} from './index'

describe('[Icon]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Icon data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
