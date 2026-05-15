"use client"

import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "./utils"

const badge = tv({
  base: "group/badge focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20 inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-3xl border border-transparent bg-clip-padding px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:ring-3 aria-invalid:ring-3 [&>svg]:pointer-events-none [&>svg]:size-3!",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border-border text-foreground hover:bg-muted",
      destructive:
        "bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
      ghost: "text-foreground hover:bg-muted dark:hover:bg-muted/50"
    }
  },
  defaultVariants: { variant: "default" }
})

export interface BadgeProps
  extends React.ComponentProps<"span">, VariantProps<typeof badge> {}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badge({ variant }), className)}
      {...props}
    />
  )
}
