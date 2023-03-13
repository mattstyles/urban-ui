// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {useState, useEffect, useRef} from 'react'
import {ReloadIcon} from '@radix-ui/react-icons'

import {Button} from '@urban-ui/button'
import {Box} from '@urban-ui/box'
import {Flex} from '@urban-ui/flex'
import {Spacer} from '@urban-ui/spacer'
import {keyframes} from '@urban-ui/theme'

export function LoadingButton({
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
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
