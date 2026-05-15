"use client"

import React from "react"
import { Button } from "react-aria-components/Button"
import {
  ColorPicker as AriaColorPicker,
  type ColorPickerProps as AriaColorPickerProps
} from "react-aria-components/ColorPicker"
import { DialogTrigger } from "react-aria-components/Dialog"
import { tv } from "tailwind-variants"
import { ColorArea } from "../ColorArea"
import { ColorField } from "../ColorField"
import { ColorSlider } from "../ColorSlider"
import { ColorSwatch } from "../ColorSwatch"
import { Dialog } from "../Dialog"
import { Popover } from "../Popover"

const buttonStyles = tv({
  base: "text-foreground focus-visible:ring-ring/30 flex cursor-default items-center gap-2 rounded-md border-0 bg-transparent text-sm outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-3"
})

export interface ColorPickerProps extends Omit<
  AriaColorPickerProps,
  "children"
> {
  children?: React.ReactNode
  label?: string
}

export function ColorPicker({ children, label, ...props }: ColorPickerProps) {
  return (
    <AriaColorPicker {...props} data-slot="color-picker">
      <DialogTrigger>
        <Button className={buttonStyles}>
          <ColorSwatch />
          <span>{label}</span>
        </Button>
        <Popover placement="bottom start">
          <Dialog className="flex flex-col gap-2 p-3">
            {children || (
              <>
                <ColorArea
                  colorSpace="hsb"
                  xChannel="saturation"
                  yChannel="brightness"
                />
                <ColorSlider channel="hue" colorSpace="hsb" />
                <ColorField label="Hex" />
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </AriaColorPicker>
  )
}
