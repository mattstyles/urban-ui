import * as stylex from '@stylexjs/stylex'
import cx from 'clsx'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import '@urban-ui/reset/reset.css'
import './globals.css'

const geistSans = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
})

const styles = stylex.create({
  body: {
    fontFamily: 'Gotham Rounded SSm A, Gotham Rounded SSm B',
  },
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cloud.typography.com/6111354/643726/css/fonts.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://use.typekit.net/euz1nns.css"
        />
      </head>
      <body
        // className={cx(geistSans.className, geistSans.variable, styles.body)}
        {...stylex.props(styles.body)}
      >
        {children}
      </body>
    </html>
  )
}
