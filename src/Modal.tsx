"use client"

import React from "react"
import {
  ModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal
} from "react-aria-components/Modal"
import { tv } from "tailwind-variants"

const overlayStyles = tv({
  base: "absolute top-0 left-0 isolate z-20 h-(--page-height) w-full bg-foreground/50 text-center backdrop-blur-lg",
  variants: {
    isEntering: {
      true: "animate-in fade-in duration-200 ease-out"
    },
    isExiting: {
      true: "animate-out fade-out duration-200 ease-in"
    }
  }
})

const modalStyles = tv({
  base: "max-h-[calc(var(--visual-viewport-height)*.9)] w-full max-w-[min(90vw,450px)] rounded-2xl border border-foreground/10 bg-popover bg-clip-padding text-left align-middle font-sans text-popover-foreground shadow-2xl dark:bg-popover/70 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas]",
  variants: {
    isEntering: {
      true: "animate-in zoom-in-105 duration-200 ease-out"
    },
    isExiting: {
      true: "animate-out zoom-out-95 duration-200 ease-in"
    }
  }
})

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay {...props} className={overlayStyles}>
      <div className="sticky top-0 left-0 box-border flex h-(--visual-viewport-height) w-full items-center justify-center">
        <RACModal {...props} className={modalStyles} />
      </div>
    </ModalOverlay>
  )
}
