"use client"

import React from "react"
import {
  ModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal
} from "react-aria-components/Modal"
import { tv } from "tailwind-variants"

const overlayStyles = tv({
  base: "fixed inset-0 z-50 bg-foreground/30 supports-[backdrop-filter]:backdrop-blur-sm",
  variants: {
    isEntering: {
      true: "animate-in fade-in duration-100 ease-out"
    },
    isExiting: {
      true: "animate-out fade-out duration-100 ease-in"
    }
  }
})

const modalStyles = tv({
  base: "max-h-[calc(var(--visual-viewport-height)*.9)] w-full max-w-[min(90vw,450px)] rounded-4xl bg-popover p-6 text-left align-middle text-popover-foreground shadow-xl ring-1 ring-foreground/5 dark:ring-foreground/10 forced-colors:bg-[Canvas]",
  variants: {
    isEntering: {
      true: "animate-in zoom-in-95 fade-in-0 duration-100 ease-out"
    },
    isExiting: {
      true: "animate-out zoom-out-95 fade-out-0 duration-100 ease-in"
    }
  }
})

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay {...props} className={overlayStyles}>
      <div className="fixed top-0 left-0 flex h-(--visual-viewport-height) w-screen items-center justify-center text-center">
        <RACModal {...props} data-slot="modal" className={modalStyles} />
      </div>
    </ModalOverlay>
  )
}
