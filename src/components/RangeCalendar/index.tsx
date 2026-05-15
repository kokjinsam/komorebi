"use client"

import React from "react"
import {
  RangeCalendar as AriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  Text,
  type DateValue,
  type RangeCalendarProps as AriaRangeCalendarProps
} from "react-aria-components/RangeCalendar"
import { tv } from "tailwind-variants"
import { composeTailwindRenderProps } from "@/utils"
import { CalendarGridHeader, CalendarHeader } from "../Calendar"

export interface RangeCalendarProps<T extends DateValue> extends Omit<
  AriaRangeCalendarProps<T>,
  "visibleDuration"
> {
  errorMessage?: string
}

const cell = tv({
  base: "text-foreground flex size-full items-center justify-center text-sm forced-color-adjust-none outline-none",
  compoundVariants: [
    {
      className: "ring-0",
      isToday: true,
      selectionState: "cap"
    }
  ],
  variants: {
    isDisabled: {
      true: "pointer-events-none opacity-50 forced-colors:text-[GrayText]"
    },
    isFocusVisible: {
      true: "ring-ring/30 ring-2"
    },
    isToday: {
      true: "ring-input ring-1"
    },
    selectionState: {
      cap: "bg-primary text-primary-foreground group-invalid:bg-destructive rounded-(--cell-radius) forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:group-invalid:bg-[Mark]",
      middle: [
        "rounded-none bg-accent text-accent-foreground",
        "hover:bg-accent/80 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "group-invalid:bg-destructive/10 group-invalid:text-destructive"
      ].join(" "),
      none: "hover:bg-muted pressed:bg-muted/80 rounded-(--cell-radius)"
    }
  }
})

export function RangeCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <AriaRangeCalendar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group/range-calendar [--cell-radius:var(--radius-4xl)] [--cell-size:2rem] w-[calc(9*var(--spacing)*7)] @container"
      )}
      data-slot="range-calendar"
    >
      <CalendarHeader />
      <CalendarGrid className="border-spacing-0 [&_td]:px-0 [&_td]:py-px">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              className={[
                "group/cell size-(--cell-size) cursor-default text-sm outline-none [-webkit-tap-highlight-color:transparent]",
                "outside-month:text-muted-foreground/60",
                "selected:bg-accent forced-colors:selected:bg-[Highlight]",
                "invalid:selected:bg-destructive/10 forced-colors:invalid:selected:bg-[Mark]",
                "selection-start:rounded-l-(--cell-radius) selection-start:rounded-r-none",
                "selection-end:rounded-r-(--cell-radius) selection-end:rounded-l-none",
                "[td:first-child_&]:rounded-l-(--cell-radius)",
                "[td:last-child_&]:rounded-r-(--cell-radius)"
              ].join(" ")}
              date={date}
            >
              {({
                formattedDate,
                isDisabled,
                isFocusVisible,
                isSelected,
                isSelectionEnd,
                isSelectionStart,
                isToday
              }) => (
                <span
                  className={cell({
                    isDisabled,
                    isFocusVisible,
                    isToday,
                    selectionState:
                      isSelected && (isSelectionStart || isSelectionEnd)
                        ? "cap"
                        : isSelected
                          ? "middle"
                          : "none"
                  })}
                >
                  {formattedDate}
                </span>
              )}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text className="text-destructive text-sm" slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </AriaRangeCalendar>
  )
}
