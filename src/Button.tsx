"use client"

import React from "react"
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps
} from "react-aria-components/Button"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { tv } from "tailwind-variants"
import { focusRing } from "./utils"

export interface ButtonProps extends RACButtonProps {
  /** @default 'primary' */
  variant?: "primary" | "secondary" | "destructive" | "quiet"
}

let button = tv({
  extend: focusRing,
  base: "relative box-border inline-flex h-9 cursor-default items-center justify-center gap-2 rounded-lg border border-transparent px-3.5 py-0 text-center font-sans text-sm transition [-webkit-tap-highlight-color:transparent] dark:border-foreground/10 [&:has(>svg:only-child)]:h-8 [&:has(>svg:only-child)]:w-8 [&:has(>svg:only-child)]:px-0",
  variants: {
    variant: {
      primary:
        "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_8%)] pressed:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_16%)]",
      secondary:
        "border-input bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_8%)] pressed:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_16%)]",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-[color-mix(in_oklch,var(--destructive),var(--foreground)_8%)] pressed:bg-[color-mix(in_oklch,var(--destructive),var(--foreground)_16%)]",
      quiet:
        "border-0 bg-transparent text-foreground hover:bg-muted pressed:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_8%)]"
    },
    isDisabled: {
      true: "border-transparent bg-muted text-muted-foreground forced-colors:text-[GrayText]"
    },
    isPending: {
      true: "text-transparent"
    }
  },
  defaultVariants: {
    variant: "primary"
  },
  compoundVariants: [
    {
      variant: "quiet",
      isDisabled: true,
      class: "bg-transparent"
    }
  ]
})

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className })
      )}
    >
      {composeRenderProps(props.children, (children, { isPending }) => (
        <>
          {children}
          {isPending && (
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                stroke={
                  props.variant === "secondary" || props.variant === "quiet"
                    ? "var(--foreground)"
                    : "var(--primary-foreground)"
                }
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  fill="none"
                  className="opacity-25"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  pathLength="100"
                  strokeDasharray="60 140"
                  strokeDashoffset="0"
                />
              </svg>
            </span>
          )}
        </>
      ))}
    </RACButton>
  )
}
