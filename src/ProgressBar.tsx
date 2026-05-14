"use client"

import React from "react"
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps
} from "react-aria-components/ProgressBar"
import { Label } from "./Field"
import { composeTailwindRenderProps } from "./utils"

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: string
}

export function ProgressBar({ label, ...props }: ProgressBarProps) {
  return (
    <AriaProgressBar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-2 font-sans w-64 max-w-full"
      )}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <div className="flex justify-between gap-2">
            <Label>{label}</Label>
            <span className="text-sm text-muted-foreground">
              {valueText}
            </span>
          </div>
          <div className="relative h-2 max-w-full overflow-hidden rounded-full bg-muted outline -outline-offset-1 outline-transparent">
            <div
              className={`absolute top-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight] ${isIndeterminate ? "animate-in slide-in-from-left-80 repeat-infinite left-full duration-1000 ease-out" : "left-0"}`}
              style={{ width: (isIndeterminate ? 40 : percentage) + "%" }}
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  )
}
