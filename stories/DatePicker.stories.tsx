import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../src"
import { DatePicker } from "../src"

const meta: Meta<typeof DatePicker> = {
  args: {
    label: "Event date"
  },
  component: DatePicker,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof DatePicker> = (args) => (
  <DatePicker {...args} />
)

export const Validation: StoryFn<typeof DatePicker> = (args) => (
  <Form className="flex flex-col items-start gap-2">
    <DatePicker {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true
}
