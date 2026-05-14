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
        "pressed:bg-neutral-300 dark:pressed:bg-neutral-600 text-neutral-900 hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700",
      true: "bg-blue-600 text-white invalid:bg-red-600 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:invalid:bg-[Mark]"
    },
    isDisabled: {
      true: "text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]"
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
        <Text slot="errorMessage" className="text-sm text-red-600">
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
      <Heading className="mx-2 my-0 flex-1 text-center font-sans text-base font-semibold text-neutral-900 [font-variation-settings:normal] dark:text-neutral-200" />
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
        <CalendarHeaderCell className="text-xs font-semibold text-neutral-500">
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  )
}
