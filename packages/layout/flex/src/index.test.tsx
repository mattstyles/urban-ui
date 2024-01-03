import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import {Flex} from './index.tsx'

describe('[Flex]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Flex data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
