import {useState, useRef, useEffect} from 'react'
import type {VariantProps} from '@stitches/react'
import {StitchesLogoIcon, ReloadIcon, UpdateIcon} from '@radix-ui/react-icons'
import {motion, AnimatePresence} from 'framer-motion'

import {WorkButton} from '@urban-ui/button-extras'
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
          <WorkButtonExample />
          <LoadingSwapButton>Transition</LoadingSwapButton>
        </Stack>
      </Content>
    </Container>
  )
}

ButtonPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function WorkButtonExample() {
  const [isWorking, setIsWorking] = useState(false)
  return (
    <WorkButton
      round
      icon={
        <Box
          css={{
            size: 15,
          }}>
          <ReloadIcon width='100%' height='100%' />
        </Box>
      }
      isWorking={isWorking}
      onClick={() => setIsWorking(!isWorking)}>
      Working
    </WorkButton>
  )
}

function LoadingButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
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

function LoadingSwapButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
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
