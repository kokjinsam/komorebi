import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../src"
import { NumberField } from "../src"

const meta: Meta<typeof NumberField> = {
  args: {
    label: "Cookies",
    placeholder: "–"
  },
  component: NumberField,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof NumberField> = (args) => (
  <NumberField {...args} />
)

export const Validation: StoryFn<typeof NumberField> = (args) => (
  <Form className="flex flex-col items-start gap-2">
    <NumberField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true
}
