import * as stylex from '@stylexjs/stylex'
import { Link as RouterLink } from '@tanstack/react-router'
import { Icon } from '@urban-ui/icon'
import { Link } from '@urban-ui/link'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'

const styles = stylex.create({
  navItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: radii.md,
    color: tone.fgOnBlock,
    backgroundColor: {
      default: 'transparent',
      ':hover': tone.solidHover,
      ':active': tone.solidActive,
    },
    transition: 'background-color 150ms ease',
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    height: 3,
    width: {
      default: 0,
      [stylex.when.ancestor(':hover')]: 24,
    },
    backgroundColor: base.white,
    borderRadius: radii.full,
    transition: 'width 200ms ease',
    pointerEvents: 'none',
  },
})

interface NavItemProps {
  to: string
  icon: React.ComponentType
  label: string
}

export function NavItem({ to, icon: LucideIcon, label }: NavItemProps) {
  return (
    <Link
      asChild
      variant="clear"
      style={[styles.navItem, stylex.defaultMarker()]}
    >
      <RouterLink to={to} aria-label={label}>
        <Icon size="xl">
          <LucideIcon />
        </Icon>
        <span {...stylex.props(styles.accentBar)} />
      </RouterLink>
    </Link>
  )
}
