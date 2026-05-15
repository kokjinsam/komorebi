"use client"

import React, { type ReactNode } from "react"
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type ValidationResult
} from "react-aria-components/CheckboxGroup"
import { composeTailwindRenderProps } from "@/utils"
import { Description, FieldError, Label } from "../Field"

export interface CheckboxGroupProps extends Omit<
  AriaCheckboxGroupProps,
  "children"
> {
  children?: ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  label?: string
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group/checkbox-group flex flex-col gap-2"
      )}
      data-slot="checkbox-group"
    >
      <Label>{props.label}</Label>
      {props.children}
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaCheckboxGroup>
  )
}
