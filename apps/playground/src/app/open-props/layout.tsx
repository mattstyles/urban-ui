import * as stylex from '@stylexjs/stylex'

import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  page: {
    padding: space.xxl,
  },
})

export default function Layout({ children }: React.PropsWithChildren) {
  return <div {...stylex.props(styles.page)}>{children}</div>
}
