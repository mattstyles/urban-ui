import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Content} from './index'

describe('[Content]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Content data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
