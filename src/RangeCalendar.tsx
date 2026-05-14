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
import { composeTailwindRenderProps, focusRing } from "./utils"

export interface RangeCalendarProps<T extends DateValue> extends Omit<
  AriaRangeCalendarProps<T>,
  "visibleDuration"
> {
  errorMessage?: string
}

const cell = tv({
  extend: focusRing,
  base: "flex h-full w-full items-center justify-center rounded-full text-foreground forced-color-adjust-none",
  variants: {
    selectionState: {
      none: "group-pressed:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_8%)] group-hover:bg-muted",
      middle: [
        "group-hover:bg-[color-mix(in_oklch,var(--accent),var(--foreground)_8%)] forced-colors:group-hover:bg-[Highlight]",
        "group-invalid:group-hover:bg-[color-mix(in_oklch,var(--destructive),transparent_80%)] forced-colors:group-invalid:group-hover:bg-[Mark]",
        "group-pressed:bg-[color-mix(in_oklch,var(--accent),var(--foreground)_16%)] forced-colors:group-pressed:bg-[Highlight] forced-colors:text-[HighlightText]",
        "group-invalid:group-pressed:bg-[color-mix(in_oklch,var(--destructive),transparent_70%)] forced-colors:group-invalid:group-pressed:bg-[Mark]"
      ],
      cap: "bg-primary text-primary-foreground group-invalid:bg-destructive forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:group-invalid:bg-[Mark]"
    },
    isDisabled: {
      true: "text-muted-foreground forced-colors:text-[GrayText]"
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
        "font-sans w-[calc(9*var(--spacing)*7)] max-w-full @container"
      )}
    >
      <CalendarHeader />
      <CalendarGrid className="border-spacing-0 [&_td]:px-0 [&_td]:py-px">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className="group outside-month:text-muted-foreground selected:bg-accent forced-colors:selected:bg-[Highlight] invalid:selected:bg-[color-mix(in_oklch,var(--destructive),transparent_80%)] forced-colors:invalid:selected:bg-[Mark] selection-start:rounded-s-full selection-end:rounded-e-full aspect-square w-[calc(100cqw/7)] cursor-default text-sm outline [-webkit-tap-highlight-color:transparent] [td:first-child_&]:rounded-s-full [td:last-child_&]:rounded-e-full"
            >
              {({
                formattedDate,
                isSelected,
                isSelectionStart,
                isSelectionEnd,
                isFocusVisible,
                isDisabled
              }) => (
                <span
                  className={cell({
                    selectionState:
                      isSelected && (isSelectionStart || isSelectionEnd)
                        ? "cap"
                        : isSelected
                          ? "middle"
                          : "none",
                    isDisabled,
                    isFocusVisible
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
