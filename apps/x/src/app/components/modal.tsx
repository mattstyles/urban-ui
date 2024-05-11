'use client'

import type { AriaModalOverlayProps } from '@react-aria/overlays'
import { Overlay, useModalOverlay } from '@react-aria/overlays'
import stylex from '@stylexjs/stylex'
import React, { useState } from 'react'
import type { OverlayTriggerState } from 'react-stately'
import { CSSTransition } from 'react-transition-group'

const styles = stylex.create({
  modalEnter: {
    opacity: 0,
  },
  modalEnterDone: {
    opacity: 1,
    transition: 'all 250ms ease-in',
  },
  modalExit: {
    opacity: 0,
    transition: 'all 250ms ease-out',
  },
  dialogEnter: {
    transform: 'translateY(20px)',
  },
  dialogEnterDone: {
    transform: 'translateY(0px)',
    transition: 'all 250ms ease-in',
  },
  dialogExit: {
    transform: 'translateY(20px)',
    transition: 'all 250ms ease-out',
  },
  dialog: {
    width: 640,
    height: 480,
    borderRadius: 6,
    background: 'white',
    color: 'black',
    top: 20,
  },
  modalContainer: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(44, 44, 44, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
})

interface ModalProps extends AriaModalOverlayProps {
  children: React.ReactNode
  state: OverlayTriggerState
}

export function Modal(props: ModalProps) {
  const { children, state } = props

  const ref = React.useRef(null)
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref)
  const [exited, setExited] = useState(!state.isOpen)

  // Don't render anything if the modal is not open and we're not animating out.
  if (!(state.isOpen || !exited)) {
    return null
  }

  return (
    // Animate opacity and backdrop blur of underlay
    <Overlay>
      <CSSTransition
        in={state.isOpen}
        appear
        onEntered={() => setExited(false)}
        onExited={() => setExited(true)}
        timeout={{ enter: 0, exit: 250 }}
        classNames={{
          // enter: 'opacity-0',
          // enterDone: 'opacity-1 backdrop-blur-md transition ease-in',
          // exit: 'opacity-0 backdrop-blur-none transition ease-out',
          enter: stylex.attrs(styles.modalEnter).class,
          enterDone: stylex.attrs(styles.modalEnterDone).class,
          exit: stylex.attrs(styles.modalExit).class,
        }}
      >
        <div
          // className="fixed inset-0 flex justify-center z-100 bg-slate-400/20"

          {...underlayProps}
          {...stylex.props(styles.modalContainer)}
        >
          {/* Animate modal slightly upward when entering, and downward when exiting. */}
          <CSSTransition
            in={state.isOpen}
            appear
            nodeRef={ref}
            timeout={{ enter: 0, exit: 250 }}
            classNames={{
              // appear: 'translate-y-2',
              // appearDone: 'translate-y-0 transition ease-in',
              // exit: 'translate-y-2 transition ease-out',
              appear: stylex.attrs(styles.dialogEnter).class,
              appearDone: stylex.attrs(styles.dialogEnterDone).class,
              exit: stylex.attrs(styles.dialogExit).class,
            }}
          >
            <div
              {...modalProps}
              ref={ref}
              // className="p-8 max-w-sm bg-white/90 border border-gray-300 shadow-2xl rounded-lg z-1 top-[10%] h-fit max-h-[80vh] relative focus:outline-none"
              className={stylex(styles.dialog)}
            >
              {children}
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </Overlay>
  )
}
