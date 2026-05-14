"use client"

import { WarningIcon } from "@phosphor-icons/react"
import React from "react"
import {
  Meter as AriaMeter,
  type MeterProps as AriaMeterProps
} from "react-aria-components/Meter"
import { Label } from "./Field"
import { composeTailwindRenderProps } from "./utils"

export interface MeterProps extends AriaMeterProps {
  label?: string
}

export function Meter({ label, ...props }: MeterProps) {
  return (
    <AriaMeter
      {...props}
      data-slot="meter"
      className={composeTailwindRenderProps(props.className, "flex flex-col gap-2 max-w-full")}
    >
      {({ percentage, valueText }) => (
        <>
          <div className="flex justify-between gap-2">
            <Label>{label}</Label>
            <span
              className={`text-sm ${percentage >= 80 ? "text-destructive" : "text-muted-foreground"}`}
            >
              {percentage >= 80 && (
                <WarningIcon
                  weight="fill"
                  aria-label="Alert"
                  className="inline-block size-4 align-text-bottom"
                />
              )}
              {" " + valueText}
            </span>
          </div>
          <div className="relative h-1.5 w-64 max-w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`absolute top-0 left-0 h-full rounded-full forced-colors:bg-[Highlight] ${getFillClass(percentage)}`}
              style={{ width: percentage + "%" }}
            />
          </div>
        </>
      )}
    </AriaMeter>
  )
}

function getFillClass(percentage: number) {
  if (percentage < 40) return "bg-muted-foreground/40"
  if (percentage < 80) return "bg-muted-foreground/70"
  return "bg-destructive"
}
