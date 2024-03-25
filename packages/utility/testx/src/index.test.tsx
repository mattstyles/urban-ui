import {describe, test, expect} from '@jest/globals'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/jest-globals'

// import inject from '@stylexjs/dev-runtime'
// inject({
//   classNamePrefix: 'x',
//   dev: true,
//   test: false,
// })

import {Testx} from './index.ts'

describe('[testx]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<Testx data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})