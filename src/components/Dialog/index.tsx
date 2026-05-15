"use client"

import React from "react"
import {
  type DialogProps,
  Dialog as RACDialog,
  Heading
} from "react-aria-components/Dialog"
import { twMerge } from "tailwind-merge"

export function Dialog(props: DialogProps) {
  return (
    <RACDialog
      {...props}
      data-slot="dialog"
      className={twMerge(
        "outline-0 max-h-[inherit] overflow-auto relative",
        props.className
      )}
    />
  )
}

export { Heading }
