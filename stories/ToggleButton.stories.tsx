import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ToggleButton } from "../src"

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ToggleButton> = (args) => (
  <ToggleButton {...args}>Pin</ToggleButton>
)
