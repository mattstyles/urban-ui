// import './globals.css'
import type {Metadata} from 'next'
// import {Inter} from 'next/font/google'
import {inter} from '~/app/font.ts'
import cx from 'clsx'

// @TODO base create a global theme currently, which is css variables only, should it also create global style? primarily this would be to set the default font family as beyond the reset we don't really want to apply anything that will be inherited.
import '@urban-ui/theme/base'
import '@urban-ui/theme/reset'

// @TODO can we apply a font-family to the standard global theme for urban-ui?
// This touches on how to overwrite the default theme, and then, how to swap themes?

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={cx(inter.className, inter.variable)}>{children}</body>
    </html>
  )
}