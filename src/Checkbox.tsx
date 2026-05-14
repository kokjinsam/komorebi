"use client"

import { CheckIcon, MinusIcon } from "@phosphor-icons/react"
import React from "react"
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps
} from "react-aria-components/Checkbox"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { tv } from "tailwind-variants"
import { focusRing } from "./utils"

const checkboxStyles = tv({
  base: "group relative flex items-center gap-2 font-sans text-sm transition [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      false: "text-foreground",
      true: "text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

const boxStyles = tv({
  extend: focusRing,
  base: "box-border flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-sm border transition",
  variants: {
    isSelected: {
      false:
        "group-pressed:[--color:color-mix(in_oklch,var(--input),var(--foreground)_10%)] border-(--color) bg-background [--color:var(--input)]",
      true: "group-pressed:[--color:color-mix(in_oklch,var(--primary),var(--foreground)_10%)] border-(--color) bg-(--color) [--color:var(--primary)] forced-colors:[--color:Highlight]!"
    },
    isInvalid: {
      true: "group-pressed:[--color:color-mix(in_oklch,var(--destructive),var(--foreground)_10%)] [--color:var(--destructive)] forced-colors:[--color:Mark]!"
    },
    isDisabled: {
      true: "[--color:color-mix(in_oklch,var(--muted-foreground),transparent_50%)] forced-colors:[--color:GrayText]!"
    }
  }
})

const iconStyles =
  "w-3.5 h-3.5 text-primary-foreground group-disabled:text-muted-foreground forced-colors:text-[HighlightText] pointer-events-none"

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className })
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { isSelected, isIndeterminate, ...renderProps }) => (
          <>
            <div
              className={boxStyles({
                isSelected: isSelected || isIndeterminate,
                ...renderProps
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
