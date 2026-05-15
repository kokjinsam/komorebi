"use client"

import React from "react"
import {
  ColorArea as AriaColorArea,
  type ColorAreaProps as AriaColorAreaProps
} from "react-aria-components/ColorArea"
import { composeTailwindRenderProps } from "@/utils"
import { ColorThumb } from "../ColorThumb"

export type ColorAreaProps = AriaColorAreaProps

export function ColorArea(props: ColorAreaProps) {
  return (
    <AriaColorArea
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "w-full max-w-56 aspect-square rounded-3xl bg-muted forced-colors:bg-[GrayText] disabled:opacity-50"
      )}
      data-slot="color-area"
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        background: isDisabled ? undefined : defaultStyle.background
      })}
    >
      <ColorThumb />
    </AriaColorArea>
  )
}
