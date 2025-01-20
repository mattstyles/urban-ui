import stylex from '@stylexjs/stylex'
import { omit } from 'lodash'
import { Content } from './content.tsx'
import { ContentExternal } from './contentExternal.tsx'
import { ContentOpenProps } from './contentOpenProps.tsx'

const styles = stylex.create({
  container: {
    color: 'hotpink',
  },
})

export default function Home() {
  return (
    <main>
      <h1>Server rendered page title</h1>
      <p {...stylex.props(styles.container)}>
        Styled with stylex from server render. Should be pink.
      </p>
      <Content />
      <ContentExternal />
      <ContentOpenProps />
    </main>
  )
}
