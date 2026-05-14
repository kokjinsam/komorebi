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
import { composeTailwindRenderProps } from "./utils"

const cellStyles = tv({
  base: "flex size-(--cell-size) cursor-default items-center justify-center rounded-(--cell-radius) text-sm text-foreground transition-colors forced-color-adjust-none outline-none [-webkit-tap-highlight-color:transparent]",
  variants: {
    isSelected: {
      false: "hover:bg-muted pressed:bg-muted/80",
      true: "bg-primary text-primary-foreground invalid:bg-destructive/10 invalid:text-destructive forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:invalid:bg-[Mark]"
    },
    isToday: {
      true: "ring-1 ring-input"
    },
    isOutsideMonth: {
      true: "text-muted-foreground/60"
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
      isSelected: true,
      isToday: true,
      className: "ring-0"
    }
  ]
})

export interface CalendarProps<T extends DateValue>
  extends Omit<AriaCalendarProps<T>, "visibleDuration"> {
  errorMessage?: string
}

export function Calendar<T extends DateValue>({ errorMessage, ...props }: CalendarProps<T>) {
  return (
    <AriaCalendar
      {...props}
      data-slot="calendar"
      className={composeTailwindRenderProps(
        props.className,
        "group/calendar flex flex-col [--cell-radius:var(--radius-4xl)] [--cell-size:2rem] @container"
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
    <header className="flex items-center gap-1 px-1 pb-4">
      <Button variant="ghost" size="icon-sm" slot="previous">
        {direction === "rtl" ? (
          <CaretRightIcon aria-hidden className="size-4" />
        ) : (
          <CaretLeftIcon aria-hidden className="size-4" />
        )}
      </Button>
      <Heading className="mx-2 flex-1 text-center font-heading text-base font-semibold text-foreground" />
      <Button variant="ghost" size="icon-sm" slot="next">
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
        <CalendarHeaderCell className="text-xs font-medium text-muted-foreground">
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  )
}
