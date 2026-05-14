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
import { composeTailwindRenderProps } from "./utils"

export function GridList<T extends object>({ children, ...props }: GridListProps<T>) {
  let isHorizontal =
    (props as { orientation?: "horizontal" | "vertical" }).orientation === "horizontal"
  return (
    <AriaGridList
      {...props}
      data-slot="grid-list"
      className={composeTailwindRenderProps(
        props.className,
        isHorizontal
          ? "flex flex-row flex-nowrap overflow-x-auto relative w-full max-w-125 rounded-3xl border border-border bg-background shadow-sm empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm"
          : "overflow-auto w-50 relative rounded-3xl border border-border bg-background shadow-sm empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm"
      )}
    >
      {children}
    </AriaGridList>
  )
}

const itemStyles = tv({
  base: [
    "group/grid-list-item relative flex gap-3 cursor-default select-none py-2 px-3 text-sm text-foreground border-transparent -outline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
    "[[data-orientation=vertical]_&]:border-t [[data-orientation=vertical]_&]:border-t-border [[data-orientation=vertical]_&]:first:border-t-0 [[data-orientation=vertical]_&]:first:rounded-t-3xl [[data-orientation=vertical]_&]:last:rounded-b-3xl",
    "[[data-orientation=horizontal]_&]:border-l [[data-orientation=horizontal]_&]:border-l-border [[data-orientation=horizontal]_&]:first:border-l-0 [[data-orientation=horizontal]_&]:first:rounded-s-3xl [[data-orientation=horizontal]_&]:last:rounded-e-3xl [[data-orientation=horizontal]_&]:flex-shrink-0"
  ].join(" "),
  variants: {
    isSelected: {
      false: "hover:bg-muted pressed:bg-muted/80",
      true: "bg-accent text-accent-foreground pressed:bg-accent/80 z-20"
    },
    isDisabled: {
      true: "z-10 opacity-50 pointer-events-none forced-colors:text-[GrayText]"
    }
  }
})

export function GridListItem({ children, ...props }: GridListItemProps) {
  let textValue = typeof children === "string" ? children : undefined
  return (
    <AriaGridListItem data-slot="grid-list-item" textValue={textValue} {...props} className={itemStyles}>
      {composeRenderProps(
        children,
        (children, { selectionMode, selectionBehavior, allowsDragging }) => (
          <>
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

export function GridListHeader({ children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <AriaGridListHeader
      {...props}
      data-slot="grid-list-header"
      className={twMerge(
        "text-xs font-medium text-muted-foreground px-4 py-1.5 -mt-px z-10 bg-muted/60 border-y border-y-border",
        props.className
      )}
    >
      {children}
    </AriaGridListHeader>
  )
}
