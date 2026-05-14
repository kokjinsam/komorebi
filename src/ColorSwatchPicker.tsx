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
  base: "relative rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30 [-webkit-tap-highlight-color:transparent]"
})

export function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem {...props} data-slot="color-swatch-picker-item" className={itemStyles}>
      {({ isSelected }) => (
        <>
          <ColorSwatch />
          {isSelected && (
            <div className="absolute top-0 left-0 box-border size-full rounded-sm border border-foreground outline-2 outline-background forced-color-adjust-none" />
          )}
        </>
      )}
    </AriaColorSwatchPickerItem>
  )
}
