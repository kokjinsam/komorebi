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
import { composeTailwindRenderProps } from "@/utils"
import { Button } from "../Button"

const cellStyles = tv({
  base: "text-foreground flex size-(--cell-size) cursor-default items-center justify-center rounded-(--cell-radius) text-sm transition-colors forced-color-adjust-none outline-none [-webkit-tap-highlight-color:transparent]",
  compoundVariants: [
    {
      className: "ring-0",
      isSelected: true,
      isToday: true
    }
  ],
  variants: {
    isDisabled: {
      true: "pointer-events-none opacity-50 forced-colors:text-[GrayText]"
    },
    isFocusVisible: {
      true: "ring-ring/30 ring-2"
    },
    isOutsideMonth: {
      true: "text-muted-foreground/60"
    },
    isSelected: {
      false: "hover:bg-muted pressed:bg-muted/80",
      true: "bg-primary text-primary-foreground invalid:bg-destructive/10 invalid:text-destructive forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:invalid:bg-[Mark]"
    },
    isToday: {
      true: "ring-input ring-1"
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
        "group/calendar flex flex-col [--cell-radius:var(--radius-4xl)] [--cell-size:2rem] w-[calc(9*var(--spacing)*7)] @container"
      )}
      data-slot="calendar"
    >
      <CalendarHeader />
      <CalendarGrid className="border-spacing-0">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => <CalendarCell className={cellStyles} date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text className="text-destructive text-sm" slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </AriaCalendar>
  )
}

export function CalendarHeader() {
  const { direction } = useLocale()

  return (
    <header className="flex items-center gap-1 px-1 pb-4">
      <Button size="icon-sm" slot="previous" variant="ghost">
        {direction === "rtl" ? (
          <CaretRightIcon aria-hidden className="size-4" />
        ) : (
          <CaretLeftIcon aria-hidden className="size-4" />
        )}
      </Button>
      <Heading className="font-heading text-foreground mx-2 flex-1 text-center text-base font-semibold" />
      <Button size="icon-sm" slot="next" variant="ghost">
        {direction === "rtl" ? (
          <CaretLeftIcon aria-hidden className="size-4" />
        ) : (
          <CaretRightIcon aria-hidden className="size-4" />
        )}
      </Button>
    </header>
  )
}

export function CalendarGridHeader() {
  return (
    <AriaCalendarGridHeader>
      {(day) => (
        <CalendarHeaderCell className="text-muted-foreground text-xs font-medium">
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  )
}
