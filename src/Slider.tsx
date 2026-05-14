"use client"

import React from "react"
import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack
} from "react-aria-components/Slider"
import { Label } from "./Field"
import { composeTailwindRenderProps } from "./utils"

export interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string
  thumbLabels?: string[]
}

export function Slider<T extends number | number[]>({ label, thumbLabels, ...props }: SliderProps<T>) {
  return (
    <AriaSlider
      {...props}
      data-slot="slider"
      className={composeTailwindRenderProps(
        props.className,
        "group/slider relative flex w-full touch-none select-none items-center orientation-horizontal:grid orientation-vertical:flex grid-cols-[1fr_auto] flex-col gap-2 orientation-horizontal:w-64 orientation-horizontal:max-w-[calc(100%-10px)]"
      )}
    >
      <Label>{label}</Label>
      <SliderOutput className="orientation-vertical:hidden text-xs text-muted-foreground">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")
        }
      </SliderOutput>
      <SliderTrack
        data-slot="slider-track"
        className="group orientation-horizontal:h-5 orientation-vertical:w-5 orientation-vertical:h-38 col-span-2 flex items-center"
      >
        {({ state, ...renderProps }) => (
          <>
            <div
              className={[
                "h-1.5 rounded-full bg-muted",
                renderProps.orientation === "horizontal" ? "w-full" : "h-full w-1.5 translate-x-0",
                renderProps.isDisabled ? "opacity-50 forced-colors:bg-[ButtonBorder]" : "forced-colors:bg-[ButtonBorder]"
              ].join(" ")}
            />
            {state.values.length === 1 ? (
              <div
                className={[
                  "absolute rounded-full bg-primary forced-colors:bg-[Highlight]",
                  renderProps.orientation === "horizontal" ? "h-1.5 start-(--start,0) w-(--size)" : "bottom-(--start,0) ml-[50%] w-1.5 h-(--size) -translate-x-[50%]",
                  renderProps.isDisabled ? "bg-muted-foreground/40 forced-colors:bg-[GrayText]" : ""
                ].join(" ")}
                style={{ "--size": state.getThumbPercent(0) * 100 + "%" } as any}
              />
            ) : state.values.length === 2 ? (
              <div
                className={[
                  "absolute rounded-full bg-primary forced-colors:bg-[Highlight]",
                  renderProps.orientation === "horizontal" ? "h-1.5 start-(--start,0) w-(--size)" : "bottom-(--start,0) ml-[50%] w-1.5 h-(--size) -translate-x-[50%]",
                  renderProps.isDisabled ? "bg-muted-foreground/40 forced-colors:bg-[GrayText]" : ""
                ].join(" ")}
                style={{
                  "--start": state.getThumbPercent(0) * 100 + "%",
                  "--size": (state.getThumbPercent(1) - state.getThumbPercent(0)) * 100 + "%"
                } as any}
              />
            ) : null}
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                data-slot="slider-thumb"
                className="group-orientation-horizontal:mt-5 group-orientation-vertical:ml-2.5 size-4 rounded-full border-2 border-input bg-background shadow-sm transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50"
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  )
}
