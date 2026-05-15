"use client"

import React from "react"
import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack
} from "react-aria-components/Slider"
import { composeTailwindRenderProps } from "@/utils"
import { Label } from "../Field"

export interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string
  thumbLabels?: Array<string>
}

export function Slider<T extends number | Array<number>>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <AriaSlider
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group/slider relative flex w-full touch-none select-none items-center orientation-horizontal:grid orientation-vertical:flex grid-cols-[1fr_auto] flex-col gap-2 orientation-horizontal:w-64 orientation-horizontal:max-w-[calc(100%-10px)]"
      )}
      data-slot="slider"
    >
      <Label>{label}</Label>
      <SliderOutput className="orientation-vertical:hidden text-muted-foreground text-xs">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")
        }
      </SliderOutput>
      <SliderTrack
        className="group orientation-horizontal:h-5 orientation-vertical:w-5 orientation-vertical:h-38 col-span-2 flex items-center"
        data-slot="slider-track"
      >
        {({ state, ...renderProps }) => (
          <>
            <div
              className={[
                "h-1.5 rounded-full bg-input/90",
                renderProps.orientation === "horizontal"
                  ? "w-full"
                  : "h-full w-1.5 translate-x-0",
                renderProps.isDisabled
                  ? "opacity-50 forced-colors:bg-[ButtonBorder]"
                  : "forced-colors:bg-[ButtonBorder]"
              ].join(" ")}
            />
            {state.values.length === 1 ? (
              <div
                className={[
                  "absolute rounded-full bg-primary forced-colors:bg-[Highlight]",
                  renderProps.orientation === "horizontal"
                    ? "h-1.5 start-(--start,0) w-(--size)"
                    : "bottom-(--start,0) ml-[50%] w-1.5 h-(--size) -translate-x-[50%]",
                  renderProps.isDisabled
                    ? "bg-muted-foreground/40 forced-colors:bg-[GrayText]"
                    : ""
                ].join(" ")}
                style={
                  {
                    "--size": state.getThumbPercent(0) * 100 + "%"
                  } as React.CSSProperties
                }
              />
            ) : state.values.length === 2 ? (
              <div
                className={[
                  "absolute rounded-full bg-primary forced-colors:bg-[Highlight]",
                  renderProps.orientation === "horizontal"
                    ? "h-1.5 start-(--start,0) w-(--size)"
                    : "bottom-(--start,0) ml-[50%] w-1.5 h-(--size) -translate-x-[50%]",
                  renderProps.isDisabled
                    ? "bg-muted-foreground/40 forced-colors:bg-[GrayText]"
                    : ""
                ].join(" ")}
                style={
                  {
                    "--size":
                      (state.getThumbPercent(1) - state.getThumbPercent(0)) *
                        100 +
                      "%",
                    "--start": state.getThumbPercent(0) * 100 + "%"
                  } as React.CSSProperties
                }
              />
            ) : null}
            {state.values.map((_, i) => (
              <SliderThumb
                aria-label={thumbLabels?.[i]}
                className="group-orientation-horizontal:mt-5 group-orientation-vertical:ml-2.5 hover:ring-ring/30 focus-visible:ring-ring/30 h-4 w-6 rounded-full bg-white shadow-md ring-1 ring-black/10 transition-[color,box-shadow,background-color] outline-none not-dark:bg-clip-padding hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-4"
                data-slot="slider-thumb"
                index={i}
                key={i}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  )
}
