import { Local } from './components/local'
import { Content } from './content'
import { ContentExternal } from './contentExternal'
import { ContentOpenProps } from './contentOpenProps'

export default function Page() {
  return (
    <main>
      <h1>Page</h1>
      <Content />
      <ContentExternal />
      <Local />
      <ContentOpenProps />
    </main>
  )
}
