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
import { composeTailwindRenderProps } from "@/utils"

type ListBoxProps<T> = Omit<AriaListBoxProps<T>, "layout" | "orientation">

export function ListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "outline-0 p-1 w-50 rounded-3xl bg-popover border border-border shadow-md ring-1 ring-foreground/5 dark:ring-foreground/10"
      )}
      data-slot="listbox"
    >
      {children}
    </AriaListBox>
  )
}

export const itemStyles = tv({
  base: "group/listbox-option relative flex cursor-default items-center gap-2 rounded-2xl px-2.5 py-1.5 text-sm will-change-transform forced-color-adjust-none outline-none select-none [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      true: "pointer-events-none opacity-50 forced-colors:text-[GrayText]"
    },
    isSelected: {
      false:
        "text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      true: "bg-primary text-primary-foreground focus:bg-primary/90 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
    }
  }
})

export function ListBoxItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)
  return (
    <AriaListBoxItem {...props} className={itemStyles} textValue={textValue}>
      {composeRenderProps(props.children, (children) => (
        <>{children}</>
      ))}
    </AriaListBoxItem>
  )
}

export const dropdownItemStyles = tv({
  base: "group/menu-item [&_svg]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-2xl px-2.5 py-1.5 text-sm no-underline outline-0 forced-color-adjust-none select-none [-webkit-tap-highlight-color:transparent] [&_svg:not([class*='size-'])]:size-4 [&[href]]:cursor-pointer",
  compoundVariants: [
    {
      className: "bg-muted/60",
      isFocused: false,
      isOpen: true
    }
  ],
  variants: {
    isDisabled: {
      false: "text-foreground",
      true: "pointer-events-none opacity-50 forced-colors:text-[GrayText]"
    },
    isFocused: {
      true: "bg-accent text-accent-foreground [&_svg]:text-accent-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
    }
  }
})

export function DropdownItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)
  return (
    <AriaListBoxItem
      {...props}
      className={dropdownItemStyles}
      textValue={textValue}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="group-selected/menu-item:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
            {children}
          </span>
          <span className="flex w-5 items-center">
            {isSelected && <CheckIcon className="size-4" />}
          </span>
        </>
      ))}
    </AriaListBoxItem>
  )
}

export interface DropdownSectionProps<T> extends ListBoxSectionProps<T> {
  items?: Iterable<T>
  title?: string
}

export function DropdownSection<T extends object>(
  props: DropdownSectionProps<T>
) {
  return (
    <ListBoxSection className="after:block after:h-1 after:content-[''] first:-mt-1 last:after:hidden">
      <Header className="border-y-border bg-muted/60 text-muted-foreground sticky -top-1 z-10 -mx-1 -mt-px truncate border-y px-4 py-1 text-xs font-medium">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  )
}
