import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import * as Select from './index'

describe('[Select]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(
      <Select.Root>
        <Select.Trigger data-testid='some-id' />
      </Select.Root>
    )

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
