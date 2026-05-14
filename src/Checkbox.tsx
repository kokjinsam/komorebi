"use client"

import { CheckIcon, MinusIcon } from "@phosphor-icons/react"
import React from "react"
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps
} from "react-aria-components/Checkbox"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { tv } from "tailwind-variants"

const checkboxStyles = tv({
  base: "group/checkbox relative flex items-center gap-2 text-sm transition [-webkit-tap-highlight-color:transparent] disabled:pointer-events-none disabled:opacity-50",
  variants: {
    isDisabled: {
      false: "text-foreground",
      true: "text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

const boxStyles = tv({
  base: "flex size-4 shrink-0 items-center justify-center rounded-md border transition-[color,box-shadow,background-color] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 group-invalid/checkbox:border-destructive group-invalid/checkbox:ring-3 group-invalid/checkbox:ring-destructive/20",
  variants: {
    isSelected: {
      false: "border-input bg-background",
      true: "border-transparent bg-primary forced-colors:bg-[Highlight]!"
    },
    isDisabled: {
      true: "forced-colors:border-[GrayText]!"
    }
  }
})

const iconStyles = "size-3 text-primary-foreground forced-colors:text-[HighlightText] pointer-events-none"

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      data-slot="checkbox"
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className })
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { isSelected, isIndeterminate, isFocusVisible, isDisabled }) => (
          <>
            <div
              className={boxStyles({
                isSelected: isSelected || isIndeterminate,
                isDisabled,
                isFocusVisible
              } as any)}
            >
              {isIndeterminate ? (
                <MinusIcon aria-hidden className={iconStyles} />
              ) : isSelected ? (
                <CheckIcon aria-hidden className={iconStyles} />
              ) : null}
            </div>
            {children}
          </>
        )
      )}
    </AriaCheckbox>
  )
}
