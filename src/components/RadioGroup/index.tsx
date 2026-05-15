"use client"

import React, { type ReactNode } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioProps,
  type ValidationResult
} from "react-aria-components/RadioGroup"
import { tv } from "tailwind-variants"
import { composeTailwindRenderProps } from "@/utils"
import { Description, FieldError, Label } from "../Field"

export interface RadioGroupProps extends Omit<RACRadioGroupProps, "children"> {
  children?: ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  label?: string
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <RACRadioGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group/radio-group flex flex-col gap-2"
      )}
      data-slot="radio-group"
    >
      <Label>{props.label}</Label>
      <div className="group-orientation-vertical:flex-col group-orientation-horizontal:gap-4 flex gap-2">
        {props.children}
      </div>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </RACRadioGroup>
  )
}

const circleStyles = tv({
  base: "focus-visible:border-ring focus-visible:ring-ring/30 group-invalid/radio-group:border-destructive group-invalid/radio-group:ring-destructive/20 flex size-4 shrink-0 items-center justify-center rounded-full border transition-[color,box-shadow,background-color] group-invalid/radio-group:ring-3 focus-visible:ring-3",
  variants: {
    isDisabled: {
      true: "forced-colors:border-[GrayText]!"
    },
    isSelected: {
      false: "border-input bg-background",
      true: "bg-primary border-transparent forced-colors:bg-[Highlight]!"
    }
  }
})

export function Radio(props: RadioProps) {
  return (
    <RACRadio
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group/radio flex relative gap-2 items-center text-foreground text-sm transition disabled:pointer-events-none disabled:opacity-50 forced-colors:disabled:text-[GrayText] [-webkit-tap-highlight-color:transparent]"
      )}
      data-slot="radio"
    >
      {composeRenderProps(
        props.children,
        (children, { isDisabled, isFocusVisible, isSelected }) => (
          <>
            <div
              className={circleStyles({
                isDisabled,
                isSelected
              })}
            >
              {isSelected && (
                <span className="bg-primary-foreground size-2 rounded-full forced-colors:bg-[HighlightText]" />
              )}
            </div>
            {children}
          </>
        )
      )}
    </RACRadio>
  )
}
