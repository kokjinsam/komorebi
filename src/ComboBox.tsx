"use client"

import { CaretDownIcon } from "@phosphor-icons/react"
import React from "react"
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ComboBoxValue,
  ListBox,
  type ListBoxItemProps,
  type ValidationResult
} from "react-aria-components/ComboBox"
import { Description, FieldError, FieldGroup, Input, Label } from "./Field"
import { FieldButton } from "./FieldButton"
import {
  DropdownItem,
  DropdownSection,
  type DropdownSectionProps
} from "./ListBox"
import { Popover } from "./Popover"
import { composeTailwindRenderProps } from "./utils"

export interface ComboBoxProps<T extends object, M extends "single" | "multiple">
  extends Omit<AriaComboBoxProps<T, M>, "children"> {
  label?: string
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  placeholder?: string
  children: React.ReactNode | ((item: T) => React.ReactNode)
}

export function ComboBox<T extends object, M extends "single" | "multiple" = "single">({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: ComboBoxProps<T, M>) {
  return (
    <AriaComboBox
      {...props}
      data-slot="field"
      className={composeTailwindRenderProps(props.className, "group/field flex flex-col gap-1.5")}
    >
      <Label>{label}</Label>
      <FieldGroup data-slot="combobox">
        <Input className="ps-3 pe-1" placeholder={props.placeholder} />
        <FieldButton className="mr-1">
          <CaretDownIcon aria-hidden className="size-4" />
        </FieldButton>
      </FieldGroup>
      {props.selectionMode === "multiple" && (
        <ComboBoxValue placeholder="No items selected" className="text-xs text-muted-foreground" />
      )}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="w-(--trigger-width)">
        <ListBox
          items={items}
          className="box-border max-h-[inherit] overflow-auto p-1 outline-hidden"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaComboBox>
  )
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />
}

export function ComboBoxSection<T extends object>(props: DropdownSectionProps<T>) {
  return <DropdownSection {...props} />
}
