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
import { Description, FieldError, Label } from "./Field"
import { composeTailwindRenderProps, focusRing } from "./utils"

export interface RadioGroupProps extends Omit<RACRadioGroupProps, "children"> {
  label?: string
  children?: ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <RACRadioGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-2 font-sans"
      )}
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

const styles = tv({
  extend: focusRing,
  base: "box-border h-4.5 w-4.5 rounded-full border bg-background transition-all",
  variants: {
    isSelected: {
      false:
        "group-pressed:border-[color-mix(in_oklch,var(--input),var(--foreground)_10%)] border-input",
      true: "group-pressed:border-[color-mix(in_oklch,var(--primary),var(--foreground)_10%)] border-[calc(var(--spacing)*1.5)] border-primary forced-colors:border-[Highlight]!"
    },
    isInvalid: {
      true: "group-pressed:border-[color-mix(in_oklch,var(--destructive),var(--foreground)_10%)] border-destructive forced-colors:border-[Mark]!"
    },
    isDisabled: {
      true: "border-input opacity-50 forced-colors:border-[GrayText]!"
    }
  }
})

export function Radio(props: RadioProps) {
  return (
    <RACRadio
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex relative gap-2 items-center group text-foreground disabled:text-muted-foreground forced-colors:disabled:text-[GrayText] text-sm transition [-webkit-tap-highlight-color:transparent]"
      )}
    >
      {composeRenderProps(props.children, (children, renderProps) => (
        <>
          <div className={styles(renderProps)} />
          {children}
        </>
      ))}
    </RACRadio>
  )
}
