import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Switch} from './index'

describe('[Switch]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Switch data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
