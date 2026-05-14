"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  ToggleButton as RACToggleButton,
  type ToggleButtonProps
} from "react-aria-components/ToggleButton"
import { tv } from "tailwind-variants"

const styles = tv({
  base: "group/toggle-button relative inline-flex cursor-default items-center justify-center gap-1.5 rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 pressed:translate-y-px forced-color-adjust-none [-webkit-tap-highlight-color:transparent] [&_svg:not([class*='size-'])]:size-4 h-9 px-3",
  variants: {
    isSelected: {
      false:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 pressed:bg-secondary/70 forced-colors:bg-[ButtonFace]! forced-colors:text-[ButtonText]!",
      true: "bg-primary text-primary-foreground hover:bg-primary/80 pressed:bg-primary/70 forced-colors:bg-[Highlight]! forced-colors:text-[HighlightText]!"
    }
  }
})

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <RACToggleButton
      {...props}
      data-slot="toggle-button"
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className })
      )}
    />
  )
}
