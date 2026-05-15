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
  base: "focus-visible:border-ring focus-visible:ring-ring/30 group-invalid/checkbox:border-destructive group-invalid/checkbox:ring-destructive/20 flex size-4 shrink-0 items-center justify-center rounded-md border transition-[color,box-shadow,background-color] group-invalid/checkbox:ring-3 focus-visible:ring-3",
  variants: {
    isDisabled: {
      true: "forced-colors:border-[GrayText]!"
    },
    isSelected: {
      false: "border-input bg-background",
      true: "bg-primary border-transparent forced-colors:bg-[Highlight]!"
    }
  }
})

const iconStyles =
  "size-3 text-primary-foreground forced-colors:text-[HighlightText] pointer-events-none"

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className })
      )}
      data-slot="checkbox"
    >
      {composeRenderProps(
        props.children,
        (
          children,
          { isDisabled, isFocusVisible, isIndeterminate, isSelected }
        ) => (
          <>
            <div
              className={boxStyles({
                isDisabled,
                isSelected: isSelected || isIndeterminate
              })}
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
