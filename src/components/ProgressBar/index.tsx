"use client"

import React from "react"
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps
} from "react-aria-components/ProgressBar"
import { composeTailwindRenderProps } from "@/utils"
import { Label } from "../Field"

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: string
}

export function ProgressBar({ label, ...props }: ProgressBarProps) {
  return (
    <AriaProgressBar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-2 w-64 max-w-full"
      )}
      data-slot="progress-bar"
    >
      {({ isIndeterminate, percentage, valueText }) => (
        <>
          <div className="flex justify-between gap-2">
            <Label>{label}</Label>
            <span className="text-muted-foreground text-sm">{valueText}</span>
          </div>
          <div className="bg-muted relative h-1.5 max-w-full overflow-hidden rounded-full">
            <div
              className={`bg-primary absolute top-0 h-full rounded-full forced-colors:bg-[Highlight] ${isIndeterminate ? "animate-in slide-in-from-left-80 repeat-infinite left-full duration-1000 ease-out" : "left-0"}`}
              style={{ width: (isIndeterminate ? 40 : percentage) + "%" }}
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  )
}
