import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import {TestComponent} from './index.tsx'

describe('[TestComponent]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<TestComponent content='foo' data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
