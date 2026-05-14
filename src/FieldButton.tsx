"use client"

import React from "react"
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps
} from "react-aria-components/Button"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { tv } from "tailwind-variants"

let button = tv({
  base: "pressed:bg-foreground/10 flex cursor-default items-center justify-center rounded-sm border-0 bg-transparent p-1 text-muted-foreground transition-colors outline-none [-webkit-tap-highlight-color:transparent] hover:bg-foreground/5 disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-ring/30"
})

export function FieldButton(props: RACButtonProps) {
  return (
    <RACButton
      {...props}
      data-slot="field-button"
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, className })
      )}
    >
      {props.children}
    </RACButton>
  )
}
