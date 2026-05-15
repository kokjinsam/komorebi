import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ColorField } from "../src"

const meta: Meta<typeof ColorField> = {
  args: {
    defaultValue: "#ff0",
    label: "Color"
  },
  component: ColorField,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ColorField> = (args) => (
  <ColorField {...args} />
)
