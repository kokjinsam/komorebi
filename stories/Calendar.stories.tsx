import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Calendar } from "../src"

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Calendar> = (args) => (
  <Calendar aria-label="Event date" {...args} />
)
