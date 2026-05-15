import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { RangeCalendar } from "../src"

const meta: Meta<typeof RangeCalendar> = {
  component: RangeCalendar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof RangeCalendar> = (args) => (
  <RangeCalendar aria-label="Trip dates" {...args} />
)
