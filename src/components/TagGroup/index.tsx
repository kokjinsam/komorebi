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
import { Description, Label } from "../Field"

type Variant = "default" | "secondary" | "outline" | "destructive" | "ghost"
const VariantContext = createContext<Variant>("default")

const variantClasses: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  destructive:
    "bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
  ghost: "text-foreground hover:bg-muted dark:hover:bg-muted/50",
  outline: "border-border text-foreground hover:bg-muted",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
}

const tagStyles = tv({
  base: "group/tag focus-visible:border-ring focus-visible:ring-ring/30 flex max-w-fit cursor-default items-center gap-1 rounded-3xl border border-transparent bg-clip-padding px-2.5 py-0.5 text-xs font-medium transition outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-3",
  variants: {
    allowsRemoving: {
      true: "pr-1"
    },
    isDisabled: {
      true: "pointer-events-none opacity-50 forced-colors:text-[GrayText]"
    },
    isSelected: {
      true: "bg-primary text-primary-foreground ring-primary-foreground/20 ring-2 forced-color-adjust-none forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
    },
    variant: {
      default: "",
      destructive: "",
      ghost: "",
      outline: "border-border",
      secondary: ""
    }
  }
})

export interface TagGroupProps<T>
  extends
    Omit<AriaTagGroupProps, "children">,
    Pick<TagListProps<T>, "items" | "children" | "renderEmptyState"> {
  description?: string
  errorMessage?: string
  label?: string
  variant?: Variant
}

export interface TagProps extends AriaTagProps {
  variant?: Variant
}

export function TagGroup<T extends object>({
  children,
  description,
  errorMessage,
  items,
  label,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) {
  return (
    <AriaTagGroup
      {...props}
      className={twMerge(
        "group/tag-group flex flex-col gap-2",
        props.className
      )}
      data-slot="tag-group"
    >
      <Label>{label}</Label>
      <VariantContext.Provider value={props.variant || "default"}>
        <TagList
          className="flex flex-wrap gap-1"
          items={items}
          renderEmptyState={renderEmptyState}
        >
          {children}
        </TagList>
      </VariantContext.Provider>
      {description && <Description>{description}</Description>}
      {errorMessage && (
        <Text className="text-destructive text-sm" slot="errorMessage">
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
  const textValue = typeof children === "string" ? children : undefined
  const groupVariant = useContext(VariantContext)
  const resolvedVariant = variant || groupVariant

  return (
    <AriaTag
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        twMerge(
          tagStyles({ ...renderProps, className, variant: resolvedVariant }),
          !renderProps.isSelected && variantClasses[resolvedVariant]
        )
      )}
      data-slot="tag"
      data-variant={resolvedVariant}
    >
      {composeRenderProps(children, (children, { allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button className={removeButtonStyles} slot="remove">
              <XIcon aria-hidden className="size-3" />
            </Button>
          )}
        </>
      ))}
    </AriaTag>
  )
}
