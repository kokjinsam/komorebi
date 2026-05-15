"use client"

import { CalendarIcon } from "@phosphor-icons/react"
import React from "react"
import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
  type ValidationResult
} from "react-aria-components/DatePicker"
import { Calendar } from "./Calendar"
import { DateInput } from "./DateField"
import { Description, FieldError, FieldGroup, Label } from "./Field"
import { FieldButton } from "./FieldButton"
import { Popover } from "./Popover"
import { composeTailwindRenderProps } from "./utils"

export interface DatePickerProps<
  T extends DateValue
> extends AriaDatePickerProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DatePickerProps<T>) {
  return (
    <AriaDatePicker
      {...props}
      data-slot="field"
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5"
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className="w-auto min-w-52" data-slot="date-picker">
        <DateInput inline />
        <FieldButton className="mr-1">
          <CalendarIcon aria-hidden className="size-4" />
        </FieldButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="p-2">
        <Calendar />
      </Popover>
    </AriaDatePicker>
  )
}
