"use client"

import { CaretDownIcon } from "@phosphor-icons/react"
import React from "react"
import {
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  Button,
  ListBox,
  type ListBoxItemProps,
  SelectValue,
  type ValidationResult
} from "react-aria-components/Select"
import { Description, FieldError, Label } from "./Field"
import {
  DropdownItem,
  DropdownSection,
  type DropdownSectionProps
} from "./ListBox"
import { Popover } from "./Popover"
import { composeTailwindRenderProps } from "./utils"

export interface SelectProps<
  T extends object,
  M extends "single" | "multiple"
> extends Omit<AriaSelectProps<T, M>, "children"> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
}

export function Select<
  T extends object,
  M extends "single" | "multiple" = "single"
>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T, M>) {
  return (
    <AriaSelect
      {...props}
      data-slot="field"
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5 relative"
      )}
    >
      {label && <Label>{label}</Label>}
      <Button
        data-slot="select-trigger"
        className="bg-input/50 focus-visible:border-ring focus-visible:ring-ring/30 group-invalid/field:border-destructive group-invalid/field:ring-destructive/20 dark:group-invalid/field:ring-destructive/40 flex h-9 w-full min-w-[180px] cursor-default items-center gap-2 rounded-3xl border border-transparent px-3 text-start text-sm transition-[color,box-shadow,background-color] outline-none [-webkit-tap-highlight-color:transparent] group-invalid/field:ring-3 focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50"
      >
        <SelectValue className="text-foreground placeholder-shown:text-muted-foreground flex-1 text-sm">
          {({ selectedText, defaultChildren }) =>
            selectedText || defaultChildren
          }
        </SelectValue>
        <CaretDownIcon
          aria-hidden
          className="text-muted-foreground size-4 shrink-0"
        />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-(--trigger-width)">
        <ListBox
          items={items}
          className="box-border max-h-[inherit] overflow-auto p-1 outline-hidden"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />
}

export function SelectSection<T extends object>(
  props: DropdownSectionProps<T>
) {
  return <DropdownSection {...props} />
}
