import { expectTypeOf } from 'expect-type'
import { Button } from './button'

// Valid cases
const validButton = <Button>Content</Button>
const validDisabledButton = <Button isDisabled>Content</Button>
const validDisabledButton2 = <Button disabled>Content</Button>

// Type tests
expectTypeOf<typeof Button>().toBeCallableWith({
  children: 'Content',
  isDisabled: true,
})

expectTypeOf<typeof Button>().toBeCallableWith({
  children: 'Content',
  disabled: true,
})

// expectTypeOf<typeof Button>().toBeCallableWith({
//   children: 'Content',
//   as: 'link',
//   href: 'https://example.com',
// })

// // @ts-expect-error href cannot be used without as="link"
// expectTypeOf<typeof Button>().toBeCallableWith({
//   children: 'Content',
//   href: 'https://example.com',
// })

// // @ts-expect-error href is required when as="link" is specified
// expectTypeOf<typeof Button>().toBeCallableWith({
//   children: 'Content',
//   as: 'link',
// })
