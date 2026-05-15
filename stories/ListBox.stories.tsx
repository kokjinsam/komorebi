import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ListBox, ListBoxItem } from "../src"

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ListBox> = (args) => (
  <ListBox aria-label="Ice cream flavor" {...args}>
    <ListBoxItem id="chocolate">Chocolate</ListBoxItem>
    <ListBoxItem id="mint">Mint</ListBoxItem>
    <ListBoxItem id="strawberry">Strawberry</ListBoxItem>
    <ListBoxItem id="vanilla">Vanilla</ListBoxItem>
  </ListBox>
)

Example.args = {
  onAction: null,
  selectionMode: "multiple"
}

export const DisabledItems: StoryFn<typeof ListBox> = (args) => (
  <Example {...args} />
)
DisabledItems.args = {
  ...Example.args,
  disabledKeys: ["mint"]
}
