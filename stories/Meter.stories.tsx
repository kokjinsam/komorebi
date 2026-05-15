import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Meter } from "../src"

const meta: Meta<typeof Meter> = {
  component: Meter,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Meter> = (args) => <Meter {...args} />

Example.args = {
  label: "Storage space",
  value: 80
}
