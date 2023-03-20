import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import * as Checkbox from './index'

describe('[Checkbox]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Checkbox.Root data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
