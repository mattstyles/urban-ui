import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import {Checkbox} from './index.tsx'

describe('[Checkbox]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Checkbox data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
