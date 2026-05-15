import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../src"
import { SearchField } from "../src"

const meta: Meta<typeof SearchField> = {
  args: {
    label: "Search",
    placeholder: "Search documents"
  },
  component: SearchField,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof SearchField> = (args) => (
  <SearchField {...args} />
)

export const Validation: StoryFn<typeof SearchField> = (args) => (
  <Form className="flex flex-col items-start gap-2">
    <SearchField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true
}
