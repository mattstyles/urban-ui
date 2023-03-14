import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Input} from './index'

describe('[Input]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Input data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
