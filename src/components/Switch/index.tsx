"use client"

import React from "react"
import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps
} from "react-aria-components/Switch"
import { composeTailwindRenderProps } from "@/utils"

export interface SwitchProps extends Omit<AriaSwitchProps, "children"> {
  children: React.ReactNode
}

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group/switch relative flex gap-2 items-center text-foreground text-sm transition disabled:pointer-events-none disabled:opacity-50 forced-colors:disabled:text-[GrayText] [-webkit-tap-highlight-color:transparent]"
      )}
      data-slot="switch"
    >
      {(renderProps) => (
        <>
          <span
            className={[
              "peer flex h-5 w-11 shrink-0 cursor-default items-center rounded-full border-2 bg-clip-padding transition-colors",
              renderProps.isSelected
                ? "border-primary bg-primary forced-colors:bg-[Highlight]!"
                : "border-input/90 bg-input/90 forced-colors:bg-[ButtonBorder]",
              renderProps.isFocusVisible
                ? "border-ring ring-3 ring-ring/30"
                : ""
            ].join(" ")}
          >
            <span
              className={[
                "pointer-events-none block h-4 w-6 rounded-full shadow-sm transition-transform not-dark:bg-clip-padding",
                "bg-background dark:bg-primary-foreground",
                renderProps.isSelected
                  ? "translate-x-[calc(100%-8px)] forced-colors:bg-[HighlightText]"
                  : "translate-x-0 forced-colors:bg-[ButtonText]"
              ].join(" ")}
            />
          </span>
          {children}
        </>
      )}
    </AriaSwitch>
  )
}
