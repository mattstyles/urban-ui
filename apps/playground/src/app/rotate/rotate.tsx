'use client'

import * as stylex from '@stylexjs/stylex'
import { AnimatePresence, motion } from 'framer-motion'
import type React from 'react'
import {
  Children,
  type Key,
  type ReactElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const styles = stylex.create({
  container: {
    position: 'relative',
    overflow: 'visible',
    // Ensure container respects the measured dimensions
    // width: 'auto', // these will be set dynamically
    // height: 'auto', // these will be set dynamically
  },
  childWrapper: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%', // Child wrapper takes full size of animated container
    height: '100%',
  },
  // Hidden wrapper for all measurement items, to ensure they don't affect layout
  offscreenMeasureContainer: {
    position: 'absolute',
    width: 0, // Effectively makes this container invisible and non-interactive
    height: 0,
    overflow: 'hidden',
    visibility: 'hidden', // Double ensure it's not visible
    zIndex: -1000, // Far behind everything else
  },
  // Individual item for measurement, styled to allow content to define size
  measureItem: {
    display: 'inline-block', // Shrink-wraps content
    verticalAlign: 'top', // Consistent alignment
    position: 'static', // Important: allow natural flow for sizing
    visibility: 'visible', // Must be visible within its hidden parent for getBoundingClientRect
  },
})

type RotatingViewProps = {
  children: React.ReactNode
  activeId: Key
  animationVariant?: 'slide' | 'fade'
}

const defaultAnimationVariants = {
  slide: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { type: 'tween', duration: 0.3 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { type: 'tween', duration: 0.3 },
  },
}

export function RotatingView({
  children,
  activeId,
  animationVariant = 'slide',
}: RotatingViewProps) {
  const [dimensions, setDimensions] = useState<{
    width: number | string // Allow string for 'auto'
    height: number | string // Allow string for 'auto'
  }>({ width: 'auto', height: 'auto' }) // Revert to 'auto'

  const measureRefs = useRef<Map<Key, HTMLDivElement | null>>(new Map())

  const validChildrenArray = useMemo(() => {
    return Children.toArray(children).filter(
      (child): child is ReactElement & { props: { id: Key } } =>
        isValidElement(child) &&
        child.props.id !== null &&
        child.props.id !== undefined,
    )
  }, [children])

  useLayoutEffect(() => {
    console.log('[RotatingView] useLayoutEffect triggered')
    let maxWidth = 0
    let maxHeight = 0
    let measuredSomething = false

    if (validChildrenArray.length === 0) {
      console.log('[RotatingView] No valid children, setting dimensions to 0x0')
      setDimensions({ width: 0, height: 0 }) // If no children, collapse to 0
      return
    }

    validChildrenArray.forEach((child, index) => {
      const measureNode = measureRefs.current.get(child.props.id!)
      if (measureNode) {
        const rect = measureNode.getBoundingClientRect()
        console.log(
          `[RotatingView] Measuring child ${index} (id: ${child.props.id!}): width=${rect.width}, height=${rect.height}`,
        )
        maxWidth = Math.max(maxWidth, rect.width)
        maxHeight = Math.max(maxHeight, rect.height)
        if (rect.width > 0 || rect.height > 0) {
          measuredSomething = true
        }
      } else {
        console.warn(
          `[RotatingView] Could not find measureNode for child id: ${child.props.id!}`,
        )
      }
    })

    console.log(
      `[RotatingView] Calculated: maxWidth=${maxWidth}, maxHeight=${maxHeight}, measuredSomething=${measuredSomething}`,
    )

    if (measuredSomething) {
      setDimensions({ width: maxWidth, height: maxHeight })
      console.log(
        `[RotatingView] Setting dimensions to: ${maxWidth}x${maxHeight}`,
      )
    } else if (validChildrenArray.length > 0 && !measuredSomething) {
      // Children exist but all measured 0 or refs not found.
      // If initial state was 'auto', and still nothing measured, let it remain 'auto'
      // or set to 0 if preferred. For now, if it was 'auto' and couldn't measure, it stays 'auto'.
      // If it had a specific pixel size and now measures 0, it would collapse to 0.
      console.log(
        '[RotatingView] Children exist but nothing measurable. Current dimensions:',
        dimensions,
      )
      // If dimensions are still 'auto', this means it's likely the first client-side run and measurement failed.
      // If they were numbers, and now it measures 0, perhaps set to 0.
      // This part might need refinement based on observed behavior if measurement fails after initial success.
      // For now, if it's auto and fails, it stays auto. If it was a number and fails, it becomes 0 if !measuredSomething.
      if (
        typeof dimensions.width === 'number' ||
        typeof dimensions.height === 'number'
      ) {
        // It previously had a size, now it doesn't. Default to 0 if nothing is measurable.
        // However, if it's already 0,0 due to no children, that's handled above.
        // This branch is for when children exist but are not measurable.
        setDimensions({ width: 0, height: 0 })
      }
    } else if (validChildrenArray.length === 0) {
      setDimensions({ width: 0, height: 0 })
    }
  }, [validChildrenArray]) // Dependency on validChildrenArray only

  const activeChild = useMemo(() => {
    return validChildrenArray.find((child) => child.props.id === activeId)
  }, [validChildrenArray, activeId]) // Depend on activeId

  const currentAnimation = defaultAnimationVariants[animationVariant]

  console.log(activeChild)
  console.log({ width: dimensions.width, height: dimensions.height })

  return (
    <>
      {/* Hidden elements for measurement. These are *not* the animated children. */}
      <div {...stylex.props(styles.offscreenMeasureContainer)}>
        {validChildrenArray.map((child) => (
          <div
            key={`measure-${child.props.id!}`} // Use child.props.id for unique key in map
            ref={(el) => measureRefs.current.set(child.props.id!, el)} // Use child.props.id for ref map
            {...stylex.props(styles.measureItem)}
          >
            {child}
          </div>
        ))}
      </div>

      <div
        {...stylex.props(styles.container)}
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          {activeChild && (
            <motion.div
              key={activeId} // Framer Motion uses this key (now activeId) for enter/exit animations
              {...stylex.props(styles.childWrapper)}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={currentAnimation}
              transition={currentAnimation.transition}
            >
              {activeChild}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
