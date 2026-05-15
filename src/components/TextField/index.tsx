"use client"

import React from "react"
import { Input as RACInput } from "react-aria-components/Input"
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult
} from "react-aria-components/TextField"
import { Description, FieldError, Label } from "./Field"
import { composeTailwindRenderProps } from "./utils"

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string
  description?: string
  placeholder?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

const inputClass =
  "h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground transition-[color,box-shadow,background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 forced-colors:bg-[Field] [-webkit-tap-highlight-color:transparent]"

export function TextField({
  label,
  description,
  errorMessage,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      data-slot="field"
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5"
      )}
    >
      {label && <Label>{label}</Label>}
      <RACInput
        data-slot="input"
        placeholder={props.placeholder}
        className={inputClass}
      />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  )
}
