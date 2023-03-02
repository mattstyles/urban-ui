import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Spacer} from './index'

// Not too useful really :rofl: @TODO
test('Checks that spacer renders a div', async () => {
  // ARRANGE
  const {container} = render(<Spacer />)

  // ACT

  // ASSERT
  const el = container.querySelector('div')
  expect(el).toBeInTheDocument()
})
