import type {NextPageWithLayout} from '../_app'
import {Layout} from './layout'

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}

// function Layout({children}: {children: React.ReactNode}) {
//   return (
//     <div>
//       <h1>Hello layout</h1>
//       {children}
//     </div>
//   )
// }

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
