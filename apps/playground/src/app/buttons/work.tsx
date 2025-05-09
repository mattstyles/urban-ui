'use client'

import * as stylex from '@stylexjs/stylex'
import { Button, type ButtonProps } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Icon } from '@urban-ui/icon'
import delay from 'delay'
import { Loader } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'

const styles = stylex.create({
  full: {
    width: '100%',
    height: '100%',
  },
  relative: {
    position: 'relative',
  },
})

interface WorkButtonProps
  extends Omit<ButtonProps, 'children'>,
    React.PropsWithChildren {}

/**
 * An asynchronous button component that displays a loading indicator
 * when in a pending state and animates the transition.
 */
export function WorkButton({
  isPending = false,
  children,
  ...props
}: WorkButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined)
  const [buttonHeight, setButtonHeight] = useState<number | undefined>(
    undefined,
  )

  // We want to react to changes in children here, albeit indirectly
  // useLayoutEffect(() => {
  //   console.log('layout effect', children?.toString(), isPending)
  //   // if (isPending) {
  //   //   setButtonWidth(10)
  //   //   setButtonHeight(10)
  //   //   return
  //   // }

  //   // Measure the button dimensions when it's not pending
  //   if (buttonRef.current && !isPending) {
  //     console.log(
  //       'calculating',
  //       buttonRef.current.offsetWidth,
  //       buttonRef.current.offsetHeight,
  //     )
  //     setButtonWidth(buttonRef.current.offsetWidth)
  //     setButtonHeight(buttonRef.current.offsetHeight)
  //   }
  // }, [isPending]) // Re-measure if pending state changes or children change

  // useLayoutEffect(() => {
  //   console.log('children', children?.toString())
  //   if (buttonRef.current == null) {
  //     return
  //   }

  //   setButtonWidth(0)
  //   setButtonHeight(0)
  // }, [children])

  return (
    // Use the base Button component from @urban-ui/button
    <Button
      ref={buttonRef}
      {...props}
      disabled={isPending || props.disabled}
      // style={{
      //   minWidth: buttonWidth ? `${buttonWidth}px` : 0, // Apply measured width
      //   minHeight: buttonHeight ? `${buttonHeight}px` : 0, // Apply measured height
      // }}
      style={styles.relative}
    >
      {/* AnimatePresence handles the mounting/unmounting animation */}
      <AnimatePresence initial={true} mode="sync">
        {isPending && (
          // Loader state
          <motion.span
            key="loader"
            initial={{
              opacity: 0,
              scale: 0.1,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                // type: 'spring',
                // stiffness: 600,
                // damping: 20,
                // mass: 1.2,
                // delay: 0.15,
                duration: 0.2,
                delay: 0.15,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: {
                duration: 0.2,
              },
            }}
            transition={{
              type: 'spring',
              stiffness: 600,
              damping: 20,
              mass: 1.2,
            }}
            // transition={{ duration: 0.2 }}
            // Use inline-flex to ensure proper layout within the button
            style={{
              position: 'absolute',
              inset: 0,
            }}
          >
            <Flex flex="1" align="center" justify="center" style={styles.full}>
              <Spinner />
            </Flex>
          </motion.span>
        )}

        {/* {isPending ? (
          // Loader state
          <motion.span
            key="loader"
            initial={{
              opacity: 0,
              scale: 0.1,
            }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: {
                duration: 0.2,
              },
            }}
            transition={{
              type: 'spring',
              velocity: 20,
              stiffness: 600,
              damping: 80,
            }}
            // transition={{ duration: 0.2 }}
            // Use inline-flex to ensure proper layout within the button
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <Spinner />
          </motion.span>
        ) : (
          // Default state (display children)
          <motion.span
            key="children"
            initial={{ opacity: 0.5, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{
              type: 'spring',
              // velocity: 15,
              stiffness: 600,
              damping: 20,
              mass: 1.2,
            }}
            // transition={{ duration: 0.5, bounce: 0.4, type: 'spring' }}
            // Use inline-flex to ensure proper layout
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            {children}
          </motion.span>
        )} */}
      </AnimatePresence>
      <motion.span
        key="children"
        layout
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: isPending ? 0 : 1,
          scale: isPending ? 0 : 1,
          transition: {
            type: 'spring',
            stiffness: 600,
            damping: 20,
            mass: 1.2,
            delay: 0.15,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          transition: { duration: 0.2, delay: 0.2 },
        }}
        transition={{
          type: 'spring',
          // velocity: 15,
          stiffness: 600,
          damping: 20,
          mass: 1.2,
          delay: 0.2,
        }}
        // transition={{ duration: 0.5, bounce: 0.4, type: 'spring' }}
        // Use inline-flex to ensure proper layout
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        {children}
      </motion.span>
    </Button>
  )
}

/**
 * Wrapper component to demonstrate the WorkButton's pending state.
 * Toggles the pending state for 1 second upon clicking.
 */
export function WorkButtonExample({
  children,
  ...props
}: WorkButtonProps & { isPending?: boolean }) {
  const [isPending, setIsPending] = useState(false)

  const handleClick = async () => {
    if (isPending) return // Prevent multiple clicks while pending

    await delay(200)
    setIsPending(true)
    await delay(2800) // Use await delay instead of setTimeout
    setIsPending(false)
  }

  return (
    <WorkButton {...props} isPending={isPending} onPress={handleClick}>
      {children}
    </WorkButton>
  )
}

function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        ease: 'linear',
        duration: 1,
      }}
      style={{ display: 'flex' }} // Ensures icon is laid out correctly
    >
      <Icon size="sm">
        <Loader />
      </Icon>
    </motion.div>
  )
}
