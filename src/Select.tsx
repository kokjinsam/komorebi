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
import { tv } from "tailwind-variants"
import { Description, FieldError, Label } from "./Field"
import {
  DropdownItem,
  DropdownSection,
  type DropdownSectionProps
} from "./ListBox"
import { Popover } from "./Popover"
import { composeTailwindRenderProps, focusRing } from "./utils"

const styles = tv({
  extend: focusRing,
  base: "flex h-9 w-full min-w-[180px] cursor-default items-center gap-4 rounded-lg border border-input bg-secondary pr-2 pl-3 text-start font-sans transition [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      false:
        "pressed:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_16%)] text-secondary-foreground group-invalid:outline group-invalid:outline-destructive hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_8%)] forced-colors:group-invalid:outline-[Mark]",
      true: "border-transparent bg-muted text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

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
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1 relative font-sans"
      )}
    >
      {label && <Label>{label}</Label>}
      <Button className={styles}>
        <SelectValue className="flex-1 text-sm">
          {({ selectedText, defaultChildren }) =>
            selectedText || defaultChildren
          }
        </SelectValue>
        <CaretDownIcon
          aria-hidden
          className="h-4 w-4 text-muted-foreground group-disabled:text-muted-foreground forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"
        />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-(--trigger-width)">
        <ListBox
          items={items}
          className="box-border max-h-[inherit] overflow-auto p-1 outline-hidden [clip-path:inset(0_0_0_0_round_.75rem)]"
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
