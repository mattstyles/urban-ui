import * as stylex from '@stylexjs/stylex'

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
    </main>
  )
}
