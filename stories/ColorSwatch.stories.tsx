import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ColorSwatch } from "../src"

const meta: Meta<typeof ColorSwatch> = {
  component: ColorSwatch,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ColorSwatch> = (args) => (
  <ColorSwatch {...args} />
)

Example.args = {
  color: "#f00a"
}
