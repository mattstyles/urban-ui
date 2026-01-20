import * as stylex from '@stylexjs/stylex'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { presets } from '@urban-ui/theme'

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
