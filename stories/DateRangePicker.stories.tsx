import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../src"
import { DateRangePicker } from "../src"

const meta: Meta<typeof DateRangePicker> = {
  args: {
    label: "Trip dates"
  },
  component: DateRangePicker,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof DateRangePicker> = (args) => (
  <DateRangePicker {...args} />
)

export const Validation: StoryFn<typeof DateRangePicker> = (args) => (
  <Form className="flex flex-col items-start gap-2">
    <DateRangePicker {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true
}
