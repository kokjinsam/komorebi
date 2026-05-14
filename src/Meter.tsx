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
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-2 font-sans max-w-full"
      )}
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
                  className="inline-block h-4 w-4 align-text-bottom"
                />
              )}
              {" " + valueText}
            </span>
          </div>
          <div className="relative h-2 w-64 max-w-full rounded-full bg-muted outline -outline-offset-1 outline-transparent">
            <div
              className={`absolute top-0 left-0 h-full rounded-full ${getColor(percentage)} forced-colors:bg-[Highlight]`}
              style={{ width: percentage + "%" }}
            />
          </div>
        </>
      )}
    </AriaMeter>
  )
}

function getColor(percentage: number) {
  if (percentage < 40) {
    return "bg-chart-1"
  }

  if (percentage < 80) {
    return "bg-chart-3"
  }

  return "bg-destructive"
}
