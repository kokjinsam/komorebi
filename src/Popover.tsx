"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  OverlayArrow,
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps
} from "react-aria-components/Popover"
import { tv } from "tailwind-variants"

export interface PopoverProps extends Omit<AriaPopoverProps, "children"> {
  showArrow?: boolean
  children: React.ReactNode
}

const styles = tv({
  base: "group/popover bg-popover text-popover-foreground ring-foreground/5 dark:ring-foreground/10 rounded-3xl shadow-md ring-1 outline-0 forced-colors:bg-[Canvas]",
  variants: {
    isEntering: {
      true: "animate-in fade-in-0 zoom-in-95 placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 duration-100 ease-out"
    },
    isExiting: {
      true: "animate-out fade-out-0 zoom-out-95 placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 duration-75 ease-in"
    }
  }
})

export function Popover({
  children,
  showArrow,
  className,
  ...props
}: PopoverProps) {
  let offset = showArrow ? 12 : 8
  return (
    <AriaPopover
      offset={offset}
      {...props}
      data-slot="popover"
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, className })
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 fill-popover stroke-foreground/5 block stroke-1 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaPopover>
  )
}
