import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Button } from "../src"
import { DateField } from "../src"
import { Form } from "../src"
import { TextField } from "../src"

const meta: Meta<typeof Form> = {
  component: Form,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Form> = (args) => (
  <Form {...args}>
    <TextField
      isRequired
      label="Email"
      name="email"
      placeholder="Enter your email"
      type="email"
    />
    <DateField isRequired label="Birth date" />
    <div className="flex gap-2">
      <Button type="submit">Submit</Button>
      <Button type="reset" variant="secondary">
        Reset
      </Button>
    </div>
  </Form>
)
