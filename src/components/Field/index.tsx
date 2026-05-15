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
import { composeTailwindRenderProps } from "@/utils"

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(
        "text-sm font-medium text-foreground cursor-default w-fit",
        props.className
      )}
      data-slot="field-label"
    />
  )
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      className={twMerge("text-sm text-muted-foreground", props.className)}
      data-slot="field-description"
      slot="description"
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
      data-slot="field-error"
    />
  )
}

export const fieldGroupBase =
  "group/field-group flex h-9 w-full items-center overflow-hidden rounded-3xl border border-transparent bg-input/50 transition-[color,box-shadow,background-color] outline-none focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 invalid:border-destructive invalid:ring-3 invalid:ring-destructive/20 dark:invalid:ring-destructive/40 disabled:pointer-events-none disabled:opacity-50 forced-colors:bg-[Field]"

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className) =>
        twMerge(fieldGroupBase, className)
      )}
      data-slot="field-group"
    />
  )
}

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex-1 min-w-0 bg-transparent px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground outline-none border-0 [-webkit-tap-highlight-color:transparent] disabled:text-muted-foreground"
      )}
      data-slot="input"
    />
  )
}
