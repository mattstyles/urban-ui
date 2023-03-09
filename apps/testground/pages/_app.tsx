import type {NextPage} from 'next'
import type {AppProps} from 'next/app'

import {globalStyles} from '@urban-ui/theme'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({Component, pageProps}: AppPropsWithLayout) {
  globalStyles()
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default App
