"use client"

import React from "react"
import {
  ColorArea as AriaColorArea,
  type ColorAreaProps as AriaColorAreaProps
} from "react-aria-components/ColorArea"
import { ColorThumb } from "./ColorThumb"
import { composeTailwindRenderProps } from "./utils"

export interface ColorAreaProps extends AriaColorAreaProps {}

export function ColorArea(props: ColorAreaProps) {
  return (
    <AriaColorArea
      {...props}
      data-slot="color-area"
      className={composeTailwindRenderProps(
        props.className,
        "w-full max-w-56 aspect-square rounded-3xl bg-muted forced-colors:bg-[GrayText] disabled:opacity-50"
      )}
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        background: isDisabled ? undefined : defaultStyle.background
      })}
    >
      <ColorThumb />
    </AriaColorArea>
  )
}
