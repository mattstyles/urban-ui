import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Container} from './index'

describe('[Container]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Container data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
