"use client"

import { XIcon } from "@phosphor-icons/react"
import React, { createContext, useContext } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  type TagProps as AriaTagProps,
  Button,
  TagList,
  type TagListProps,
  Text
} from "react-aria-components/TagGroup"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"
import { Description, Label } from "./Field"

type Variant = "default" | "secondary" | "outline" | "destructive" | "ghost"
const VariantContext = createContext<Variant>("default")

const variantClasses: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border-border text-foreground hover:bg-muted",
  destructive:
    "bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
  ghost: "text-foreground hover:bg-muted dark:hover:bg-muted/50"
}

const tagStyles = tv({
  base: "group/tag focus-visible:border-ring focus-visible:ring-ring/30 flex max-w-fit cursor-default items-center gap-1 rounded-3xl border border-transparent bg-clip-padding px-2.5 py-0.5 text-xs font-medium transition outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-3",
  variants: {
    variant: {
      default: "",
      secondary: "",
      outline: "border-border",
      destructive: "",
      ghost: ""
    },
    allowsRemoving: {
      true: "pr-1"
    },
    isSelected: {
      true: "bg-primary text-primary-foreground ring-primary-foreground/20 ring-2 forced-color-adjust-none forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
    },
    isDisabled: {
      true: "pointer-events-none opacity-50 forced-colors:text-[GrayText]"
    }
  }
})

export interface TagGroupProps<T>
  extends
    Omit<AriaTagGroupProps, "children">,
    Pick<TagListProps<T>, "items" | "children" | "renderEmptyState"> {
  variant?: Variant
  label?: string
  description?: string
  errorMessage?: string
}

export interface TagProps extends AriaTagProps {
  variant?: Variant
}

export function TagGroup<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) {
  return (
    <AriaTagGroup
      {...props}
      data-slot="tag-group"
      className={twMerge(
        "group/tag-group flex flex-col gap-2",
        props.className
      )}
    >
      <Label>{label}</Label>
      <VariantContext.Provider value={props.variant || "default"}>
        <TagList
          items={items}
          renderEmptyState={renderEmptyState}
          className="flex flex-wrap gap-1"
        >
          {children}
        </TagList>
      </VariantContext.Provider>
      {description && <Description>{description}</Description>}
      {errorMessage && (
        <Text slot="errorMessage" className="text-destructive text-sm">
          {errorMessage}
        </Text>
      )}
    </AriaTagGroup>
  )
}

const removeButtonStyles = tv({
  base: "pressed:bg-foreground/20 hover:bg-foreground/10 focus-visible:ring-ring/30 flex cursor-default items-center justify-center rounded-full border-0 bg-transparent p-0.5 text-[inherit] transition-colors outline-none focus-visible:ring-2"
})

export function Tag({ children, variant, ...props }: TagProps) {
  let textValue = typeof children === "string" ? children : undefined
  let groupVariant = useContext(VariantContext)
  let resolvedVariant = variant || groupVariant

  return (
    <AriaTag
      textValue={textValue}
      {...props}
      data-slot="tag"
      data-variant={resolvedVariant}
      className={composeRenderProps(props.className, (className, renderProps) =>
        twMerge(
          tagStyles({ ...renderProps, variant: resolvedVariant, className }),
          !renderProps.isSelected && variantClasses[resolvedVariant]
        )
      )}
    >
      {composeRenderProps(children, (children, { allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button slot="remove" className={removeButtonStyles}>
              <XIcon aria-hidden className="size-3" />
            </Button>
          )}
        </>
      ))}
    </AriaTag>
  )
}
