import {DocsFull} from '@urban-ui/page'
import {TextBlock} from 'components/lorem'

export default function Page() {
  return (
    <DocsFull.Root>
      <DocsFull.Aside css={{backgroundColor: 'hotpink'}}>
        Hello aside
      </DocsFull.Aside>
      <DocsFull.Main css={{backgroundColor: 'cornsilk'}}>
        <DocsFull.Article>
          <h1>Main / Article</h1>
          <TextBlock size={10} />
        </DocsFull.Article>
      </DocsFull.Main>
      <DocsFull.Additional css={{backgroundColor: 'rebeccapurple'}}>
        Some additional content
      </DocsFull.Additional>
    </DocsFull.Root>
  )
}
