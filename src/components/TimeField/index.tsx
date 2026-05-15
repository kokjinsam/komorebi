"use client"

import React from "react"
import {
  TimeField as AriaTimeField,
  type TimeFieldProps as AriaTimeFieldProps,
  type TimeValue,
  type ValidationResult
} from "react-aria-components/TimeField"
import { composeTailwindRenderProps } from "@/utils"
import { DateInput } from "../DateField"
import { Description, FieldError, Label } from "../Field"

export interface TimeFieldProps<
  T extends TimeValue
> extends AriaTimeFieldProps<T> {
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  label?: string
}

export function TimeField<T extends TimeValue>({
  description,
  errorMessage,
  label,
  ...props
}: TimeFieldProps<T>) {
  return (
    <AriaTimeField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5"
      )}
      data-slot="field"
    >
      <Label>{label}</Label>
      <DateInput />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTimeField>
  )
}
