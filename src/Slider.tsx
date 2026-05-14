"use client"

import React from "react"
import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack
} from "react-aria-components/Slider"
import { tv } from "tailwind-variants"
import { Label } from "./Field"
import { composeTailwindRenderProps, focusRing } from "./utils"

const trackStyles = tv({
  base: "rounded-full",
  variants: {
    orientation: {
      horizontal: "h-[6px] w-full",
      vertical: "ml-[50%] h-full w-[6px] -translate-x-[50%]"
    },
    isDisabled: {
      false:
        "bg-muted forced-colors:bg-[ButtonBorder]",
      true: "bg-muted opacity-50 forced-colors:bg-[ButtonBorder]"
    }
  }
})

const fillStyles = tv({
  base: "absolute rounded-full",
  variants: {
    orientation: {
      horizontal: "start-(--start,0) h-[6px] w-(--size)",
      vertical:
        "bottom-(--start,0) ml-[50%] h-(--size) w-[6px] -translate-x-[50%]"
    },
    isDisabled: {
      false: "bg-primary forced-colors:bg-[Highlight]",
      true: "bg-muted-foreground/40 forced-colors:bg-[GrayText]"
    }
  }
})

const thumbStyles = tv({
  extend: focusRing,
  base: "group-orientation-horizontal:mt-5 group-orientation-vertical:ml-2.5 h-4.5 w-4.5 rounded-full border border-primary bg-background",
  variants: {
    isDragging: {
      true: "bg-primary forced-colors:bg-[ButtonBorder]"
    },
    isDisabled: {
      true: "border-input forced-colors:border-[GrayText]"
    }
  }
})

export interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string
  thumbLabels?: string[]
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <AriaSlider
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "font-sans orientation-horizontal:grid orientation-vertical:flex grid-cols-[1fr_auto] flex-col items-center gap-2 orientation-horizontal:w-64 orientation-horizontal:max-w-[calc(100%-10px)]"
      )}
    >
      <Label>{label}</Label>
      <SliderOutput className="orientation-vertical:hidden text-sm text-muted-foreground">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")
        }
      </SliderOutput>
      <SliderTrack className="group orientation-horizontal:h-5 orientation-vertical:w-5 orientation-vertical:h-38 col-span-2 flex items-center">
        {({ state, ...renderProps }) => (
          <>
            <div className={trackStyles(renderProps)} />
            {state.values.length === 1 ? (
              // Single thumb, render fill from the end
              <div
                className={fillStyles(renderProps)}
                style={
                  { "--size": state.getThumbPercent(0) * 100 + "%" } as any
                }
              />
            ) : state.values.length === 2 ? (
              // Range slider, render fill between the thumbs
              <div
                className={fillStyles(renderProps)}
                style={
                  {
                    "--start": state.getThumbPercent(0) * 100 + "%",
                    "--size":
                      (state.getThumbPercent(1) - state.getThumbPercent(0)) *
                        100 +
                      "%"
                  } as any
                }
              />
            ) : null}
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                className={thumbStyles}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  )
}
