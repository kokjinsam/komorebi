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
import { CalendarGridHeader, CalendarHeader } from "./Calendar"
import { composeTailwindRenderProps } from "./utils"

export interface RangeCalendarProps<T extends DateValue>
  extends Omit<AriaRangeCalendarProps<T>, "visibleDuration"> {
  errorMessage?: string
}

const cell = tv({
  base: "flex size-full items-center justify-center text-sm text-foreground forced-color-adjust-none outline-none",
  variants: {
    selectionState: {
      none: "rounded-(--cell-radius) hover:bg-muted pressed:bg-muted/80",
      middle: [
        "rounded-none bg-accent text-accent-foreground",
        "hover:bg-accent/80 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "group-invalid:bg-destructive/10 group-invalid:text-destructive"
      ].join(" "),
      cap: "rounded-(--cell-radius) bg-primary text-primary-foreground group-invalid:bg-destructive forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:group-invalid:bg-[Mark]"
    },
    isToday: {
      true: "ring-1 ring-input"
    },
    isDisabled: {
      true: "opacity-50 pointer-events-none forced-colors:text-[GrayText]"
    },
    isFocusVisible: {
      true: "ring-2 ring-ring/30"
    }
  },
  compoundVariants: [
    {
      selectionState: "cap",
      isToday: true,
      className: "ring-0"
    }
  ]
})

export function RangeCalendar<T extends DateValue>({ errorMessage, ...props }: RangeCalendarProps<T>) {
  return (
    <AriaRangeCalendar
      {...props}
      data-slot="range-calendar"
      className={composeTailwindRenderProps(
        props.className,
        "group/range-calendar [--cell-radius:var(--radius-4xl)] [--cell-size:2rem] @container"
      )}
    >
      <CalendarHeader />
      <CalendarGrid className="border-spacing-0 [&_td]:px-0 [&_td]:py-px">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
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
            >
              {({ formattedDate, isSelected, isSelectionStart, isSelectionEnd, isFocusVisible, isDisabled, isToday }) => (
                <span
                  className={cell({
                    selectionState:
                      isSelected && (isSelectionStart || isSelectionEnd)
                        ? "cap"
                        : isSelected
                          ? "middle"
                          : "none",
                    isDisabled,
                    isFocusVisible,
                    isToday
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
        <Text slot="errorMessage" className="text-sm text-destructive">
          {errorMessage}
        </Text>
      )}
    </AriaRangeCalendar>
  )
}
