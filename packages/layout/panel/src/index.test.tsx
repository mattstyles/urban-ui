import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Panel} from './index'

describe('[Panel]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Panel data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
