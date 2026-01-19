'use client'

import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'
import { AnimatePresence, motion, useAnimate } from 'motion/react'
import { useState } from 'react'

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: base.transparent,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    textDecoration: 'none',
  },
  x: {
    borderRadius: radii.full,
    backgroundColor: tone.solid,
    color: tone.fgOnBlock,
    fontSize: fontSizes.md,
    lineHeight: fontSizes.lg,
    gap: space['100'],
    paddingInline: space['100'],
    paddingBlock: space['100'],
  },
  motion: {
    // border: '1px dashed orange',
    // padding: '10px',
    // display: 'inline-block',
    overflow: 'hidden',
    // borderRadius: '8px',
    position: 'relative',
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
})

export interface ButtonProps
  extends React.ComponentProps<typeof motion.button> {
  id: string
}

export function Button({ children, id, ...props }: ButtonProps) {
  return (
    <motion.button
      {...stylex.props(styles.base, styles.x, styles.motion)}
      layout
      transition={{
        // type: 'spring',
        // stiffness: 600,
        // damping: 70,
        duration: 1.2,
      }}
      {...props}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{ display: 'block' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

const shortText = 'Ok'
const longText = 'Proceed with action'

export function ResizeableButtonExample() {
  const [isShort, setIsShort] = useState(true)

  const toggleContent = () => {
    setIsShort(!isShort)
  }

  const currentText = isShort ? shortText : longText
  const currentId = isShort ? 'short' : 'long'

  return (
    <Button
      id={currentId} // Pass the changing ID to the button
      onClick={toggleContent} // Use the button itself to toggle
      type="button" // Explicitly set type
    >
      {currentText} {/* Pass the changing text as children */}
    </Button>
  )
}
