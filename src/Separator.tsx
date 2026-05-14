"use client"

import React from "react"
import {
  Separator as RACSeparator,
  type SeparatorProps
} from "react-aria-components/Separator"
import { tv } from "tailwind-variants"

const styles = tv({
  base: "border-none bg-neutral-300 dark:bg-neutral-600 forced-colors:bg-[ButtonBorder]",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full min-h-8 w-px"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
})

export function Separator(props: SeparatorProps) {
  return (
    <RACSeparator
      {...props}
      className={styles({
        orientation: props.orientation,
        className: props.className
      })}
    />
  )
}
