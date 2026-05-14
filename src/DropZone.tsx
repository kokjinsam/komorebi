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
  base: "group/drop-zone flex min-h-24 w-[30%] items-center justify-center rounded-3xl border-2 border-dashed border-input bg-background p-6 text-center text-sm text-balance transition-colors outline-none",
  variants: {
    isFocusVisible: {
      true: "border-ring ring-3 ring-ring/30 forced-colors:outline-[Highlight]"
    },
    isDropTarget: {
      true: "border-ring bg-accent ring-3 ring-ring/30 forced-colors:outline-[Highlight]"
    }
  }
})

export function DropZone(props: DropZoneProps) {
  return (
    <RACDropZone
      {...props}
      data-slot="drop-zone"
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropZone({ ...renderProps, className })
      )}
    />
  )
}

export { Text }
