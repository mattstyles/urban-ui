import { AnimatePresence, motion } from 'motion/react'
import React from 'react'

/**
 * A component that animates the width of its content as it changes.
 */
export function Popper({
  children,
  id,
}: { children: React.ReactNode; id: string }) {
  const childrenKey = React.Children.toArray(children).toString()

  console.log(childrenKey, id)
  return (
    <motion.div
      layout
      style={{
        border: '1px dashed orange',
        // padding: '10px',
        display: 'inline-block',
        overflow: 'hidden',
        borderRadius: '8px',
        position: 'relative',
      }}
      transition={{ type: 'spring', stiffness: 600, damping: 70 }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'block', border: '1px dashed cyan' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
