"use client"

import React from "react"
import {
  ColorSwatch as AriaColorSwatch,
  type ColorSwatchProps
} from "react-aria-components/ColorSwatch"
import { composeTailwindRenderProps } from "./utils"

export function ColorSwatch(props: ColorSwatchProps) {
  return (
    <AriaColorSwatch
      {...props}
      data-slot="color-swatch"
      className={composeTailwindRenderProps(
        props.className,
        "size-8 box-border rounded-3xl border border-foreground/10"
      )}
      style={({ color }) => ({
        background: `linear-gradient(${color}, ${color}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`
      })}
    />
  )
}
