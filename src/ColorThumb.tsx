"use client"

import React from "react"
import {
  ColorThumb as AriaColorThumb,
  type ColorThumbProps
} from "react-aria-components/ColorThumb"
import { tv } from "tailwind-variants"

const thumbStyles = tv({
  base: "border-background top-[50%] left-[50%] box-border size-4 rounded-full border-2",
  variants: {
    isFocusVisible: {
      true: "size-6"
    },
    isDragging: {
      true: "bg-foreground forced-colors:bg-[ButtonBorder]"
    },
    isDisabled: {
      true: "border-muted bg-muted opacity-50 forced-colors:border-[GrayText] forced-colors:bg-[GrayText]"
    }
  }
})

export function ColorThumb(props: ColorThumbProps) {
  return (
    <AriaColorThumb
      {...props}
      data-slot="color-thumb"
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        backgroundColor: isDisabled ? undefined : defaultStyle.backgroundColor,
        boxShadow:
          "0 0 0 1px oklch(0 0 0 / 20%), inset 0 0 0 1px oklch(0 0 0 / 20%)"
      })}
      className={thumbStyles}
    />
  )
}
