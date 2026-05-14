"use client"

import React from "react"
import {
  ColorThumb as AriaColorThumb,
  type ColorThumbProps
} from "react-aria-components/ColorThumb"
import { tv } from "tailwind-variants"

const thumbStyles = tv({
  base: "top-[50%] left-[50%] box-border h-4.5 w-4.5 rounded-full border-2 border-background",
  variants: {
    isFocusVisible: {
      true: "h-8 w-8"
    },
    isDragging: {
      true: "bg-foreground forced-colors:bg-[ButtonBorder]"
    },
    isDisabled: {
      true: "border-muted bg-muted forced-colors:border-[GrayText] forced-colors:bg-[GrayText]"
    }
  }
})

export function ColorThumb(props: ColorThumbProps) {
  return (
    <AriaColorThumb
      {...props}
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        backgroundColor: isDisabled ? undefined : defaultStyle.backgroundColor,
        boxShadow: "0 0 0 1px black, inset 0 0 0 1px black"
      })}
      className={thumbStyles}
    />
  )
}
