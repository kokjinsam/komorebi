"use client"

import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react"
import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuProps,
  type MenuItemProps,
  MenuSection as AriaMenuSection,
  type MenuSectionProps as AriaMenuSectionProps,
  MenuTrigger as AriaMenuTrigger,
  SubmenuTrigger as AriaSubmenuTrigger,
  Separator,
  type SeparatorProps,
  Header,
  Collection,
  type SubmenuTriggerProps,
  type MenuTriggerProps as AriaMenuTriggerProps
} from "react-aria-components/Menu"
import { dropdownItemStyles } from "../ListBox"
import { Popover, type PopoverProps } from "../Popover"

export function Menu<T extends object>(props: MenuProps<T>) {
  return (
    <AriaMenu
      {...props}
      className="max-h-[inherit] overflow-auto p-1 outline-none"
      data-slot="menu"
    />
  )
}

export function MenuItem(props: MenuItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)
  return (
    <AriaMenuItem
      textValue={textValue}
      {...props}
      className={dropdownItemStyles}
      data-slot="menu-item"
    >
      {composeRenderProps(
        props.children,
        (children, { hasSubmenu, isSelected, selectionMode }) => (
          <>
            {selectionMode !== "none" && (
              <span className="flex w-4 items-center">
                {isSelected && (
                  <CheckIcon aria-hidden className="size-4" weight="fill" />
                )}
              </span>
            )}
            <span className="group-selected/menu-item:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
              {children}
            </span>
            {hasSubmenu && (
              <CaretRightIcon
                aria-hidden
                className="text-muted-foreground absolute right-2 size-4"
              />
            )}
          </>
        )
      )}
    </AriaMenuItem>
  )
}

export function MenuSeparator(props: SeparatorProps) {
  return <Separator {...props} className="bg-border mx-2 my-1 h-px" />
}

export interface MenuSectionProps<T> extends AriaMenuSectionProps<T> {
  items?: Iterable<T>
  title?: string
}

export function MenuSection<T extends object>(props: MenuSectionProps<T>) {
  return (
    <AriaMenuSection
      {...props}
      className="after:block after:h-1 after:content-[''] first:-mt-1"
    >
      {props.title && (
        <Header className="border-y-border bg-muted/60 text-muted-foreground sticky -top-1 z-10 -mx-1 -mt-px truncate border-y px-4 py-1 text-xs font-medium [&+*]:mt-1">
          {props.title}
        </Header>
      )}
      <Collection items={props.items}>{props.children}</Collection>
    </AriaMenuSection>
  )
}

interface MenuTriggerProps extends AriaMenuTriggerProps {
  placement?: PopoverProps["placement"]
}

export function MenuTrigger(props: MenuTriggerProps) {
  const [trigger, menu] = React.Children.toArray(props.children) as [
    React.ReactElement,
    React.ReactElement
  ]
  return (
    <AriaMenuTrigger {...props}>
      {trigger}
      <Popover className="min-w-37.5 p-1" placement={props.placement}>
        {menu}
      </Popover>
    </AriaMenuTrigger>
  )
}

export function SubmenuTrigger(props: SubmenuTriggerProps) {
  const [trigger, menu] = React.Children.toArray(props.children) as [
    React.ReactElement,
    React.ReactElement
  ]
  return (
    <AriaSubmenuTrigger {...props}>
      {trigger}
      <Popover className="min-w-37.5 p-1" crossOffset={-4} offset={-2}>
        {menu}
      </Popover>
    </AriaSubmenuTrigger>
  )
}
