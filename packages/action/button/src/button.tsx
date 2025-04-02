'use client'

import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'

import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'
import * as Match from 'effect/Match'
import { Button as AriaButton, Link as AriaLink } from 'react-aria-components'
import type {
  ButtonProps as AriaButtonProps,
  LinkProps as AriaLinkProps,
} from 'react-aria-components'

const styles = stylex.create({
  base: {
    paddingInline: space['400'],
    paddingBlock: space['200'],
    borderRadius: radii.lg,
    borderColor: base.transparent,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.sm,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.md,
    transition:
      'background 0.2s, border-color 0.2s, color 0.2s, transform 0.1s',
    ':is([data-pressed], :active)': {
      transform: 'scale(0.98)',
    },
    // @TODO this will appear behind other elements and should be fixed properly to always be in front
    ':is(:focus-visible, [data-focus-visible])': {
      outline: '2px solid',
      outlineColor: base.focusRing,
      outlineOffset: '2px',
    },
  },
  disabled: {
    ':disabled': {
      backgroundColor: disabled.background,
      color: disabled.fg,
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    ':disabled:hover': {
      backgroundColor: disabled.background,
      color: disabled.fg,
    },
    ':disabled:active': {
      transform: 'scale(1)',
    },
  },
})

const variants = stylex.create({
  solid: {
    backgroundColor: tone.solid,
    color: tone.fgOnBlock,
    ':is([data-hovered], :hover)': {
      backgroundColor: tone.solidHover,
    },
    ':is([data-pressed], :active)': {
      backgroundColor: tone.solidActive,
    },
  },
  muted: {
    backgroundColor: tone.component,
    color: tone.fgHi,
    ':is([data-hovered], :hover)': {
      backgroundColor: tone.componentHover,
    },
    ':is([data-pressed], :active)': {
      backgroundColor: tone.componentActive,
    },
  },
  outline: {
    backgroundColor: base.transparent,
    borderColor: tone.border,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.sm,
    color: tone.fgHi,
    // @TODO probably alpha scale is better here, maybe?
    ':is([data-hovered], :hover)': {
      backgroundColor: tone.componentHover,
    },
    ':is([data-pressed], :active)': {
      backgroundColor: tone.componentActive,
    },
  },
})

const tones = {
  neutral: themes.neutral,
  primary: themes.primary,
  accent: themes.accent,
  positive: themes.positive,
  warning: themes.warning,
  critical: themes.critical,
  info: themes.info,
}

// type BProps = {
//   as?: 'button'
// } & Omit<AriaButtonProps, 'style' | 'children'> &
//   React.PropsWithChildren &
//   React.RefAttributes<HTMLButtonElement> &
//   Partial<Pick<HTMLButtonElement, 'disabled'>>

// type AProps = {
//   as?: 'link'
// } & Omit<AriaLinkProps, 'style' | 'children'> &
//   React.PropsWithChildren &
//   React.RefAttributes<HTMLAnchorElement>

// type CombinedProps = {
//   /**
//    * Visual variant
//    * @default 'solid'
//    */
//   variant?: keyof typeof variants

//   /**
//    * Color tone
//    * @default 'neutral'
//    */
//   tone?: keyof typeof tones

//   /**
//    * Additional styles to apply
//    */
//   style?: StyleXStyles
// } & (BProps | AProps)

// const foo: CombinedProps = {
//   as: 'button',
//   // disabled: true,
// }

// const bar = getContainer(foo)

// const match = Match.type<string | number>().pipe(
//   // Match when the value is "a"
//   Match.when('a', () => 'ok'),
//   // Fallback when no patterns match
//   Match.orElse(() => 'fallback'),
// )

// console.log(match('a'))

interface ButtonBaseProps
  extends Omit<AriaButtonProps, 'style' | 'children'>,
    React.PropsWithChildren,
    React.RefAttributes<HTMLButtonElement>,
    Partial<Pick<HTMLButtonElement, 'disabled'>> {
  as: 'button'
}

interface LinkProps
  extends Omit<AriaLinkProps, 'style' | 'children'>,
    React.PropsWithChildren,
    React.RefAttributes<HTMLAnchorElement> {
  as: 'link'
}

interface ButtonCommonProps {
  /**
   * Visual variant
   * @default 'solid'
   */
  variant?: keyof typeof variants

  /**
   * Color tone
   * @default 'neutral'
   */
  tone?: keyof typeof tones

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

// Use type for the union
// type ButtonProps = ButtonCommonProps & (ButtonBaseProps | LinkProps)
type ButtonProps = ButtonCommonProps &
  (
    | (Omit<ButtonBaseProps, 'as'> & { as?: 'button' } & { href?: never }) // Button case: no href allowed
    // | (LinkProps & { href: LinkProps['href'] }) // Link case with href
    | LinkProps // Link case with explicit as: 'link'
  )

// export interface ButtonProps
//   extends Omit<AriaButtonProps, 'style' | 'children'>,
//     React.PropsWithChildren,
//     React.RefAttributes<HTMLButtonElement>,
//     Partial<Pick<HTMLButtonElement, 'disabled'>> {
//   /**
//    * Visual variant
//    * @default 'solid'
//    */
//   variant?: keyof typeof variants

//   /**
//    * Color tone
//    * @default 'neutral'
//    */
//   tone?: keyof typeof tones

//   /**
//    * Additional styles to apply
//    */
//   style?: StyleXStyles
// }

// const isButtonProps = (
//   props: CCombinedProps,
// ): props is BPropsBase & CommonProps =>
//   props.as === 'button' || props.as === undefined // Default to button if not specified

// const isLinkProps = (
//   props: CCombinedProps,
// ): props is APropsBase & CommonProps => props.as === 'link'

const getContainer = Match.type<ButtonProps>().pipe(
  Match.whenOr({ as: 'link' }, (props) => {
    return <Link {...props} />
  }),
  Match.orElse((props) => <Pressable as="button" {...props} />),
)

/**
 * Button component built on react-aria-components.
 * Provides consistent styling with the Urban UI design system.
 */
// export function Button({
//   variant = 'solid',
//   tone: toneName = 'primary',
//   style,
//   children,
//   ...props
// }: CCombinedProps) {
export function Button(props: ButtonProps) {
  const content =
    typeof props.children === 'string' ? (
      <Text weight="semibold">{props.children}</Text>
    ) : (
      props.children
    )

  // const { as, variant = 'solid', tone = 'primary', style, ...restProps } = props

  return getContainer(props)

  // if (isLinkProps(props)) {
  //   const { variant = 'solid', tone = 'primary', style, ...rest } = props
  //   return (
  //     <Flex asChild align="center" justify="center" gap="100">
  //       <AriaLink
  //         {...rest}
  //         isDisabled={props.isDisabled}
  //         {...stylex.props([
  //           styles.base,
  //           variants[variant],
  //           tones[tone],
  //           styles.disabled,
  //           style,
  //         ])}
  //       >
  //         {content}
  //       </AriaLink>
  //     </Flex>
  //   )
  // }

  // if (isButtonProps(props)) {
  //   const { variant = 'solid', tone = 'primary', style, ...rest } = props
  //   return (
  //     <Flex asChild align="center" justify="center" gap="100">
  //       <AriaButton
  //         {...rest}
  //         isDisabled={props.isDisabled || props.disabled}
  //         {...stylex.props([
  //           styles.base,
  //           variants[variant],
  //           tones[tone],
  //           styles.disabled,
  //           style,
  //         ])}
  //       >
  //         {content}
  //       </AriaButton>
  //     </Flex>
  //   )
  // }

  // throw new Error('Invalid props')

  // const { variant = 'solid', tone = 'primary', style, ...rest } = props
  // return (
  //   <Flex asChild align="center" justify="center" gap="100">
  //     <AriaLink
  //       {...rest}
  //       isDisabled={props.isDisabled}
  //       {...stylex.props([
  //         styles.base,
  //         variants[variant],
  //         tones[tone],
  //         styles.disabled,
  //         style,
  //       ])}
  //     >
  //       {content}
  //     </AriaLink>
  //   </Flex>
  // )

  // return (
  //   <Flex asChild align="center" justify="center" gap="100">
  //     <AriaButton
  //       {...props}
  //       isDisabled={props.isDisabled || props.disabled}
  //       {...stylex.props([
  //         styles.base,
  //         variants[variant],
  //         tones[toneName],
  //         styles.disabled,
  //         style,
  //       ])}
  //     >
  //       {content}
  //     </AriaButton>
  //   </Flex>
  // )
}

function getSlot({ children }: { children: React.ReactNode }) {
  const content =
    typeof children === 'string' ? (
      <Text weight="semibold">{children}</Text>
    ) : (
      children
    )
  return content
}

function Pressable(props: ButtonCommonProps & ButtonBaseProps) {
  const {
    variant = 'solid',
    tone = 'primary',
    style,
    children,
    ...rest
  } = props

  const content = getSlot({ children })

  return (
    <Flex asChild align="center" justify="center" gap="100">
      <AriaButton
        {...rest}
        isDisabled={props.isDisabled || props.disabled}
        {...stylex.props([
          styles.base,
          variants[variant],
          tones[tone],
          styles.disabled,
          style,
        ])}
      >
        {content}
      </AriaButton>
    </Flex>
  )
}

function Link(props: ButtonCommonProps & LinkProps) {
  const {
    variant = 'solid',
    tone = 'primary',
    style,
    children,
    ...rest
  } = props

  const content = getSlot({ children })
  return (
    <Flex asChild align="center" justify="center" gap="100">
      <AriaLink
        {...rest}
        isDisabled={props.isDisabled}
        {...stylex.props([
          styles.base,
          variants[variant],
          tones[tone],
          styles.disabled,
          style,
        ])}
      >
        {content}
      </AriaLink>
    </Flex>
  )
}
