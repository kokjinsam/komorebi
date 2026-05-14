"use client"

import React from "react"
import {
  ModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal
} from "react-aria-components/Modal"
import { tv } from "tailwind-variants"

const overlayStyles = tv({
  base: "bg-foreground/30 fixed inset-0 z-50 supports-[backdrop-filter]:backdrop-blur-sm",
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
  base: "bg-popover text-popover-foreground ring-foreground/5 dark:ring-foreground/10 max-h-[calc(var(--visual-viewport-height)*.9)] w-full max-w-[min(90vw,450px)] rounded-4xl text-left align-middle shadow-xl ring-1 forced-colors:bg-[Canvas]",
  variants: {
    isEntering: {
      true: "animate-in zoom-in-95 fade-in-0 duration-100 ease-out"
    },
    isExiting: {
      true: "animate-out zoom-out-95 fade-out-0 duration-100 ease-in"
    },
    position: {
      center: "p-6",
      top: ""
    }
  },
  defaultVariants: {
    position: "center" as const
  }
})

export interface ModalProps extends ModalOverlayProps {
  position?: "center" | "top"
}

export function Modal({ position = "center", ...props }: ModalProps) {
  return (
    <ModalOverlay {...props} className={overlayStyles}>
      <div
        className={[
          "fixed top-0 left-0 flex h-(--visual-viewport-height) w-screen text-center",
          position === "top"
            ? "items-start justify-center pt-[33vh]"
            : "items-center justify-center"
        ].join(" ")}
      >
        <RACModal
          {...props}
          data-slot="modal"
          className={(renderProps) => modalStyles({ ...renderProps, position })}
        />
      </div>
    </ModalOverlay>
  )
}
