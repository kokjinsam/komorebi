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
  base: "group/disclosure text-foreground min-w-50 rounded-2xl"
})

const chevron = tv({
  base: "text-muted-foreground size-4 shrink-0 transition-transform duration-200 ease-in-out",
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
        className="h-auto w-full justify-between rounded-2xl px-3 py-2 font-medium"
      >
        {({ isDisabled }) => (
          <>
            <span>{children}</span>
            <CaretRightIcon
              aria-hidden
              className={chevron({ isExpanded, isDisabled } as any)}
            />
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
      <div className="text-foreground px-3 py-2 text-sm">{children}</div>
    </AriaDisclosurePanel>
  )
}
