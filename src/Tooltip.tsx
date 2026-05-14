"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  OverlayArrow
} from "react-aria-components/Tooltip"
import { tv } from "tailwind-variants"

export interface TooltipProps extends Omit<AriaTooltipProps, "children"> {
  children: React.ReactNode
}

const styles = tv({
  base: "group/tooltip bg-foreground text-background ring-foreground/10 box-border rounded-md px-2.5 py-1 text-xs shadow-md ring-1 will-change-transform",
  variants: {
    isEntering: {
      true: "animate-in fade-in placement-bottom:slide-in-from-top-0.5 placement-top:slide-in-from-bottom-0.5 placement-left:slide-in-from-right-0.5 placement-right:slide-in-from-left-0.5 duration-100 ease-out"
    },
    isExiting: {
      true: "animate-out fade-out placement-bottom:slide-out-to-top-0.5 placement-top:slide-out-to-bottom-0.5 placement-left:slide-out-to-right-0.5 placement-right:slide-out-to-left-0.5 duration-75 ease-in"
    }
  }
})

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      data-slot="tooltip"
      offset={10}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className })
      )}
    >
      <OverlayArrow>
        <svg
          width={8}
          height={8}
          viewBox="0 0 8 8"
          className="group/tooltip-placement-bottom:rotate-180 group/tooltip-placement-left:-rotate-90 group/tooltip-placement-right:rotate-90 fill-foreground block forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
        >
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </AriaTooltip>
  )
}
