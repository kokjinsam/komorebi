"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps
} from "react-aria-components/Link"
import { tv } from "tailwind-variants"

interface LinkProps extends AriaLinkProps {
  variant?: "primary" | "secondary"
}

const styles = tv({
  base: "group/link focus-visible:border-ring focus-visible:ring-ring/30 rounded-md underline-offset-4 transition outline-none focus-visible:ring-3 disabled:cursor-default disabled:opacity-50 forced-colors:outline-[Highlight]",
  variants: {
    variant: {
      primary: "text-primary hover:underline",
      secondary: "text-foreground hover:underline"
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
      data-slot="link"
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className, variant: props.variant })
      )}
    />
  )
}
