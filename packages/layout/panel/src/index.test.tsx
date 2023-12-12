import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
// jest-dom doesn't seem to understand non-globals and fails
// import '@testing-library/jest-dom'
// vitest-dom works though, but recommends using jest-dom
import 'vitest-dom/extend-expect'

import {Panel} from './index.tsx'

describe('[Panel]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Panel.Root data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
