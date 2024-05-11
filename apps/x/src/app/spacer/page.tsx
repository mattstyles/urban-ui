'use client'

import stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Spacer } from '@urban-ui/spacer'
import { spacing } from '@urban-ui/theme/spacing.stylex'

import Link from 'next/link'
import { useOverlayTriggerState } from 'react-stately'
import { Button } from './button'
import { Modal } from './modal'

const styles = stylex.create({
  block: {
    backgroundColor: 'hotpink',
    width: spacing.xl,
    height: spacing.xl,
  },
})

function Block() {
  return <div {...stylex.props(styles.block)} />
}

export default function SpacerPage() {
  const state = useOverlayTriggerState({})
  return (
    <>
      <h1>Spacer</h1>
      <p>Orientation: h</p>
      <Flex orientation="h">
        <Block />
        <Spacer />
        <Block />
        <Spacer />
        <Block />
        <Spacer />
      </Flex>
      <p>Orientation: v</p>
      <Flex orientation="v">
        <Block />
        <Spacer orientation="v" />
        <Block />
        <Spacer orientation="v" />
        <Block />
        <Spacer orientation="v" />
      </Flex>
      <Button onPress={state.open}>Click me</Button>
      <Modal state={state}>
        <h1>Hello modal</h1>
        <Button onPress={state.close}>close</Button>
        <Link href={'/flex'}>To Flex link</Link>
      </Modal>
    </>
  )
}
