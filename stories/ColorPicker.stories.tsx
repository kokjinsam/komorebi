import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ColorPicker } from "../src"

const meta: Meta<typeof ColorPicker> = {
  args: {
    defaultValue: "#ff0",
    label: "Color"
  },
  component: ColorPicker,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ColorPicker> = (args) => (
  <ColorPicker {...args} />
)
