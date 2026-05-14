"use client"

import React from "react"
import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps
} from "react-aria-components/Switch"
import { tv } from "tailwind-variants"
import { composeTailwindRenderProps, focusRing } from "./utils"

export interface SwitchProps extends Omit<AriaSwitchProps, "children"> {
  children: React.ReactNode
}

const track = tv({
  extend: focusRing,
  base: "box-border flex h-5 w-9 shrink-0 cursor-default items-center rounded-full border border-transparent px-px font-sans shadow-inner transition duration-200 ease-in-out",
  variants: {
    isSelected: {
      false:
        "group-pressed:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_8%)] border-input bg-muted",
      true: "group-pressed:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_8%)] bg-primary forced-colors:bg-[Highlight]!"
    },
    isDisabled: {
      true: "group-selected:bg-muted forced-colors:group-selected:bg-[GrayText]! border-input bg-muted opacity-50 forced-colors:border-[GrayText]"
    }
  }
})

const handle = tv({
  base: "h-4 w-4 transform rounded-full shadow-xs outline outline-1 -outline-offset-1 outline-transparent transition duration-200 ease-in-out",
  variants: {
    isSelected: {
      false: "translate-x-0 bg-foreground",
      true: "translate-x-[100%] bg-primary-foreground"
    },
    isDisabled: {
      true: "forced-colors:outline-[GrayText]"
    }
  },
  compoundVariants: [
    {
      isSelected: false,
      isDisabled: true,
      class: "bg-muted-foreground"
    },
    {
      isSelected: true,
      isDisabled: true,
      class: "bg-muted-foreground"
    }
  ]
})

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group relative flex gap-2 items-center text-foreground disabled:text-muted-foreground forced-colors:disabled:text-[GrayText] text-sm transition [-webkit-tap-highlight-color:transparent]"
      )}
    >
      {(renderProps) => (
        <>
          <div className={track(renderProps)}>
            <span className={handle(renderProps)} />
          </div>
          {children}
        </>
      )}
    </AriaSwitch>
  )
}
