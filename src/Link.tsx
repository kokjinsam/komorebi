"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps
} from "react-aria-components/Link"
import { tv } from "tailwind-variants"
import { focusRing } from "./utils"

interface LinkProps extends AriaLinkProps {
  variant?: "primary" | "secondary"
}

const styles = tv({
  extend: focusRing,
  base: "rounded-xs underline transition [-webkit-tap-highlight-color:transparent] disabled:cursor-default disabled:no-underline forced-colors:disabled:text-[GrayText]",
  variants: {
    variant: {
      primary:
        "text-primary underline decoration-primary/60 hover:decoration-primary",
      secondary:
        "text-foreground underline decoration-foreground/50 hover:decoration-foreground"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
})

export function Link(props: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className, variant: props.variant })
      )}
    />
  )
}
