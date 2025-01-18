'use client'

import stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
  },
})

export function Content() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1>Client content</h1>
      <p>Styled with stylex directly</p>
    </div>
  )
}
