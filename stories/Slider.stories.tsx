import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Slider } from "../src"

const meta: Meta<typeof Slider> = {
  component: Slider,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Slider> = (args) => <Slider {...args} />

Example.args = {
  defaultValue: [30, 60],
  label: "Range",
  thumbLabels: ["start", "end"]
}
