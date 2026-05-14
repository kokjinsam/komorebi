"use client"

import React from "react"
import {
  DateField as AriaDateField,
  type DateFieldProps as AriaDateFieldProps,
  DateInput as AriaDateInput,
  type DateInputProps,
  DateSegment,
  type DateValue,
  type ValidationResult
} from "react-aria-components/DateField"
import { tv } from "tailwind-variants"
import { Description, FieldError, Label } from "./Field"
import { composeTailwindRenderProps } from "./utils"

export interface DateFieldProps<
  T extends DateValue
> extends AriaDateFieldProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function DateField<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DateFieldProps<T>) {
  return (
    <AriaDateField
      {...props}
      data-slot="field"
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5"
      )}
    >
      {label && <Label>{label}</Label>}
      <DateInput />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaDateField>
  )
}

const segmentStyles = tv({
  base: "type-literal:p-0 text-foreground inline rounded-sm p-0.5 whitespace-nowrap caret-transparent outline-0 forced-color-adjust-none [-webkit-tap-highlight-color:transparent] forced-colors:text-[ButtonText]",
  variants: {
    isPlaceholder: { true: "text-muted-foreground" },
    isDisabled: { true: "text-muted-foreground forced-colors:text-[GrayText]" },
    isFocused: {
      true: "bg-primary text-primary-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
    }
  }
})

export const dateInputContainerClass =
  "flex h-9 w-full items-center rounded-3xl border border-transparent bg-input/50 px-3 py-1 text-sm transition-[color,box-shadow,background-color] outline-none focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 invalid:border-destructive invalid:ring-3 invalid:ring-destructive/20 dark:invalid:ring-destructive/40 disabled:pointer-events-none disabled:opacity-50 cursor-text whitespace-nowrap overflow-x-auto [scrollbar-width:none] forced-colors:bg-[Field]"

export const dateInputInlineClass =
  "flex h-full min-w-0 flex-1 items-center bg-transparent px-3 text-sm text-foreground whitespace-nowrap overflow-x-auto [scrollbar-width:none] cursor-text outline-none"

export function DateInput({
  inline,
  ...props
}: Omit<DateInputProps, "children"> & { inline?: boolean }) {
  return (
    <AriaDateInput
      data-slot="date-input"
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        inline ? dateInputInlineClass : dateInputContainerClass
      )}
    >
      {(segment) => <DateSegment segment={segment} className={segmentStyles} />}
    </AriaDateInput>
  )
}
