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
import { focusRing } from "./utils"

const colors = {
  neutral:
    "bg-background text-muted-foreground border-border hover:border-[color-mix(in_oklch,var(--border),var(--foreground)_20%)]",
  danger:
    "bg-[color-mix(in_oklch,var(--destructive),transparent_85%)] text-destructive border-[color-mix(in_oklch,var(--destructive),transparent_75%)] hover:border-[color-mix(in_oklch,var(--destructive),transparent_60%)]",
  chart1:
    "bg-[color-mix(in_oklch,var(--chart-1),transparent_85%)] text-[color-mix(in_oklch,var(--chart-1),var(--foreground)_50%)] border-[color-mix(in_oklch,var(--chart-1),transparent_75%)] hover:border-[color-mix(in_oklch,var(--chart-1),transparent_60%)]",
  chart3:
    "bg-[color-mix(in_oklch,var(--chart-3),transparent_85%)] text-[color-mix(in_oklch,var(--chart-3),var(--foreground)_50%)] border-[color-mix(in_oklch,var(--chart-3),transparent_75%)] hover:border-[color-mix(in_oklch,var(--chart-3),transparent_60%)]",
  chart5:
    "bg-[color-mix(in_oklch,var(--chart-5),transparent_85%)] text-[color-mix(in_oklch,var(--chart-5),var(--foreground)_50%)] border-[color-mix(in_oklch,var(--chart-5),transparent_75%)] hover:border-[color-mix(in_oklch,var(--chart-5),transparent_60%)]"
}

type Color = keyof typeof colors
const ColorContext = createContext<Color>("neutral")

const tagStyles = tv({
  extend: focusRing,
  base: "flex max-w-fit cursor-default items-center gap-1 rounded-full border px-3 py-0.5 font-sans text-xs transition [-webkit-tap-highlight-color:transparent]",
  variants: {
    color: {
      neutral: "",
      danger: "",
      chart1: "",
      chart3: "",
      chart5: ""
    },
    allowsRemoving: {
      true: "pr-1"
    },
    isSelected: {
      true: "border-transparent bg-primary text-primary-foreground forced-color-adjust-none forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
    },
    isDisabled: {
      true: "bg-muted text-muted-foreground border-foreground/20 forced-colors:text-[GrayText]"
    }
  },
  compoundVariants: (Object.keys(colors) as Color[]).map((color) => ({
    isSelected: false,
    isDisabled: false,
    color,
    class: colors[color]
  }))
})

export interface TagGroupProps<T>
  extends
    Omit<AriaTagGroupProps, "children">,
    Pick<TagListProps<T>, "items" | "children" | "renderEmptyState"> {
  color?: Color
  label?: string
  description?: string
  errorMessage?: string
}

export interface TagProps extends AriaTagProps {
  color?: Color
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
      className={twMerge("flex flex-col gap-2 font-sans", props.className)}
    >
      <Label>{label}</Label>
      <ColorContext.Provider value={props.color || "neutral"}>
        <TagList
          items={items}
          renderEmptyState={renderEmptyState}
          className="flex flex-wrap gap-1"
        >
          {children}
        </TagList>
      </ColorContext.Provider>
      {description && <Description>{description}</Description>}
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-destructive">
          {errorMessage}
        </Text>
      )}
    </AriaTagGroup>
  )
}

const removeButtonStyles = tv({
  extend: focusRing,
  base: "pressed:bg-foreground/20 flex cursor-default items-center justify-center rounded-full border-0 bg-transparent p-0.5 text-[inherit] transition-[background-color] hover:bg-foreground/10"
})

export function Tag({ children, color, ...props }: TagProps) {
  let textValue = typeof children === "string" ? children : undefined
  let groupColor = useContext(ColorContext)
  return (
    <AriaTag
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tagStyles({ ...renderProps, className, color: color || groupColor })
      )}
    >
      {composeRenderProps(children, (children, { allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button slot="remove" className={removeButtonStyles}>
              <XIcon aria-hidden className="h-3 w-3" />
            </Button>
          )}
        </>
      ))}
    </AriaTag>
  )
}
