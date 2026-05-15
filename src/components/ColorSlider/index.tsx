"use client"

import React from "react"
import {
  ColorSlider as AriaColorSlider,
  type ColorSliderProps as AriaColorSliderProps,
  SliderOutput,
  SliderTrack
} from "react-aria-components/ColorSlider"
import { tv } from "tailwind-variants"
import { composeTailwindRenderProps } from "@/utils"
import { ColorThumb } from "../ColorThumb"
import { Label } from "../Field"

const trackStyles = tv({
  base: "group/color-slider-track col-span-2 rounded-3xl",
  variants: {
    isDisabled: {
      true: "bg-muted opacity-50 forced-colors:bg-[GrayText]"
    },
    orientation: {
      horizontal: "h-6 w-full",
      vertical: "h-50 w-6"
    }
  }
})

interface ColorSliderProps extends AriaColorSliderProps {
  label?: string
}

export function ColorSlider({ label, ...props }: ColorSliderProps) {
  return (
    <AriaColorSlider
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "orientation-horizontal:grid orientation-vertical:flex grid-cols-[1fr_auto] flex-col items-center gap-2 orientation-horizontal:w-56"
      )}
      data-slot="color-slider"
    >
      <Label>{label}</Label>
      <SliderOutput className="orientation-vertical:hidden text-muted-foreground text-sm font-medium" />
      <SliderTrack
        className={trackStyles}
        style={({ defaultStyle, isDisabled }) => ({
          ...defaultStyle,
          background: isDisabled
            ? undefined
            : `${defaultStyle.background}, repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`
        })}
      >
        <ColorThumb />
      </SliderTrack>
    </AriaColorSlider>
  )
}
