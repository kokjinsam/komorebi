import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ColorSlider } from "../src"

const meta: Meta<typeof ColorSlider> = {
  component: ColorSlider,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ColorSlider> = (args) => (
  <ColorSlider {...args} />
)

Example.args = {
  channel: "hue",
  colorSpace: "hsl",
  defaultValue: "#f00",
  label: "Fill Color"
}
