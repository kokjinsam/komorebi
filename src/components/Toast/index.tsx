"use client"

import { XIcon } from "@phosphor-icons/react"
import React, { type CSSProperties } from "react"
import {
  UNSTABLE_ToastRegion as ToastRegion,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastContent as ToastContent,
  type ToastProps,
  Button,
  Text
} from "react-aria-components/Toast"
import { flushSync } from "react-dom"
import { composeTailwindRenderProps } from "@/utils"
import "@/styles/Toast.css"

interface MyToastContent {
  description?: string
  title: string
}

export const queue = new ToastQueue<MyToastContent>({
  wrapUpdate(fn) {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        flushSync(fn)
      })
    } else {
      fn()
    }
  }
})

export function MyToastRegion() {
  return (
    <ToastRegion
      className="focus-visible:ring-ring/30 fixed right-4 bottom-4 flex flex-col-reverse gap-2 outline-none focus-visible:ring-3"
      queue={queue}
    >
      {({ toast }) => (
        <MyToast toast={toast}>
          <ToastContent className="flex min-w-0 flex-1 flex-col">
            <Text
              className="text-primary-foreground text-sm font-semibold"
              slot="title"
            >
              {toast.content.title}
            </Text>
            {toast.content.description && (
              <Text
                className="text-primary-foreground/80 text-xs"
                slot="description"
              >
                {toast.content.description}
              </Text>
            )}
          </ToastContent>
          <Button
            aria-label="Close"
            className="pressed:bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 focus-visible:border-primary-foreground focus-visible:ring-primary-foreground/30 flex size-7 shrink-0 cursor-default items-center justify-center rounded-2xl border-none bg-transparent p-0 transition-colors outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-3"
            slot="close"
          >
            <XIcon className="size-4" />
          </Button>
        </MyToast>
      )}
    </ToastRegion>
  )
}

export function MyToast(props: ToastProps<MyToastContent>) {
  return (
    <Toast
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex items-center gap-4 rounded-3xl bg-primary bg-clip-padding px-4 py-3 shadow-lg ring-1 ring-foreground/10 outline-none forced-colors:outline [view-transition-class:toast] w-57.5"
      )}
      data-slot="toast"
      style={{ viewTransitionName: props.toast.key } as CSSProperties}
    />
  )
}
