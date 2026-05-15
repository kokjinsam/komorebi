"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  type DropZoneProps,
  DropZone as RACDropZone,
  Text
} from "react-aria-components/DropZone"
import { tv } from "tailwind-variants"

const dropZone = tv({
  base: "group/drop-zone border-input bg-background flex min-h-24 w-[30%] items-center justify-center rounded-3xl border-2 border-dashed p-6 text-center text-sm text-balance transition-colors outline-none",
  variants: {
    isDropTarget: {
      true: "border-ring bg-accent ring-ring/30 ring-3 forced-colors:outline-[Highlight]"
    },
    isFocusVisible: {
      true: "border-ring ring-ring/30 ring-3 forced-colors:outline-[Highlight]"
    }
  }
})

export function DropZone(props: DropZoneProps) {
  return (
    <RACDropZone
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropZone({ ...renderProps, className })
      )}
      data-slot="drop-zone"
    />
  )
}

export { Text }
