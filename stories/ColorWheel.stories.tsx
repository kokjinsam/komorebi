import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ColorWheel } from "../src"

const meta: Meta<typeof ColorWheel> = {
  component: ColorWheel,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ColorWheel> = (args) => (
  <ColorWheel {...args} />
)
