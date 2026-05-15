"use client"

import { CalendarIcon } from "@phosphor-icons/react"
import React from "react"
import {
  DateRangePicker as AriaDateRangePicker,
  type DateRangePickerProps as AriaDateRangePickerProps,
  type DateValue,
  type ValidationResult
} from "react-aria-components/DateRangePicker"
import { DateInput } from "./DateField"
import { Description, FieldError, FieldGroup, Label } from "./Field"
import { FieldButton } from "./FieldButton"
import { Popover } from "./Popover"
import { RangeCalendar } from "./RangeCalendar"
import { composeTailwindRenderProps } from "./utils"

export interface DateRangePickerProps<
  T extends DateValue
> extends AriaDateRangePickerProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function DateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DateRangePickerProps<T>) {
  return (
    <AriaDateRangePicker
      {...props}
      data-slot="field"
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5 max-w-full"
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className="w-auto min-w-52" data-slot="date-range-picker">
        <div className="flex w-fit flex-1 [scrollbar-width:none] items-center overflow-x-auto overflow-y-clip">
          <DateInput slot="start" inline />
          <span
            aria-hidden="true"
            className="text-foreground group-disabled/field-group:text-muted-foreground shrink-0 forced-colors:text-[ButtonText]"
          >
            –
          </span>
          <DateInput slot="end" inline />
        </div>
        <FieldButton className="mr-1">
          <CalendarIcon aria-hidden className="size-4" />
        </FieldButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="p-2">
        <RangeCalendar />
      </Popover>
    </AriaDateRangePicker>
  )
}
