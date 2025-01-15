import stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    background: 'rgb(232, 228, 228)',
    padding: 8,
    borderRadius: 4,
    borderColor: 'rgb(205, 210, 215)',
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 4,
  },
})

export function Section({ children }: React.PropsWithChildren) {
  return <section {...stylex.props(styles.container)}>{children}</section>
}
