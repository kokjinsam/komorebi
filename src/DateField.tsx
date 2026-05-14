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
import { Description, FieldError, Label, fieldGroupStyles } from "./Field"
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
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-1"
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
  base: "type-literal:p-0 inline rounded-xs p-0.5 whitespace-nowrap text-foreground caret-transparent outline-0 forced-color-adjust-none [-webkit-tap-highlight-color:transparent] forced-colors:text-[ButtonText]",
  variants: {
    isPlaceholder: {
      true: "text-muted-foreground"
    },
    isDisabled: {
      true: "text-muted-foreground forced-colors:text-[GrayText]"
    },
    isFocused: {
      true: "bg-primary text-primary-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
    }
  }
})

export function DateInput(props: Omit<DateInputProps, "children">) {
  return (
    <AriaDateInput
      className={(renderProps) =>
        fieldGroupStyles({
          ...renderProps,
          class:
            "inline min-w-37.5 px-3 h-9 text-sm leading-8.5 font-sans cursor-text disabled:cursor-default whitespace-nowrap overflow-x-auto scrollbar-none"
        })
      }
      {...props}
    >
      {(segment) => <DateSegment segment={segment} className={segmentStyles} />}
    </AriaDateInput>
  )
}
