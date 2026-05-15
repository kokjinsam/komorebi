"use client"

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
import React from "react"
import {
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult
} from "react-aria-components/SearchField"
import { composeTailwindRenderProps } from "@/utils"
import { Description, FieldError, FieldGroup, Input, Label } from "../Field"
import { FieldButton } from "../FieldButton"

export interface SearchFieldProps extends AriaSearchFieldProps {
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  label?: string
  placeholder?: string
}

export function SearchField({
  description,
  errorMessage,
  label,
  placeholder,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5 min-w-10 max-w-full"
      )}
      data-slot="field"
    >
      {label && <Label>{label}</Label>}
      <FieldGroup data-slot="search-field">
        <MagnifyingGlassIcon
          aria-hidden
          className="text-muted-foreground ml-3 size-4 shrink-0"
        />
        <Input
          className="[&::-webkit-search-cancel-button]:hidden"
          placeholder={placeholder}
        />
        <FieldButton className="mr-1 group-empty:invisible">
          <XIcon aria-hidden className="size-4" />
        </FieldButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaSearchField>
  )
}
