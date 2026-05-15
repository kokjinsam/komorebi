import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ColorSwatchPicker, ColorSwatchPickerItem } from "../src"

const meta: Meta<typeof ColorSwatchPicker> = {
  component: ColorSwatchPicker,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ColorSwatchPicker> = (args) => (
  <ColorSwatchPicker {...args}>
    <ColorSwatchPickerItem color="#A00" />
    <ColorSwatchPickerItem color="#f80" />
    <ColorSwatchPickerItem color="#080" />
    <ColorSwatchPickerItem color="#08f" />
    <ColorSwatchPickerItem color="#088" />
    <ColorSwatchPickerItem color="#008" />
  </ColorSwatchPicker>
)
