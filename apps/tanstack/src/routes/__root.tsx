import * as stylex from '@stylexjs/stylex'
import { presets } from '@urban-ui/theme'
import { createRootRoute, Outlet } from '@tanstack/react-router'

const styles = stylex.create({
  container: {
    minHeight: '100vh',
  },
})

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div {...stylex.props(styles.container, presets.body)}>
      <Outlet />
    </div>
  )
}
