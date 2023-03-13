import {useState, useRef, useEffect} from 'react'
import type {VariantProps} from '@stitches/react'
import {StitchesLogoIcon, ReloadIcon, UpdateIcon} from '@radix-ui/react-icons'
import {motion, AnimatePresence} from 'framer-motion'

import {Flex} from '@urban-ui/flex'
import {Center} from '@urban-ui/center'
import {Spacer} from '@urban-ui/spacer'
import {Container} from '@urban-ui/container'
import {Stack} from '@urban-ui/stack'
import {Content} from '@urban-ui/content'
import {H2, P, Text} from '@urban-ui/text'
import {Button} from '@urban-ui/button'
import {Box} from '@urban-ui/box'
import {keyframes} from '@urban-ui/theme'
import {Layout} from './layout'

export default function ButtonPage() {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Loading buttons</H2>
        <Stack orientation='h'>
          <LoadingButton>Loading</LoadingButton>
          <AnimatedLoadingButton>Animated</AnimatedLoadingButton>
          <LoadingSwapButton>Transition</LoadingSwapButton>
        </Stack>
      </Content>
    </Container>
  )
}

ButtonPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function LoadingButton({children, ...props}: VariantProps<typeof Button>) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button width='md' {...props} onClick={() => setIsLoading(!isLoading)}>
      {isLoading && (
        <>
          <Box
            css={{
              size: 15,
              animation: ` ${spin} $tokens$transitionDuration-xl infinite linear`,
            }}>
            <UpdateIcon />
          </Box>
          <Spacer orientation='h' size='sm' />
        </>
      )}
      {children}
    </Button>
  )
}

function AnimatedLoadingButton({
  children,
  ...props
}: VariantProps<typeof Button>) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button {...props} onClick={() => setIsLoading(!isLoading)}>
      <AnimatedContainer>
        {isLoading && (
          <>
            <Box
              css={{
                size: 15,
              }}>
              <Box
                css={{
                  opacity: 0,
                  animation: `${appear} $tokens$transitionDuration-md ease-in forwards $tokens$transitionDuration-md, ${spin} 500ms infinite linear`,
                }}>
                <ReloadIcon width='100%' height='100%' />
              </Box>
            </Box>
            <Spacer orientation='h' size='sm' />
          </>
        )}
        {children}
      </AnimatedContainer>
    </Button>
  )
}

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})
const appear = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

function AnimatedContainer({children}: {children: React.ReactNode}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState({width: 0, height: 0})
  const [transition, setTransition] = useState('0ms')

  useEffect(() => {
    if (contentRef.current == null) {
      return
    }
    const size = contentRef.current.getBoundingClientRect()
    setRect(size)

    // Necessary to stop the element transitioning from 0 size to its rendered size
    const timeout = setTimeout(() => {
      setTransition('$tokens$transitionDuration-md')
    }, 10)
    return () => {
      clearTimeout(timeout)
    }
  }, [children])

  return (
    <Flex
      justify='end'
      css={{
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        transitionDuration: transition,
        overflow: 'hidden',
      }}>
      <Flex
        ref={contentRef}
        alignment='center'
        css={{width: 'fit-content', height: 'fit-content'}}>
        {children}
      </Flex>
    </Flex>
  )
}

const variants = {
  enter: (isLoading: boolean) => {
    return {
      opacity: 0,
      y: isLoading ? 50 : -50,
    }
  },
  animate: {
    opacity: 1,
    y: 1,
  },
  exit: (isLoading: boolean) => {
    return {
      opacity: 0,
      y: isLoading ? 20 : -20,
    }
  },
}

function LoadingSwapButton({children, ...props}: VariantProps<typeof Button>) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button width='md' {...props} onClick={() => setIsLoading(!isLoading)}>
      <AnimatePresence initial={false} mode='wait'>
        <Flex orientation='h'>
          {isLoading ? (
            <motion.div
              key='isLoading'
              custom={isLoading}
              initial='enter'
              animate='animate'
              exit={{opacity: 0}}
              variants={variants}
              transition={{
                y: {type: 'spring', stiffness: 300, damping: 30},
                opacity: {duration: 0.3},
              }}>
              <Center key='loading'>
                <Box
                  css={{
                    size: 15,
                    animation: ` ${spin} $tokens$transitionDuration-xl infinite linear`,
                  }}>
                  <ReloadIcon />
                </Box>
              </Center>
            </motion.div>
          ) : (
            <motion.div
              key='content'
              initial='enter'
              animate='animate'
              exit='exit'
              variants={variants}
              transition={{
                y: {type: 'spring', stiffness: 300, damping: 30},
                opacity: {duration: 0.3},
              }}>
              {children}
            </motion.div>
          )}
        </Flex>
      </AnimatePresence>
    </Button>
  )
}
