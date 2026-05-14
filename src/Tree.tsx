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
import { composeTailwindRenderProps } from "./utils"

const itemStyles = tv({
  base: "group/tree-item relative flex cursor-default border-b border-border bg-background px-3 py-1 text-sm text-foreground select-none first:rounded-t-3xl first:border-t-0 last:rounded-b-3xl last:border-b-0 outline-none -outline-offset-2 focus-visible:ring-2 focus-visible:ring-ring/30 hover:bg-muted pressed:bg-muted/80 pressed:translate-y-px selected:bg-accent selected:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    isSelected: {
      false: "",
      true: "border-y-transparent z-20"
    },
    isDisabled: {
      true: "z-10"
    }
  }
})

export function Tree<T extends object>({ children, ...props }: TreeProps<T>) {
  return (
    <AriaTree
      {...props}
      data-slot="tree"
      className={composeTailwindRenderProps(
        props.className,
        "w-48 max-w-full overflow-auto relative rounded-3xl border border-border bg-background shadow-sm"
      )}
    >
      {children}
    </AriaTree>
  )
}

const expandButton = tv({
  base: "flex size-8 shrink-0 cursor-default items-center justify-center rounded-2xl border-0 bg-transparent p-0 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring/30 [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      true: "text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

const chevron = tv({
  base: "size-4 text-muted-foreground transition-transform duration-200 ease-in-out",
  variants: {
    isExpanded: {
      true: "rotate-90 transform"
    }
  }
})

export interface TreeItemProps extends Partial<AriaTreeItemProps> {
  title: string
}

export function TreeItem(props: TreeItemProps) {
  return (
    <AriaTreeItem data-slot="tree-item" className={itemStyles} textValue={props.title} {...props}>
      <AriaTreeItemContent {...props}>
        {({ selectionMode, selectionBehavior, hasChildItems, isExpanded, isDisabled }) => (
          <div className="flex items-center">
            {selectionMode !== "none" && selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
            <div className="w-[calc(calc(var(--tree-item-level)-1)*(--spacing(3)))] shrink-0" />
            {hasChildItems ? (
              <Button slot="chevron" className={expandButton({ isDisabled })}>
                <CaretRightIcon
                  aria-hidden
                  className={chevron({ isExpanded })}
                />
              </Button>
            ) : (
              <div className="size-8 shrink-0" />
            )}
            {props.title}
          </div>
        )}
      </AriaTreeItemContent>
      {props.children}
    </AriaTreeItem>
  )
}
