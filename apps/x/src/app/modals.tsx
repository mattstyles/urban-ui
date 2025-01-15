'use client'

import Link from 'next/link'
import { useOverlayTriggerState } from 'react-stately'
import { Button } from './components/button'
import { Modal } from './components/modal'

export function ModalContainer() {
  const state = useOverlayTriggerState({})

  return (
    <div>
      <Button onPress={state.open}>Layout: Click me</Button>
      <Modal state={state}>
        <h1>Hello modal</h1>
        <Button onPress={state.close}>close</Button>
        <Link href={'/flex'} onMouseDown={state.close}>
          Navigate and close
          {/* <div onMouseDown={() => setTimeout(state.close, 10)}>
            Navigate and close
          </div> */}
        </Link>
        <Link href={'/flex'} style={{ margin: 20 }}>
          Navigate only to Flex
        </Link>
        <Link href={'/spacer'} style={{ margin: 20 }}>
          Navigate only to Spacer
        </Link>
      </Modal>
    </div>
  )
}
