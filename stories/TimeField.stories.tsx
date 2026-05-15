import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../src"
import { TimeField } from "../src"

const meta: Meta<typeof TimeField> = {
  args: {
    label: "Event time"
  },
  component: TimeField,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof TimeField> = (args) => (
  <TimeField {...args} />
)

export const Validation: StoryFn<typeof TimeField> = (args) => (
  <Form className="flex flex-col items-start gap-2">
    <TimeField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true
}
