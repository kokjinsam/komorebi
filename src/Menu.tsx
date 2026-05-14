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
import { dropdownItemStyles } from "./ListBox"
import { Popover, type PopoverProps } from "./Popover"

export function Menu<T extends object>(props: MenuProps<T>) {
  return (
    <AriaMenu
      {...props}
      data-slot="menu"
      className="max-h-[inherit] overflow-auto p-1 outline-none"
    />
  )
}

export function MenuItem(props: MenuItemProps) {
  let textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)
  return (
    <AriaMenuItem
      textValue={textValue}
      {...props}
      data-slot="menu-item"
      className={dropdownItemStyles}
    >
      {composeRenderProps(
        props.children,
        (children, { selectionMode, isSelected, hasSubmenu }) => (
          <>
            {selectionMode !== "none" && (
              <span className="flex w-4 items-center">
                {isSelected && (
                  <CheckIcon weight="fill" aria-hidden className="size-4" />
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
  title?: string
  items?: any
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
  let [trigger, menu] = React.Children.toArray(props.children) as [
    React.ReactElement,
    React.ReactElement
  ]
  return (
    <AriaMenuTrigger {...props}>
      {trigger}
      <Popover placement={props.placement} className="min-w-37.5 p-1">
        {menu}
      </Popover>
    </AriaMenuTrigger>
  )
}

export function SubmenuTrigger(props: SubmenuTriggerProps) {
  let [trigger, menu] = React.Children.toArray(props.children) as [
    React.ReactElement,
    React.ReactElement
  ]
  return (
    <AriaSubmenuTrigger {...props}>
      {trigger}
      <Popover offset={-2} crossOffset={-4} className="min-w-37.5 p-1">
        {menu}
      </Popover>
    </AriaSubmenuTrigger>
  )
}
