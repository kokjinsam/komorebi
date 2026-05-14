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
import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
  fieldBorderStyles
} from "./Field"
import { composeTailwindRenderProps } from "./utils"

export interface NumberFieldProps extends AriaNumberFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  placeholder?: string
}

export function NumberField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1 font-sans"
      )}
    >
      <Label>{label}</Label>
      <FieldGroup>
        {(renderProps) => (
          <>
            <Input className="w-20" placeholder={placeholder} />
            <div
              className={fieldBorderStyles({
                ...renderProps,
                class: "flex flex-col border-s h-full"
              })}
            >
              <StepperButton slot="increment">
                <CaretUpIcon aria-hidden className="h-4 w-4" />
              </StepperButton>
              <div
                className={fieldBorderStyles({
                  ...renderProps,
                  class: "border-b"
                })}
              />
              <StepperButton slot="decrement">
                <CaretDownIcon aria-hidden className="h-4 w-4" />
              </StepperButton>
            </div>
          </>
        )}
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
      className="pressed:bg-muted box-border flex flex-1 cursor-default border-0 bg-transparent px-0.5 py-0 text-muted-foreground [-webkit-tap-highlight-color:transparent] group-disabled:text-muted-foreground forced-colors:group-disabled:text-[GrayText]"
    />
  )
}
