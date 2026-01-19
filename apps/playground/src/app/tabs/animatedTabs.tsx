'use client'

import type { Key } from '@react-types/shared'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import {
  type AnimationPlaybackControlsWithThen,
  animate,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Collection, Tab, TabList, TabPanel, Tabs } from 'react-aria-components'

const styles = stylex.create({
  container: {
    width: 'fit-content',
    maxWidth: 'min(100%, 350px)',
  },
  tabRail: {
    position: 'relative',
  },
  tabList: {
    display: 'flex',
    // marginInline: '@TODO -margin to handle outset tab indicator'
  },
  tab: {
    paddingInline: space[100],
    paddingBlock: space[100],
    transition: 'all linear 200ms',
    touchAction: 'none',
    outlineStyle: 'none',
    cursor: 'default',
  },
  tabContentSelected: {
    color: base.black,
  },
  indicator: {
    backgroundColor: base.white,
    borderRadius: radii.full,
    inset: 0,
    position: 'absolute',
    mixBlendMode: 'difference',
  },
  tabPanels: {
    marginBlock: space[400],
    scrollSnapType: 'x mandatory',
    overflow: 'auto',
    display: 'flex',
    scrollbarWidth: 'none',
  },
  tabPanel: {
    scrollSnapAlign: 'start',
    width: '100%',
    flexShrink: 0,
    borderRadius: radii.sm,
    paddingInline: space[200],
  },
})

const tabs = [
  { id: 'world', label: 'World' },
  { id: 'ny', label: 'N.Y.' },
  { id: 'business', label: 'Business' },
  { id: 'arts', label: 'Arts' },
  { id: 'science', label: 'Science' },
]

export function AnimatedTabs() {
  const [selectedKey, setSelectedKey] = useState<Key>(tabs[0].id)

  const tabListRef = useRef<HTMLDivElement>(null)
  const tabPanelsRef = useRef<HTMLDivElement>(null)

  // Track the scroll position of the tab panel container.
  const { scrollXProgress } = useScroll({
    container: tabPanelsRef,
  })

  // Find all the tab elements so we can use their dimensions.
  const [tabElements, setTabElements] = useState<Array<HTMLElement>>([])
  // useEffect(() => {
  //   console.log('>>', tabElements)
  //   if (tabElements.length === 0) {
  //     let tabs = tabListRef.current.querySelectorAll('[role=tab]')
  //     setTabElements(tabs)
  //   }
  // }, [tabElements])

  // biome-ignore lint/correctness/useExhaustiveDependencies: only want to read DOM on selected key change
  useEffect(() => {
    if (tabListRef.current == null) {
      return
    }

    const tabs: NodeListOf<HTMLElement> =
      tabListRef.current.querySelectorAll('[role=tab]')
    setTabElements(Array.from(tabs))
  }, [selectedKey])

  // This function determines which tab should be selected
  // based on the scroll position.
  const getIndex = useCallback(
    (x: number) => Math.max(0, Math.floor((tabElements.length ?? 0 - 1) * x)),
    [tabElements],
  )

  // console.log('list ref', tabListRef)
  // console.log('<<', tabElements)

  // This function transforms the scroll position into the X position
  // or width of the selected tab indicator.
  const transform = (x: number, property: string) => {
    if (!tabElements.length) return 0

    // Find the tab index for the scroll X position.
    const index = getIndex(x)

    // console.log(x, index, property)

    // Get the difference between this tab and the next one.
    const difference =
      index < tabElements.length - 1
        ? // @ts-ignore
          tabElements[index + 1][property] - tabElements[index][property]
        : tabElements[index].offsetWidth

    // console.log(difference, tabElements[index], tabElements[index].offsetWidth)

    // Get the percentage between tabs.
    // This is the difference between the integer index and fractional one.
    const percent = (tabElements.length - 1) * x - index

    // Linearly interpolate to calculate the position of the selection indicator.
    // @ts-expect-error
    const value = tabElements[index][property] + difference * percent

    // iOS scrolls weird when translateX is 0 for some reason. 🤷‍♂️
    return value || 0.1
  }

  const x = useTransform(scrollXProgress, (x) => transform(x, 'offsetLeft'))
  const width = useTransform(scrollXProgress, (x) =>
    transform(x, 'offsetWidth'),
  )

  // When the user scrolls, update the selected key
  // so that the correct tab panel becomes interactive.
  useMotionValueEvent(scrollXProgress, 'change', (x) => {
    if (animationRef.current || !tabElements.length) return
    setSelectedKey(tabs[getIndex(x)].id)
  })

  // When the user clicks on a tab perform an animation of
  // the scroll position to the newly selected tab panel.
  const animationRef = useRef<null | AnimationPlaybackControlsWithThen>(null)
  const onSelectionChange = (selectedKey: Key) => {
    setSelectedKey(selectedKey)

    // If the scroll position is already moving but we aren't animating
    // then the key changed as a result of a user scrolling. Ignore.
    if (scrollXProgress.getVelocity() && !animationRef.current) {
      return
    }

    const tabPanel = tabPanelsRef.current
    const index = tabs.findIndex((tab) => tab.id === selectedKey)
    animationRef.current?.stop()
    animationRef.current = animate(
      tabPanel?.scrollLeft ?? 0,
      (tabPanel?.scrollWidth ?? 0) * (index / tabs.length),
      {
        type: 'spring',
        bounce: 0.2,
        duration: 0.6,
        onUpdate: (v) => {
          if (tabPanel == null) {
            return
          }
          tabPanel.scrollLeft = v
        },
        onPlay: () => {
          if (tabPanel == null) {
            return
          }
          // Disable scroll snap while the animation is going or weird things happen.
          tabPanel.style.scrollSnapType = 'none'
        },
        onComplete: () => {
          if (tabPanel == null) {
            return
          }
          tabPanel.style.scrollSnapType = ''
          animationRef.current = null
        },
      },
    )
  }

  return (
    <Tabs
      // className="w-fit max-w-[min(100%,350px)]"
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      className={stylex.props(styles.container).className}
    >
      <div {...stylex.props(styles.tabRail)}>
        <TabList
          ref={tabListRef}
          className={stylex.props(styles.tabList).className}
          items={tabs}
        >
          {(tab) => {
            return (
              <Tab className={stylex.props(styles.tab).className}>
                {({ isSelected, isFocusVisible }) => {
                  // console.log(tab.label, isSelected)
                  return (
                    <div key={tab.label}>
                      <Text style={isSelected ? styles.tabContentSelected : {}}>
                        {tab.label}
                      </Text>
                      {/* {isFocusVisible && isSelected && (
                        // Focus ring.
                        <motion.span
                          className="absolute inset-0 z-10 rounded-full ring-2 ring-black ring-offset-2"
                          style={{ x, width }}
                        />
                      )} */}
                    </div>
                  )
                }}
              </Tab>
            )
          }}
        </TabList>
        {/* Selection indicator. */}
        <motion.span
          className={stylex.props(styles.indicator).className}
          style={{ x, width }}
        />
      </div>
      <div ref={tabPanelsRef} {...stylex.props(styles.tabPanels)}>
        <Collection items={tabs}>
          {(tab) => (
            <TabPanel
              shouldForceMount
              className={stylex.props(styles.tabPanel).className}
            >
              <h2>{tab.label} contents...</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                sit amet nisl blandit, pellentesque eros eu, scelerisque eros.
                Sed cursus urna at nunc lacinia dapibus.
              </p>
            </TabPanel>
          )}
        </Collection>
      </div>
    </Tabs>
  )
}
