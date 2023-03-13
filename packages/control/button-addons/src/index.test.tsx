import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {LoadingButton} from './index'

describe('[Button]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<LoadingButton data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
