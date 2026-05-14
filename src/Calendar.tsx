"use client"

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import React from "react"
import {
  Calendar as AriaCalendar,
  CalendarGridHeader as AriaCalendarGridHeader,
  type CalendarProps as AriaCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  Heading,
  Text,
  type DateValue
} from "react-aria-components/Calendar"
import { useLocale } from "react-aria-components/I18nProvider"
import { tv } from "tailwind-variants"
import { Button } from "./Button"
import { composeTailwindRenderProps, focusRing } from "./utils"

const cellStyles = tv({
  extend: focusRing,
  base: "flex aspect-square w-[calc(100cqw/7)] cursor-default items-center justify-center rounded-full text-sm forced-color-adjust-none [-webkit-tap-highlight-color:transparent]",
  variants: {
    isSelected: {
      false:
        "pressed:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_8%)] text-foreground hover:bg-muted",
      true: "bg-primary text-primary-foreground invalid:bg-destructive forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:invalid:bg-[Mark]"
    },
    isDisabled: {
      true: "text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

export interface CalendarProps<T extends DateValue> extends Omit<
  AriaCalendarProps<T>,
  "visibleDuration"
> {
  errorMessage?: string
}

export function Calendar<T extends DateValue>({
  errorMessage,
  ...props
}: CalendarProps<T>) {
  return (
    <AriaCalendar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col font-sans w-[calc(9*var(--spacing)*7)] max-w-full @container"
      )}
    >
      <CalendarHeader />
      <CalendarGrid className="border-spacing-0">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} className={cellStyles} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-destructive">
          {errorMessage}
        </Text>
      )}
    </AriaCalendar>
  )
}

export function CalendarHeader() {
  let { direction } = useLocale()

  return (
    <header className="border-box flex items-center gap-1 px-1 pb-4">
      <Button variant="quiet" slot="previous">
        {direction === "rtl" ? (
          <CaretRightIcon aria-hidden className="h-4 w-4" />
        ) : (
          <CaretLeftIcon aria-hidden className="h-4 w-4" />
        )}
      </Button>
      <Heading className="mx-2 my-0 flex-1 text-center font-sans text-base font-semibold text-foreground [font-variation-settings:normal]" />
      <Button variant="quiet" slot="next">
        {direction === "rtl" ? (
          <CaretLeftIcon aria-hidden className="h-4 w-4" />
        ) : (
          <CaretRightIcon aria-hidden className="h-4 w-4" />
        )}
      </Button>
    </header>
  )
}

export function CalendarGridHeader() {
  return (
    <AriaCalendarGridHeader>
      {(day) => (
        <CalendarHeaderCell className="text-xs font-semibold text-muted-foreground">
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  )
}
