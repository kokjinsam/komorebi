import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../src"
import { TextField } from "../src"

const meta: Meta<typeof TextField> = {
  args: {
    label: "Name",
    placeholder: "Enter your full name"
  },
  component: TextField,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof TextField> = (args) => (
  <TextField {...args} />
)

export const Validation: StoryFn<typeof TextField> = (args) => (
  <Form className="flex flex-col items-start gap-2">
    <TextField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true
}
