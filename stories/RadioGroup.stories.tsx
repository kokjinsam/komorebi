import { type StoryFn } from "@storybook/react"
import React from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../src"
import { Radio, RadioGroup } from "../src"

export default {
  args: {
    children: (
      <>
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </>
    ),
    description: "",
    isDisabled: false,
    isRequired: false,
    label: "Favorite sport"
  },
  argTypes: {},
  component: RadioGroup,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  title: "RadioGroup"
}

export const Default = {
  args: {}
}

export const Validation: StoryFn<typeof RadioGroup> = (args) => (
  <Form className="flex flex-col items-start gap-2">
    <RadioGroup {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true
}
