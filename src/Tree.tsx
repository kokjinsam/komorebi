"use client"

import { CaretRightIcon } from "@phosphor-icons/react"
import React from "react"
import {
  Tree as AriaTree,
  TreeItem as AriaTreeItem,
  TreeItemContent as AriaTreeItemContent,
  Button,
  type TreeItemProps as AriaTreeItemProps,
  type TreeProps
} from "react-aria-components/Tree"
import { tv } from "tailwind-variants"
import { Checkbox } from "./Checkbox"
import { composeTailwindRenderProps, focusRing } from "./utils"

const itemStyles = tv({
  extend: focusRing,
  base: "group relative flex cursor-default gap-3 border-t border-border bg-background px-3 py-1 font-sans text-sm text-foreground -outline-offset-2 select-none first:rounded-t-lg first:border-t-0 last:rounded-b-lg",
  variants: {
    isSelected: {
      false:
        "pressed:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_8%)] hover:bg-muted",
      true: "pressed:bg-[color-mix(in_oklch,var(--accent),var(--foreground)_16%)] z-20 border-y-[color-mix(in_oklch,var(--accent),transparent_50%)] bg-accent hover:bg-[color-mix(in_oklch,var(--accent),var(--foreground)_8%)]"
    },
    isDisabled: {
      true: "z-10 text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

export function Tree<T extends object>({ children, ...props }: TreeProps<T>) {
  return (
    <AriaTree
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "w-48 max-w-full overflow-auto relative border border-border rounded-lg"
      )}
    >
      {children}
    </AriaTree>
  )
}

const expandButton = tv({
  extend: focusRing,
  base: "flex h-8 w-8 shrink-0 cursor-default items-center justify-center rounded-lg border-0 bg-transparent p-0 text-start [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      true: "text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

const chevron = tv({
  base: "h-4.5 w-4.5 text-muted-foreground transition-transform duration-200 ease-in-out",
  variants: {
    isExpanded: {
      true: "rotate-90 transform"
    },
    isDisabled: {
      true: "text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

export interface TreeItemProps extends Partial<AriaTreeItemProps> {
  title: string
}

export function TreeItem(props: TreeItemProps) {
  return (
    <AriaTreeItem className={itemStyles} textValue={props.title} {...props}>
      <AriaTreeItemContent {...props}>
        {({
          selectionMode,
          selectionBehavior,
          hasChildItems,
          isExpanded,
          isDisabled
        }) => (
          <div className={`flex items-center`}>
            {selectionMode !== "none" && selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
            <div className="w-[calc(calc(var(--tree-item-level)-1)*(--spacing(3)))] shrink-0" />
            {hasChildItems ? (
              <Button slot="chevron" className={expandButton({ isDisabled })}>
                <CaretRightIcon
                  aria-hidden
                  className={chevron({ isExpanded, isDisabled })}
                />
              </Button>
            ) : (
              <div className="h-8 w-8 shrink-0" />
            )}
            {props.title}
          </div>
        )}
      </AriaTreeItemContent>
      {props.children}
    </AriaTreeItem>
  )
}
