"use client"

import React from "react"
import {
  Separator as RACSeparator,
  type SeparatorProps
} from "react-aria-components/Separator"
import { tv } from "tailwind-variants"

const styles = tv({
  base: "bg-border border-none forced-colors:bg-[ButtonBorder]",
  defaultVariants: {
    orientation: "horizontal"
  },
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full min-h-8 w-px"
    }
  }
})

export function Separator(props: SeparatorProps) {
  return (
    <RACSeparator
      {...props}
      className={styles({
        className: props.className,
        orientation: props.orientation
      })}
      data-slot="separator"
    />
  )
}
