"use client"

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
import React from "react"
import {
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult
} from "react-aria-components/SearchField"
import { Description, FieldError, FieldGroup, Input, Label } from "./Field"
import { FieldButton } from "./FieldButton"
import { composeTailwindRenderProps } from "./utils"

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  placeholder?: string
}

export function SearchField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      data-slot="field"
      className={composeTailwindRenderProps(
        props.className,
        "group/field flex flex-col gap-1.5 min-w-10 max-w-full"
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup data-slot="search-field">
        <MagnifyingGlassIcon
          aria-hidden
          className="text-muted-foreground ml-3 size-4 shrink-0"
        />
        <Input
          placeholder={placeholder}
          className="[&::-webkit-search-cancel-button]:hidden"
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
