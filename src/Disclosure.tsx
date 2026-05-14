"use client"

import { CaretRightIcon } from "@phosphor-icons/react"
import React, { useContext } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  DisclosureStateContext,
  Heading,
  type DisclosurePanelProps as AriaDisclosurePanelProps,
  type DisclosureProps as AriaDisclosureProps
} from "react-aria-components/Disclosure"
import { tv } from "tailwind-variants"
import { Button } from "./Button"
import { composeTailwindRenderProps } from "./utils"

const disclosure = tv({
  base: "group/disclosure min-w-50 rounded-2xl text-foreground"
})

const chevron = tv({
  base: "size-4 text-muted-foreground transition-transform duration-200 ease-in-out shrink-0",
  variants: {
    isExpanded: {
      true: "rotate-90 transform"
    }
  }
})

export interface DisclosureProps extends AriaDisclosureProps {
  children: React.ReactNode
}

export function Disclosure({ children, ...props }: DisclosureProps) {
  return (
    <AriaDisclosure
      {...props}
      data-slot="disclosure"
      className={composeRenderProps(props.className, (className, renderProps) =>
        disclosure({ ...renderProps, className })
      )}
    >
      {children}
    </AriaDisclosure>
  )
}

export interface DisclosureHeaderProps {
  children: React.ReactNode
}

export function DisclosureHeader({ children }: DisclosureHeaderProps) {
  let { isExpanded } = useContext(DisclosureStateContext)!
  return (
    <Heading className="m-0 text-base">
      <Button
        slot="trigger"
        variant="ghost"
        className="w-full justify-between rounded-2xl px-3 py-2 font-medium h-auto"
      >
        {({ isDisabled }) => (
          <>
            <span>{children}</span>
            <CaretRightIcon aria-hidden className={chevron({ isExpanded, isDisabled } as any)} />
          </>
        )}
      </Button>
    </Heading>
  )
}

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
  children: React.ReactNode
}

export function DisclosurePanel({ children, ...props }: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel
      {...props}
      data-slot="disclosure-panel"
      className={composeTailwindRenderProps(
        props.className,
        "h-(--disclosure-panel-height) motion-safe:transition-[height] overflow-clip"
      )}
    >
      <div className="px-3 py-2 text-sm text-foreground">{children}</div>
    </AriaDisclosurePanel>
  )
}
