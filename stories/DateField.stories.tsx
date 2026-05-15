import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../src"
import { DateField } from "../src"

const meta: Meta<typeof DateField> = {
  args: {
    label: "Event date"
  },
  component: DateField,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof DateField> = (args) => (
  <DateField {...args} />
)

export const Validation: StoryFn<typeof DateField> = (args) => (
  <Form className="flex flex-col items-start gap-2">
    <DateField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true
}
