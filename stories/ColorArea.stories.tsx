import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ColorArea } from "../src"

const meta: Meta<typeof ColorArea> = {
  component: ColorArea,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ColorArea> = (args) => (
  <ColorArea {...args} className="w-50" />
)
