import * as stylex from '@stylexjs/stylex'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { presets, themes } from '@urban-ui/theme'
import { surface } from '@urban-ui/theme/colors.stylex'

const styles = stylex.create({
  root: {
    minHeight: '100vh',
    backgroundColor: surface.base,
  },
})

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div {...stylex.props(styles.root, presets.body, themes.neutral)}>
      <Outlet />
    </div>
  )
}
