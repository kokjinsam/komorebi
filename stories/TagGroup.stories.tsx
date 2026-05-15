import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Tag, TagGroup } from "../src"

const meta: Meta<typeof TagGroup> = {
  component: TagGroup,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof TagGroup> = (args) => (
  <TagGroup {...args}>
    <Tag>Chocolate</Tag>
    <Tag isDisabled>Mint</Tag>
    <Tag>Strawberry</Tag>
    <Tag>Vanilla</Tag>
  </TagGroup>
)

Example.args = {
  label: "Ice cream flavor",
  selectionMode: "single"
}

export const Default: StoryFn<typeof TagGroup> = (args) => (
  <TagGroup label="Status" variant="default" {...args}>
    <Tag>Draft</Tag>
    <Tag>Review</Tag>
    <Tag>Published</Tag>
  </TagGroup>
)

export const Secondary: StoryFn<typeof TagGroup> = (args) => (
  <TagGroup label="Category" variant="secondary" {...args}>
    <Tag>Design</Tag>
    <Tag>Engineering</Tag>
    <Tag>Product</Tag>
  </TagGroup>
)

export const Outline: StoryFn<typeof TagGroup> = (args) => (
  <TagGroup label="Health" variant="outline" {...args}>
    <Tag>Passing</Tag>
    <Tag>Healthy</Tag>
    <Tag>Active</Tag>
  </TagGroup>
)

export const Destructive: StoryFn<typeof TagGroup> = (args) => (
  <TagGroup label="Issues" variant="destructive" {...args}>
    <Tag>Error</Tag>
    <Tag>Critical</Tag>
    <Tag>Blocked</Tag>
  </TagGroup>
)

export const Ghost: StoryFn<typeof TagGroup> = (args) => (
  <TagGroup label="Info" variant="ghost" {...args}>
    <Tag>Queued</Tag>
    <Tag>Pending</Tag>
    <Tag>Scheduled</Tag>
  </TagGroup>
)

export const Removable: StoryFn<typeof TagGroup> = (args) => (
  <TagGroup label="Categories" selectionMode="none" {...args}>
    <Tag id="1" textValue="News">
      News
    </Tag>
    <Tag id="2" textValue="Travel">
      Travel
    </Tag>
    <Tag id="3" textValue="Gaming">
      Gaming
    </Tag>
    <Tag id="4" textValue="Shopping">
      Shopping
    </Tag>
  </TagGroup>
)

Removable.args = {
  onRemove: (keys: Set<string>) => alert(`Removed: ${[...keys].join(", ")}`)
}
