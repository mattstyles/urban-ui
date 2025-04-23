'use client'

import { Button, type ButtonProps } from '@urban-ui/button'
import { Icon } from '@urban-ui/icon'
import delay from 'delay'
import { Loader } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

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
  return (
    // Use the base Button component from @urban-ui/button
    <Button {...props} disabled={isPending || props.disabled}>
      {/* AnimatePresence handles the mounting/unmounting animation */}
      <AnimatePresence initial={false} mode="wait">
        {isPending ? (
          // Loader state
          <motion.span
            key="loader"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            // Use inline-flex to ensure proper layout within the button
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            {/* Wrapper div for the spinning animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                loop: Number.POSITIVE_INFINITY,
                ease: 'linear',
                duration: 1,
              }}
              style={{ display: 'flex' }} // Ensures icon is laid out correctly
            >
              <Icon size="sm">
                <Loader />
              </Icon>
            </motion.div>
          </motion.span>
        ) : (
          // Default state (display children)
          <motion.span
            key="children"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            // Use inline-flex to ensure proper layout
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
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
    await delay(1000) // Use await delay instead of setTimeout
    setIsPending(false)
  }

  return (
    <WorkButton {...props} isPending={isPending} onPress={handleClick}>
      {children}
    </WorkButton>
  )
}
