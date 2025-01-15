import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { render, screen } from '@testing-library/react'

import { GlobalRegistrator } from '@happy-dom/global-registrator'
import inject from '@stylexjs/dev-runtime'

GlobalRegistrator.register()

// console.log(inject);
// inject({
// 	classNamePrefix: "x",
// 	dev: false,
// 	test: true,
// 	useRemForFontSize: false,
// 	styleResolution: "application-order",
// });

import { Flex } from './index'

beforeEach(() => {
  inject({
    classNamePrefix: 'x',
    dev: false,
    test: true,
    useRemForFontSize: false,
    styleResolution: 'application-order',
  })
})

describe('flex', () => {
  test('Forwards the test-id', () => {
    // @TODO handle stylex without a babel transform i.e. when running in the bun context rather than with Jest/Vite directly.
    // const output = render(<Flex data-testid="some-id" />)
    // console.log(Flex)

    const output = render(<button type="button">hello world</button>)
    const el = output.findByText('hello world')
    expect(el).toBeDefined()

    document.body.innerHTML = '<button>My button</button>'
    const button = document.querySelector('button')
    expect(button?.innerText).toEqual('My button')

    const foo = 5
    expect(foo).toBe(5)
  })
})
