"use client"

import React from "react"
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps
} from "react-aria-components/Button"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { tv } from "tailwind-variants"
import { focusRing } from "./utils"

export interface ButtonProps extends RACButtonProps {
  /** @default 'primary' */
  variant?: "primary" | "secondary" | "destructive" | "icon"
}

let button = tv({
  extend: focusRing,
  base: "pressed:bg-black/10 dark:pressed:bg-white/20 relative flex inline-flex cursor-default items-center justify-center rounded-md border-0 bg-transparent p-1 text-center font-sans text-sm text-neutral-600 transition [-webkit-tap-highlight-color:transparent] hover:bg-black/[5%] disabled:bg-transparent dark:text-neutral-400 dark:hover:bg-white/10",
  variants: {
    isDisabled: {
      true: "border-black/5 bg-neutral-100 text-neutral-300 dark:border-white/5 dark:bg-neutral-800 dark:text-neutral-600 forced-colors:text-[GrayText]"
    }
  }
})

export function FieldButton(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, className })
      )}
    >
      {props.children}
    </RACButton>
  )
}
