import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { GridListSection } from "react-aria-components/GridList"
import { GridList, GridListHeader, GridListItem } from "../src"

const meta: Meta<typeof GridList> = {
  argTypes: {
    keyboardNavigationBehavior: {
      control: {
        type: "radio"
      },
      options: ["arrow", "tab"]
    }
  },
  component: GridList,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof GridList> = (args) => (
  <GridList aria-label="Ice cream flavors" {...args}>
    <GridListItem id="chocolate">Chocolate</GridListItem>
    <GridListItem id="mint">Mint</GridListItem>
    <GridListItem id="strawberry">Strawberry</GridListItem>
    <GridListItem id="vanilla">Vanilla</GridListItem>
  </GridList>
)

Example.args = {
  keyboardNavigationBehavior: "arrow",
  onAction: null,
  selectionMode: "multiple"
}

export const Horizontal: StoryFn<typeof GridList> = (args) => (
  <GridList aria-label="Ice cream flavors" orientation="horizontal" {...args}>
    <GridListItem id="chocolate">Chocolate</GridListItem>
    <GridListItem id="mint">Mint</GridListItem>
    <GridListItem id="strawberry">Strawberry</GridListItem>
    <GridListItem id="vanilla">Vanilla</GridListItem>
  </GridList>
)

Horizontal.args = {
  ...Example.args
}

export const DisabledItems: StoryFn<typeof GridList> = (args) => (
  <Example {...args} />
)
DisabledItems.args = {
  ...Example.args,
  disabledKeys: ["mint"]
}

export const Sections: StoryFn<typeof GridList> = (args) => (
  <GridList aria-label="Food" {...args}>
    <GridListSection>
      <GridListHeader>Fruits</GridListHeader>
      <GridListItem id="Apple">Apple</GridListItem>
      <GridListItem id="Grape">Grape</GridListItem>
      <GridListItem id="Peach">Peach</GridListItem>
      <GridListItem id="Melon">Melon</GridListItem>
    </GridListSection>
    <GridListSection>
      <GridListHeader>Vegetables</GridListHeader>
      <GridListItem id="brocoli">Broccoli</GridListItem>
      <GridListItem id="peas">Peas</GridListItem>
      <GridListItem id="brussels-sprouts">Brussels Sprouts</GridListItem>
      <GridListItem id="zucchini">Zucchini</GridListItem>
    </GridListSection>
  </GridList>
)

Sections.args = {
  onAction: null,
  selectionMode: "multiple"
}
