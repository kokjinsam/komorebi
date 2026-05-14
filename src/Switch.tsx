"use client"

import React from "react"
import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps
} from "react-aria-components/Switch"
import { composeTailwindRenderProps } from "./utils"

export interface SwitchProps extends Omit<AriaSwitchProps, "children"> {
  children: React.ReactNode
}

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      data-slot="switch"
      className={composeTailwindRenderProps(
        props.className,
        "group/switch relative flex gap-2 items-center text-foreground text-sm transition disabled:pointer-events-none disabled:opacity-50 forced-colors:disabled:text-[GrayText] [-webkit-tap-highlight-color:transparent]"
      )}
    >
      {(renderProps) => (
        <>
          <span
            className={[
              "peer flex h-5 w-9 shrink-0 cursor-default items-center rounded-full border border-transparent bg-clip-padding px-px transition-colors",
              renderProps.isSelected
                ? "bg-primary forced-colors:bg-[Highlight]!"
                : "bg-input forced-colors:bg-[ButtonBorder]",
              renderProps.isFocusVisible
                ? "border-ring ring-3 ring-ring/30"
                : "",
              "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
            ].join(" ")}
          >
            <span
              className={[
                "pointer-events-none block size-4 rounded-full shadow-sm transition-transform",
                renderProps.isSelected
                  ? "translate-x-4 bg-primary-foreground forced-colors:bg-[HighlightText]"
                  : "translate-x-0 bg-foreground forced-colors:bg-[ButtonText]"
              ].join(" ")}
            />
          </span>
          {children}
        </>
      )}
    </AriaSwitch>
  )
}
