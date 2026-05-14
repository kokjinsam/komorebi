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
  base: "flex min-h-24 w-[30%] items-center justify-center rounded-lg border border-1 border-input bg-background p-8 text-center font-sans text-base text-balance",
  variants: {
    isFocusVisible: {
      true: "outline outline-2 -outline-offset-1 outline-ring forced-colors:outline-[Highlight]"
    },
    isDropTarget: {
      true: "bg-accent outline outline-2 -outline-offset-1 outline-ring forced-colors:outline-[Highlight]"
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
    />
  )
}

export { Text }
