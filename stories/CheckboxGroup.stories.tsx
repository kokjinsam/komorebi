import { type StoryFn } from "@storybook/react"
import React from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../src"
import { Checkbox } from "../src"
import { CheckboxGroup } from "../src"

export default {
  args: {
    children: (
      <>
        <Checkbox value="sf">San Francisco</Checkbox>
        <Checkbox value="ny">New York</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </>
    ),
    description: "",
    isDisabled: false,
    isRequired: false,
    label: "Cities"
  },
  argTypes: {},
  component: CheckboxGroup,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  title: "CheckboxGroup"
}

export const Default = {
  args: {}
}

export const Validation: StoryFn<typeof CheckboxGroup> = (args) => (
  <Form className="flex flex-col items-start gap-2">
    <CheckboxGroup {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true
}
