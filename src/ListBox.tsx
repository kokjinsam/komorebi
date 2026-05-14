"use client"

import { CheckIcon } from "@phosphor-icons/react"
import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxSection,
  Header,
  Collection,
  type ListBoxProps as AriaListBoxProps,
  type ListBoxItemProps,
  type ListBoxSectionProps
} from "react-aria-components/ListBox"
import { tv } from "tailwind-variants"
import { composeTailwindRenderProps, focusRing } from "./utils"

interface ListBoxProps<T> extends Omit<
  AriaListBoxProps<T>,
  "layout" | "orientation"
> {}

export function ListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "outline-0 p-1 w-50 bg-popover border border-border rounded-lg font-sans"
      )}
    >
      {children}
    </AriaListBox>
  )
}

export const itemStyles = tv({
  extend: focusRing,
  base: "group relative flex cursor-default items-center gap-8 rounded-md px-2.5 py-1.5 text-sm will-change-transform forced-color-adjust-none select-none",
  variants: {
    isSelected: {
      false:
        "pressed:bg-[color-mix(in_oklch,var(--accent),var(--foreground)_8%)] text-popover-foreground -outline-offset-2 hover:bg-accent hover:text-accent-foreground",
      true: "bg-primary text-primary-foreground -outline-offset-4 outline-primary-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:outline-[HighlightText] [&+[data-selected]]:rounded-t-none [&:has(+[data-selected])]:rounded-b-none"
    },
    isDisabled: {
      true: "text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

export function ListBoxItem(props: ListBoxItemProps) {
  let textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, (children) => (
        <>
          {children}
          <div className="absolute right-4 bottom-0 left-4 hidden h-px bg-primary-foreground/20 forced-colors:bg-[HighlightText] [.group[data-selected]:has(+[data-selected])_&]:block" />
        </>
      ))}
    </AriaListBoxItem>
  )
}

export const dropdownItemStyles = tv({
  base: "group selected:pr-1 flex cursor-default items-center gap-4 rounded-lg py-2 pr-3 pl-3 text-sm no-underline outline-0 forced-color-adjust-none select-none [-webkit-tap-highlight-color:transparent] [&[href]]:cursor-pointer",
  variants: {
    isDisabled: {
      false: "text-foreground",
      true: "text-muted-foreground forced-colors:text-[GrayText]"
    },
    isPressed: {
      true: "bg-muted"
    },
    isFocused: {
      true: "bg-accent text-accent-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
    }
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: "bg-muted/60"
    }
  ]
})

export function DropdownItem(props: ListBoxItemProps) {
  let textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)
  return (
    <AriaListBoxItem
      {...props}
      textValue={textValue}
      className={dropdownItemStyles}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
            {children}
          </span>
          <span className="flex w-5 items-center">
            {isSelected && <CheckIcon className="h-4 w-4" />}
          </span>
        </>
      ))}
    </AriaListBoxItem>
  )
}

export interface DropdownSectionProps<T> extends ListBoxSectionProps<T> {
  title?: string
  items?: any
}

export function DropdownSection<T extends object>(
  props: DropdownSectionProps<T>
) {
  return (
    <ListBoxSection className="first:-mt-1.25last:after:hidden after:block after:h-1.25 after:content-['']">
      <Header className="sticky -top-1.25 z-10 -mx-1 -mt-px truncate border-y border-y-border bg-muted/60 px-4 py-1 text-sm font-semibold text-muted-foreground backdrop-blur-md supports-[-moz-appearance:none]:bg-muted [&+*]:mt-1">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  )
}
