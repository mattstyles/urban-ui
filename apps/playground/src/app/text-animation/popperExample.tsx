'use client'

import * as stylex from '@stylexjs/stylex'
import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { borderWidths, radii } from '@urban-ui/theme/borders.stylex'
import { surface } from '@urban-ui/theme/colors.stylex'
import { accent } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import React, { useState } from 'react'
import { Popper } from './popper'

const styles = stylex.create({
  indicator: {
    borderRadius: radii.none,
    borderWidth: borderWidths.sm,
    borderStyle: 'dashed',
    borderColor: accent.border,
  },
})

const shortText = 'Short content'
const longText = 'This is significantly longer content to demonstrate resizing'

export function PopperExample() {
  const [isShort, setIsShort] = useState(true)

  const toggleContent = () => {
    setIsShort(!isShort)
  }

  return (
    <Flex direction="v" gap="200" align="flex-start">
      <Flex style={styles.indicator}>
        <Popper id={isShort ? 'short' : 'long'}>
          {isShort ? shortText : longText}
        </Popper>
      </Flex>
      <Button onPress={toggleContent}>Toggle Content</Button>

      <Button onPress={toggleContent}>
        <Popper id={isShort ? 'short' : 'long'}>
          {isShort ? shortText : longText}
        </Popper>
      </Button>
    </Flex>
  )
}
