"use client"

import React from "react"
import { type HTMLAttributes } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  GridListHeader as AriaGridListHeader,
  Button,
  type GridListItemProps,
  type GridListProps
} from "react-aria-components/GridList"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"
import { Checkbox } from "./Checkbox"
import { composeTailwindRenderProps, focusRing } from "./utils"

export function GridList<T extends object>({
  children,
  ...props
}: GridListProps<T>) {
  let isHorizontal =
    (props as { orientation?: "horizontal" | "vertical" }).orientation ===
    "horizontal"
  return (
    <AriaGridList
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        isHorizontal
          ? "flex flex-row flex-nowrap overflow-x-auto relative w-full max-w-125 bg-background border border-border rounded-lg font-sans empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm"
          : "overflow-auto w-50 relative bg-background border border-border rounded-lg font-sans empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm"
      )}
    >
      {children}
    </AriaGridList>
  )
}

const itemStyles = tv({
  extend: focusRing,
  base: [
    "relative flex gap-3 cursor-default select-none py-2 px-3 text-sm text-foreground border-transparent -outline-offset-2",
    "[[data-orientation=vertical]_&]:border-t [[data-orientation=vertical]_&]:border-t-border [[data-orientation=vertical]_&]:first:border-t-0 [[data-orientation=vertical]_&]:first:rounded-t-lg [[data-orientation=vertical]_&]:last:rounded-b-lg",
    "[[data-orientation=horizontal]_&]:border-l [[data-orientation=horizontal]_&]:border-l-border [[data-orientation=horizontal]_&]:first:border-l-0 [[data-orientation=horizontal]_&]:first:rounded-s-lg [[data-orientation=horizontal]_&]:last:rounded-e-lg [[data-orientation=horizontal]_&]:flex-shrink-0"
  ].join(" "),
  variants: {
    isSelected: {
      false:
        "pressed:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_8%)] hover:bg-muted",
      true: [
        "bg-accent hover:bg-[color-mix(in_oklch,var(--accent),var(--foreground)_8%)] pressed:bg-[color-mix(in_oklch,var(--accent),var(--foreground)_16%)] z-20",
        "[[data-orientation=vertical]_&]:border-y-[color-mix(in_oklch,var(--accent),transparent_50%)]",
        "[[data-orientation=horizontal]_&]:border-x-[color-mix(in_oklch,var(--accent),transparent_50%)]"
      ].join(" ")
    },
    isDisabled: {
      true: "z-10 text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

export function GridListItem({ children, ...props }: GridListItemProps) {
  let textValue = typeof children === "string" ? children : undefined
  return (
    <AriaGridListItem textValue={textValue} {...props} className={itemStyles}>
      {composeRenderProps(
        children,
        (children, { selectionMode, selectionBehavior, allowsDragging }) => (
          <>
            {/* Add elements for drag and drop and selection. */}
            {allowsDragging && <Button slot="drag">≡</Button>}
            {selectionMode !== "none" && selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
            {children}
          </>
        )
      )}
    </AriaGridListItem>
  )
}

export function GridListHeader({
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <AriaGridListHeader
      {...props}
      className={twMerge(
        "text-sm font-semibold text-muted-foreground px-4 py-1 -mt-px z-10 bg-muted/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-muted border-y border-y-border",
        props.className
      )}
    >
      {children}
    </AriaGridListHeader>
  )
}
