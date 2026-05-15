"use client"

import { CalendarIcon } from "@phosphor-icons/react"
import React from "react"
import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
  type ValidationResult
} from "react-aria-components/DatePicker"
import { composeTailwindRenderProps } from "@/utils"
import { Calendar } from "../Calendar"
import { DateInput } from "../DateField"
import { Description, FieldError, FieldGroup, Label } from "../Field"
import { FieldButton } from "../FieldButton"
import { Popover } from "../Popover"

export interface DatePickerProps<
  T extends DateValue
> extends AriaDatePickerProps<T> {
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  label?: string
}

export function DatePicker<T extends DateValue>({
  description,
  errorMessage,
  label,
  ...props
}: DatePickerProps<T>) {
  return (
    <AriaDatePicker
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5"
      )}
      data-slot="field"
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
