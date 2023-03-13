import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {ReloadIcon} from '@radix-ui/react-icons'

import {WorkButton} from './index'

describe('[Button]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(
      <WorkButton
        isWorking={false}
        icon={<ReloadIcon />}
        data-testid='some-id'
      />
    )

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
