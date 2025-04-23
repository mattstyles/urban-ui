'use client'

import * as stylex from '@stylexjs/stylex'
import delay from 'delay'
import { AnimatePresence, motion, transform, useAnimate } from 'motion/react'
import { useEffect, useState } from 'react'

import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { borderWidths, radii } from '@urban-ui/theme/borders.stylex'
import { surface, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  container: {
    padding: space[200],
    backgroundColor: surface.muted,
    borderRadius: radii.lg,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
  },
})

export const AsyncButton = () => {
  const [isPending, setIsPending] = useState(false)

  const [scope, animate] = useAnimate()

  const mapRemainingToSpringVelocity = transform([0, 1], [50, 20])

  useEffect(() => {
    // if (isPending) {
    //   animate(contentRef, { opacity: 0 }, { duration: 0 })
    // } else {
    //   animate(contentRef, { opacity: 1 }, { duration: 0 })
    // }

    console.log('animating')

    animate(
      scope.current,
      // [
      //   { scale: 0.5, opacity: 0.5 },
      //   { scale: 1, opacity: 1 },
      // ],
      { scale: 1, opacity: 1 },
      {
        type: 'spring',
        // velocity: mapRemainingToSpringVelocity(isPending ? 0 : 1),
        velocity: isPending ? 30 : 20,
        stiffness: 600,
        damping: 80,
      },
    )
  }, [isPending, animate, scope.current])

  return (
    <Flex direction="v" gap="200" style={styles.container}>
      <Text>Is Pending: {isPending.toString()}</Text>
      <Button
        onPress={async () => {
          await delay(200)
          setIsPending(true)
          await delay(1000)
          setIsPending(false)
        }}
        disabled={isPending}
        isPending={isPending}
      >
        {({ isPending }) => {
          const content = isPending ? 'Loading...' : 'Async'
          return <motion.span ref={scope}>{content}</motion.span>
        }}
      </Button>
    </Flex>
  )
}

export function Mountable({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  return (
    <Flex direction="v" gap="200">
      <Button onPress={() => setIsMounted(!isMounted)}>
        {isMounted ? 'Unmount' : 'Mount'}
      </Button>
      {isMounted && children}
    </Flex>
  )
}
