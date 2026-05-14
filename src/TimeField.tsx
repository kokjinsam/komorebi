"use client"

import React from "react"
import {
  TimeField as AriaTimeField,
  type TimeFieldProps as AriaTimeFieldProps,
  type TimeValue,
  type ValidationResult
} from "react-aria-components/TimeField"
import { DateInput } from "./DateField"
import { Description, FieldError, Label } from "./Field"
import { composeTailwindRenderProps } from "./utils"

export interface TimeFieldProps<T extends TimeValue> extends AriaTimeFieldProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function TimeField<T extends TimeValue>({ label, description, errorMessage, ...props }: TimeFieldProps<T>) {
  return (
    <AriaTimeField
      {...props}
      data-slot="field"
      className={composeTailwindRenderProps(props.className, "group/field flex flex-col gap-1.5")}
    >
      <Label>{label}</Label>
      <DateInput />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTimeField>
  )
}
