"use client"

import React from "react"
import {
  ColorField as AriaColorField,
  type ColorFieldProps as AriaColorFieldProps,
  type ValidationResult
} from "react-aria-components/ColorField"
import { Input as RACInput } from "react-aria-components/Input"
import { Description, FieldError, Label } from "./Field"
import { composeTailwindRenderProps } from "./utils"

const inputClass =
  "h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground transition-[color,box-shadow,background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 forced-colors:bg-[Field] [-webkit-tap-highlight-color:transparent]"

export interface ColorFieldProps extends AriaColorFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function ColorField({
  label,
  description,
  errorMessage,
  ...props
}: ColorFieldProps) {
  return (
    <AriaColorField
      {...props}
      data-slot="field"
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5"
      )}
    >
      {label && <Label>{label}</Label>}
      <RACInput data-slot="input" className={inputClass} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaColorField>
  )
}
