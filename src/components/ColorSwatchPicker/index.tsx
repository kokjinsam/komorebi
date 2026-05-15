"use client"

import React from "react"
import {
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  type ColorSwatchPickerItemProps,
  type ColorSwatchPickerProps
} from "react-aria-components/ColorSwatchPicker"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { tv } from "tailwind-variants"
import { ColorSwatch } from "./ColorSwatch"

const pickerStyles = tv({
  base: "flex gap-1",
  variants: {
    layout: {
      stack: "flex-col",
      grid: "flex-wrap"
    }
  }
})

export function ColorSwatchPicker({
  children,
  ...props
}: Omit<ColorSwatchPickerProps, "layout">) {
  return (
    <AriaColorSwatchPicker
      {...props}
      data-slot="color-swatch-picker"
      className={composeRenderProps(props.className, (className, renderProps) =>
        pickerStyles({ ...renderProps, className })
      )}
    >
      {children}
    </AriaColorSwatchPicker>
  )
}

const itemStyles = tv({
  base: "focus-visible:ring-ring/30 relative rounded-sm outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-2"
})

export function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem
      {...props}
      data-slot="color-swatch-picker-item"
      className={itemStyles}
    >
      {({ isSelected }) => (
        <>
          <ColorSwatch />
          {isSelected && (
            <div className="border-foreground outline-background absolute top-0 left-0 box-border size-full rounded-sm border outline-2 forced-color-adjust-none" />
          )}
        </>
      )}
    </AriaColorSwatchPickerItem>
  )
}
