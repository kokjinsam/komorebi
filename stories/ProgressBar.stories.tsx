import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ProgressBar } from "../src"

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
)

Example.args = {
  label: "Loading…",
  value: 80
}
