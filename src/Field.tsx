"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  type FieldErrorProps,
  FieldError as RACFieldError
} from "react-aria-components/FieldError"
import { Group, type GroupProps } from "react-aria-components/Group"
import { type InputProps, Input as RACInput } from "react-aria-components/Input"
import { type LabelProps, Label as RACLabel } from "react-aria-components/Label"
import { Text, type TextProps } from "react-aria-components/Text"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"
import { composeTailwindRenderProps, focusRing } from "./utils"

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(
        "font-sans text-sm text-foreground font-medium cursor-default w-fit",
        props.className
      )}
    />
  )
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge("text-sm text-muted-foreground", props.className)}
    />
  )
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "text-sm text-destructive forced-colors:text-[Mark]"
      )}
    />
  )
}

export const fieldBorderStyles = tv({
  base: "transition",
  variants: {
    isFocusWithin: {
      false:
        "border-input hover:border-[color-mix(in_oklch,var(--input),var(--foreground)_8%)] forced-colors:border-[ButtonBorder]",
      true: "border-ring forced-colors:border-[Highlight]"
    },
    isInvalid: {
      true: "border-destructive forced-colors:border-[Mark]"
    },
    isDisabled: {
      true: "border-input opacity-50 forced-colors:border-[GrayText]"
    }
  }
})

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: "group box-border flex h-9 items-center overflow-hidden rounded-lg border bg-background transition forced-colors:bg-[Field]",
  variants: fieldBorderStyles.variants
})

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className })
      )}
    />
  )
}

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "px-3 py-0 min-h-9 flex-1 min-w-0 border-0 outline-0 bg-background font-sans text-sm text-foreground placeholder:text-muted-foreground disabled:text-muted-foreground disabled:placeholder:text-muted-foreground [-webkit-tap-highlight-color:transparent]"
      )}
    />
  )
}
