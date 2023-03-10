import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Button} from './index'

describe('[Button]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Button data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
