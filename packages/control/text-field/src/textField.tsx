'use client'

import type {VariantProps} from 'cva'
import type {AriaTextFieldProps} from '@react-aria/textfield'

import {forwardRef, useRef, useMemo} from 'react'
import {tones} from '@urban-ui/theme'
import {useTextField} from '@react-aria/textfield'
import {useHover} from '@react-aria/interactions'
import {useFocusRing} from '@react-aria/focus'
import {useField} from '@react-aria/label'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {cva} from 'cva'
import {Input} from '@urban-ui/input'
import {Text} from '@urban-ui/text'
import {Flex} from '@urban-ui/flex'
// import {base} from './input.css.ts'
// import {sizes, colors} from './variants.css.ts'

const variants = cva(null, {
  variants: {},
})
// const variants = cva([base], {
//   variants: {
//     background: {
//       app: colors.app,
//       surface: colors.surface,
//       emphasis: colors.emphasis,
//     },
//     tone: {
//       primary: tones.primary,
//       neutral: '',
//       critical: '',
//       positive: '',
//       caution: '',
//     },
//     size: {
//       sm: sizes.small,
//       md: sizes.standard,
//       lg: sizes.large,
//     },
//   },
//   defaultVariants: {
//     background: 'app',
//   },
// })

export interface TextFieldProps
  extends Omit<AriaTextFieldProps, 'children'>,
    VariantProps<typeof variants> {
  className?: string
  children: React.ReactNode
}

type ElementType = HTMLInputElement
export const TextField = forwardRef<ElementType, TextFieldProps>(
  ({className, ...props}, passRef) => {
    const innerRef = useRef<ElementType>(null)
    const ref = useObjectRef(
      useMemo(() => {
        return mergeRefs(passRef, innerRef)
      }, [passRef, innerRef]),
    )

    const {labelProps, fieldProps} = useField({...props, label: 'foobarbaz'})
    // const {inputProps, labelProps} = useTextField(props, ref)
    // const {hoverProps, isHovered} = useHover(props)
    // const {focusProps, isFocusVisible, isFocused} = useFocusRing(
    //   mergeProps(props, {
    //     isTextInput: true,
    //   }),
    // )

    // return (
    //   <input
    //     className={variants({className})}
    //     {...mergeProps(inputProps, hoverProps, focusProps)}
    //     ref={ref}
    //     data-hovered={isHovered}
    //     data-focused={isFocused}
    //     data-focus-visible={isFocusVisible}
    //   />
    // )

    console.log(labelProps, fieldProps)

    return (
      <Flex orientation='v' gap='md' alignment='start'>
        <Text asChild>
          <label {...labelProps}>Some label</label>
        </Text>
        <Input {...fieldProps} />
      </Flex>
    )
  },
)
TextField.displayName = 'TextField'

/**
 * <TextField.Root tone='critical' orientation='h'>
 *   <TextField.Label size='md'>Label</TextField.Label>
 *   <TextField.Input size='lg' onChange={} />
 *   <Text slot='description'>Some description</Text>
 * </TextField.Root>
 */

/**
 * <TextField.Root tone='critical' orientation='v'>
 *   <Flex alignment='center' justify='spread' orientation='h'>
 *     <Text slot='label' size='md'>Label</Text>
 *     <Count> _or_ <Icon> _or_ <HelpTooltip>
 *   </Flex>
 *   <TextField.Input size='lg' slot='control' onChange={} />
 *   <Text slot='error'>Some description</Text>
 * </TextField.Root>
 */

/**
 * Slot-based allows some level of customisation within the text field,
 * maybe rename this to Field which handles the layout and applying accessibility handlers (but how? accessibility labels and describedby etc come from useTextField, or other hooks, how to select a hook based on the type of the control slot?)
 */
