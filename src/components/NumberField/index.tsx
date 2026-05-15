"use client"

import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"
import React from "react"
import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  Button,
  type ButtonProps,
  type ValidationResult
} from "react-aria-components/NumberField"
import { composeTailwindRenderProps } from "@/utils"
import { Description, FieldError, FieldGroup, Input, Label } from "../Field"

export interface NumberFieldProps extends AriaNumberFieldProps {
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  label?: string
  placeholder?: string
}

export function NumberField({
  description,
  errorMessage,
  label,
  placeholder,
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5"
      )}
      data-slot="field"
    >
      <Label>{label}</Label>
      <FieldGroup data-slot="number-field">
        <Input className="w-20" placeholder={placeholder} />
        <div className="border-input/30 flex h-full flex-col border-s">
          <StepperButton slot="increment">
            <CaretUpIcon aria-hidden className="size-4" />
          </StepperButton>
          <div className="border-input/30 border-b" />
          <StepperButton slot="decrement">
            <CaretDownIcon aria-hidden className="size-4" />
          </StepperButton>
        </div>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaNumberField>
  )
}

function StepperButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="pressed:bg-muted/80 text-muted-foreground hover:bg-muted/50 disabled:text-muted-foreground/50 flex flex-1 cursor-default items-center justify-center border-0 bg-transparent px-1.5 transition-colors [-webkit-tap-highlight-color:transparent]"
    />
  )
}
