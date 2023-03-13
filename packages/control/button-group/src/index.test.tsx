import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {ButtonGroup} from './index'

describe('[ButtonGroup]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<ButtonGroup data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
