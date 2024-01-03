import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import {Button} from './index.tsx'

describe('[Button]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Button data-testid='some-id'>Button</Button>)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
