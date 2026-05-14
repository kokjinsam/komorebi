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
  base: "group box-border rounded-lg border border-foreground/10 bg-foreground px-3 py-1.5 font-sans text-xs text-background drop-shadow-lg will-change-transform",
  variants: {
    isEntering: {
      true: "animate-in fade-in placement-bottom:slide-in-from-top-0.5 placement-top:slide-in-from-bottom-0.5 placement-left:slide-in-from-right-0.5 placement-right:slide-in-from-left-0.5 duration-200 ease-out"
    },
    isExiting: {
      true: "animate-out fade-out placement-bottom:slide-out-to-top-0.5 placement-top:slide-out-to-bottom-0.5 placement-left:slide-out-to-right-0.5 placement-right:slide-out-to-left-0.5 duration-150 ease-in"
    }
  }
})

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
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
          className="group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 block fill-foreground stroke-foreground/10 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
        >
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </AriaTooltip>
  )
}
