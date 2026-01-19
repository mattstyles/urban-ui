'use client'

import * as stylex from '@stylexjs/stylex'
import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import React, { useState } from 'react'
import { RotatingView } from './rotate'

const styles = stylex.create({
  page: {
    padding: space[800],
  },
  viewItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    padding: '1rem',
  },
  item1: {
    backgroundColor: 'coral',
    width: '200px',
    height: '150px',
  },
  item2: {
    backgroundColor: 'skyblue',
    width: '300px',
    height: '100px',
  },
  item3: {
    backgroundColor: 'mediumseagreen',
    width: '150px',
    height: '200px',
  },
  item4: {
    backgroundColor: 'gold',
    width: '250px',
    height: '250px',
    fontSize: '1rem',
  },
})

const items = [
  {
    key: 'item1',
    id: 'view-item-1',
    style: styles.item1,
    content: 'View 1 (200x150)',
  },
  {
    key: 'item2',
    id: 'view-item-2',
    style: styles.item2,
    content: 'View 2 (300x100)',
  },
  {
    key: 'item3',
    id: 'view-item-3',
    style: styles.item3,
    content: 'View 3 (150x200)',
  },
  {
    key: 'item4',
    id: 'view-item-4',
    style: styles.item4,
    content: 'View 4 (250x250) - Largest',
  },
]

export default function RotatePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animationType, setAnimationType] = useState<'slide' | 'fade'>('slide')

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const activeItemId = items[activeIndex].id

  return (
    <Flex direction="v" gap="400" style={[styles.page]}>
      <h1>Rotating View Component Demo</h1>

      <Flex gap="400" align="center">
        <p>Animation type:</p>
        <Button
          tone={animationType === 'slide' ? 'primary' : 'neutral'}
          onClick={() => setAnimationType('slide')}
        >
          Slide
        </Button>
        <Button
          tone={animationType === 'fade' ? 'primary' : 'neutral'}
          onClick={() => setAnimationType('fade')}
        >
          Fade
        </Button>
      </Flex>

      <RotatingView activeId={activeItemId} animationVariant={animationType}>
        {items.map((item) => (
          <div
            key={item.key}
            id={item.id}
            {...stylex.props(styles.viewItem, item.style)}
          >
            {item.content}
          </div>
        ))}
      </RotatingView>

      <Flex gap="400">
        <Button onClick={handlePrev} tone="neutral">
          Previous
        </Button>
        <Button onClick={handleNext} tone="neutral">
          Next
        </Button>
      </Flex>

      <Flex direction="v" gap="200">
        <Text asChild>
          <p>Current active ID: {activeItemId}</p>
        </Text>
        <Text asChild>
          <p>
            Container should be 300px wide and 250px tall (based on View 2 and
            View 4).
          </p>
        </Text>
      </Flex>
    </Flex>
  )
}
