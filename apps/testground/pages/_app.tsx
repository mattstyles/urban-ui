import type {AppProps} from 'next/app'

import {globalStyles} from '@urban-ui/theme'

function App({Component, pageProps}: AppProps) {
  globalStyles()
  return <Component {...pageProps} />
}

export default App
