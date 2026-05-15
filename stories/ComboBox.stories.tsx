import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../src"
import { ComboBox, ComboBoxItem, ComboBoxSection } from "../src"

const meta: Meta<typeof ComboBox> = {
  args: {
    label: "Ice cream flavor",
    placeholder: "Choose a flavor"
  },
  component: ComboBox,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ComboBox> = (args) => (
  <ComboBox {...args}>
    <ComboBoxItem>Chocolate</ComboBoxItem>
    <ComboBoxItem id="mint">Mint</ComboBoxItem>
    <ComboBoxItem>Strawberry</ComboBoxItem>
    <ComboBoxItem>Vanilla</ComboBoxItem>
  </ComboBox>
)

export const DisabledItems: StoryFn<typeof ComboBox> = (args) => (
  <Example {...args} />
)
DisabledItems.args = {
  disabledKeys: ["mint"]
}

export const Sections: StoryFn<typeof ComboBox> = (args) => (
  <ComboBox {...args}>
    <ComboBoxSection title="Fruit">
      <ComboBoxItem id="Apple">Apple</ComboBoxItem>
      <ComboBoxItem id="Banana">Banana</ComboBoxItem>
      <ComboBoxItem id="Orange">Orange</ComboBoxItem>
      <ComboBoxItem id="Honeydew">Honeydew</ComboBoxItem>
      <ComboBoxItem id="Grapes">Grapes</ComboBoxItem>
      <ComboBoxItem id="Watermelon">Watermelon</ComboBoxItem>
      <ComboBoxItem id="Cantaloupe">Cantaloupe</ComboBoxItem>
      <ComboBoxItem id="Pear">Pear</ComboBoxItem>
    </ComboBoxSection>
    <ComboBoxSection title="Vegetable">
      <ComboBoxItem id="Cabbage">Cabbage</ComboBoxItem>
      <ComboBoxItem id="Broccoli">Broccoli</ComboBoxItem>
      <ComboBoxItem id="Carrots">Carrots</ComboBoxItem>
      <ComboBoxItem id="Lettuce">Lettuce</ComboBoxItem>
      <ComboBoxItem id="Spinach">Spinach</ComboBoxItem>
      <ComboBoxItem id="Bok Choy">Bok Choy</ComboBoxItem>
      <ComboBoxItem id="Cauliflower">Cauliflower</ComboBoxItem>
      <ComboBoxItem id="Potatoes">Potatoes</ComboBoxItem>
    </ComboBoxSection>
  </ComboBox>
)

Sections.args = {
  label: "Preferred fruit or vegetable"
}

export const Validation: StoryFn<typeof ComboBox> = (args) => (
  <Form className="flex flex-col items-start gap-2">
    <Example {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true
}
