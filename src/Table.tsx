"use client"

import { ArrowUpIcon, CaretRightIcon } from "@phosphor-icons/react"
import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { Group } from "react-aria-components/Group"
import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  TableBody as AriaTableBody,
  Button,
  type CellProps,
  Collection,
  type ColumnProps,
  ColumnResizer,
  ResizableTableContainer,
  type RowProps,
  type TableHeaderProps,
  type TableProps as AriaTableProps,
  useTableOptions,
  type TableBodyProps
} from "react-aria-components/Table"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"
import { Checkbox } from "./Checkbox"
import { composeTailwindRenderProps, focusRing } from "./utils"

interface TableProps extends Omit<AriaTableProps, "className"> {
  className?: string
}

export function Table(props: TableProps) {
  return (
    <ResizableTableContainer
      onScroll={props.onScroll}
      className={twMerge(
        "w-full max-h-[320px] overflow-auto scroll-pt-[2.281rem] relative bg-background box-border border border-border rounded-lg font-sans",
        props.className
      )}
    >
      <AriaTable
        {...props}
        className="box-border border-separate border-spacing-0 overflow-hidden has-[>[data-empty]]:h-full"
      />
    </ResizableTableContainer>
  )
}

const columnStyles = tv({
  extend: focusRing,
  base: "box-border flex h-5 flex-1 items-center gap-1 overflow-hidden px-2"
})

const resizerStyles = tv({
  extend: focusRing,
  base: "resizing:bg-primary forced-colors:resizing:bg-[Highlight] resizing:w-[2px] resizing:pl-[7px] box-content h-5 w-px translate-x-[8px] cursor-col-resize rounded-xs bg-border bg-clip-content px-[8px] py-1 -outline-offset-2 forced-colors:bg-[ButtonBorder]"
})

export function Column(props: ColumnProps) {
  return (
    <AriaColumn
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "box-border h-1 [&:hover]:z-20 focus-within:z-20 text-start text-sm font-semibold text-muted-foreground cursor-default"
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { allowsSorting, sortDirection }) => (
          <div className="flex items-center">
            <Group role="presentation" tabIndex={-1} className={columnStyles}>
              <span className="truncate">{children}</span>
              {allowsSorting && (
                <span
                  className={`flex h-4 w-4 items-center justify-center transition ${
                    sortDirection === "descending" ? "rotate-180" : ""
                  }`}
                >
                  {sortDirection && (
                    <ArrowUpIcon
                      aria-hidden
                      className="h-4 w-4 text-muted-foreground forced-colors:text-[ButtonText]"
                    />
                  )}
                </span>
              )}
            </Group>
            {!props.width && <ColumnResizer className={resizerStyles} />}
          </div>
        )
      )}
    </AriaColumn>
  )
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  let { selectionBehavior, selectionMode, allowsDragging } = useTableOptions()

  return (
    <AriaTableHeader
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "sticky top-0 z-10 bg-muted/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-muted forced-colors:bg-[Canvas] rounded-t-lg border-b border-b-border"
      )}
    >
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <Column />}
      {selectionBehavior === "toggle" && (
        <AriaColumn
          width={36}
          minWidth={36}
          className="box-border cursor-default p-2 text-start text-sm font-semibold"
        >
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </AriaColumn>
      )}
      <Collection items={props.columns}>{props.children}</Collection>
    </AriaTableHeader>
  )
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return (
    <AriaTableBody
      {...props}
      className="empty:text-center empty:text-sm empty:italic"
    />
  )
}

const rowStyles = tv({
  extend: focusRing,
  base: "group/row pressed:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_8%)] selected:bg-accent selected:hover:bg-[color-mix(in_oklch,var(--accent),var(--foreground)_8%)] selected:pressed:bg-[color-mix(in_oklch,var(--accent),var(--foreground)_16%)] relative cursor-default text-sm text-foreground -outline-offset-2 select-none last:rounded-b-lg hover:bg-muted disabled:text-muted-foreground"
})

export function Row<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>) {
  let { selectionBehavior, allowsDragging } = useTableOptions()

  return (
    <AriaRow id={id} {...otherProps} className={rowStyles}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaRow>
  )
}

const cellStyles = tv({
  extend: focusRing,
  base: "group-selected/row:border-(--selected-border) box-border truncate border-b border-b-border p-2 -outline-offset-2 [--selected-border:color-mix(in_oklch,var(--accent),transparent_50%)] [-webkit-tap-highlight-color:transparent] group-last/row:border-b-0 group-last/row:first:rounded-bl-lg group-last/row:last:rounded-br-lg [:is(:has(+[data-selected])_*)]:border-(--selected-border)"
})

const expandButton = tv({
  extend: focusRing,
  base: "shrink-0 cursor-default border-0 bg-transparent p-0 pr-1 align-middle [-webkit-tap-highlight-color:transparent]",
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

export function Cell(props: CellProps) {
  return (
    <AriaCell
      {...props}
      className={cellStyles}
      style={({ hasChildItems, isTreeColumn, level }) => ({
        paddingInlineStart: isTreeColumn
          ? 4 + (hasChildItems ? 0 : 20) + (level - 1) * 16
          : undefined
      })}
    >
      {composeRenderProps(
        props.children,
        (children, { hasChildItems, isTreeColumn, isExpanded, isDisabled }) => (
          <>
            {hasChildItems && isTreeColumn && (
              <Button slot="chevron" className={expandButton({ isDisabled })}>
                <CaretRightIcon
                  aria-hidden
                  className={chevron({ isExpanded, isDisabled })}
                />
              </Button>
            )}
            {children}
          </>
        )
      )}
    </AriaCell>
  )
}
