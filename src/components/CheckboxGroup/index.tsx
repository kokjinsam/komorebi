"use client"

import React, { type ReactNode } from "react"
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type ValidationResult
} from "react-aria-components/CheckboxGroup"
import { Description, FieldError, Label } from "./Field"
import { composeTailwindRenderProps } from "./utils"

export interface CheckboxGroupProps extends Omit<
  AriaCheckboxGroupProps,
  "children"
> {
  label?: string
  children?: ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      data-slot="checkbox-group"
      className={composeTailwindRenderProps(
        props.className,
        "group/checkbox-group flex flex-col gap-2"
      )}
    >
      <Label>{props.label}</Label>
      {props.children}
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaCheckboxGroup>
  )
}
