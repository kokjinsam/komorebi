"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  type ToggleButtonGroupProps
} from "react-aria-components/ToggleButtonGroup"
import { tv } from "tailwind-variants"

const styles = tv({
  base: "group/toggle-button-group flex gap-1",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col"
    }
  }
})

export function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  return (
    <RACToggleButtonGroup
      {...props}
      data-slot="toggle-button-group"
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className })
      )}
    />
  )
}
