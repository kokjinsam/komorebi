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
  base: "pressed:bg-foreground/10 relative flex inline-flex cursor-default items-center justify-center rounded-md border-0 bg-transparent p-1 text-center font-sans text-sm text-muted-foreground transition [-webkit-tap-highlight-color:transparent] hover:bg-foreground/5 disabled:bg-transparent",
  variants: {
    isDisabled: {
      true: "bg-muted text-muted-foreground forced-colors:text-[GrayText]"
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
