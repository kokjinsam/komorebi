"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  ToggleButton as RACToggleButton,
  type ToggleButtonProps
} from "react-aria-components/ToggleButton"
import { tv } from "tailwind-variants"
import { focusRing } from "./utils"

let styles = tv({
  extend: focusRing,
  base: "relative box-border inline-flex h-9 cursor-default items-center justify-center gap-2 rounded-lg border border-input px-3.5 text-center font-sans text-sm transition forced-color-adjust-none [-webkit-tap-highlight-color:transparent] [&:has(>svg:only-child)]:aspect-square [&:has(>svg:only-child)]:h-8 [&:has(>svg:only-child)]:px-0",
  variants: {
    isSelected: {
      false:
        "pressed:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_16%)] bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_8%)] forced-colors:bg-[ButtonFace]! forced-colors:text-[ButtonText]!",
      true: "pressed:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_16%)] bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_8%)] forced-colors:bg-[Highlight]! forced-colors:text-[HighlightText]!"
    },
    isDisabled: {
      true: "border-transparent bg-muted text-muted-foreground forced-colors:bg-[ButtonFace]! forced-colors:text-[GrayText]!"
    }
  }
})

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className })
      )}
    />
  )
}
