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
import { composeTailwindRenderProps } from "@/utils"
import { Checkbox } from "../Checkbox"

export function GridList<T extends object>({
  children,
  ...props
}: GridListProps<T>) {
  const isHorizontal =
    (props as { orientation?: "horizontal" | "vertical" }).orientation ===
    "horizontal"
  return (
    <AriaGridList
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        isHorizontal
          ? "flex flex-row flex-nowrap overflow-x-auto relative w-full max-w-125 rounded-3xl border border-border bg-background shadow-sm empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm"
          : "overflow-auto w-50 relative rounded-3xl border border-border bg-background shadow-sm empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm"
      )}
      data-slot="grid-list"
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
    isDisabled: {
      true: "pointer-events-none z-10 opacity-50 forced-colors:text-[GrayText]"
    },
    isSelected: {
      false: "hover:bg-muted pressed:bg-muted/80",
      true: "bg-accent text-accent-foreground pressed:bg-accent/80 z-20"
    }
  }
})

export function GridListItem({ children, ...props }: GridListItemProps) {
  const textValue = typeof children === "string" ? children : undefined
  return (
    <AriaGridListItem
      data-slot="grid-list-item"
      textValue={textValue}
      {...props}
      className={itemStyles}
    >
      {composeRenderProps(
        children,
        (children, { allowsDragging, selectionBehavior, selectionMode }) => (
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

export function GridListHeader({
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <AriaGridListHeader
      {...props}
      className={twMerge(
        "text-xs font-medium text-muted-foreground px-4 py-1.5 -mt-px z-10 bg-muted/60 border-y border-y-border",
        props.className
      )}
      data-slot="grid-list-header"
    >
      {children}
    </AriaGridListHeader>
  )
}
