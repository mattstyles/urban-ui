'use client'

// Note that this import only works if open-props is installed into /apps/docs/node_modules -> the plugin will not find it at monorepo root node_modules.
// Note sure why it finds other deps like @urban-ui/text just fine though.
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    borderStyle: 'solid',
    borderColor: colors.blue7,
    borderWidth: 1,
    padding: 20,
  },
  p: {
    color: colors.red7,
  },
})

export function ContentOpenProps() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1>Client content</h1>
      <p {...stylex.props(styles.p)}>
        Styled using stylexjs/open-props. Should be red.
      </p>
    </div>
  )
}
