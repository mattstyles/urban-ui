import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Text} from './index'

describe('[Text]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Text data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
