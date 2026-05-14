import { type Meta } from "@storybook/react"
import React from "react"
import { Tag, TagGroup } from "../src/TagGroup"

const meta: Meta<typeof TagGroup> = {
  component: TagGroup,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example = (args: any) => (
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

export const Default = (args: any) => (
  <TagGroup label="Status" variant="default" {...args}>
    <Tag>Draft</Tag>
    <Tag>Review</Tag>
    <Tag>Published</Tag>
  </TagGroup>
)

export const Secondary = (args: any) => (
  <TagGroup label="Category" variant="secondary" {...args}>
    <Tag>Design</Tag>
    <Tag>Engineering</Tag>
    <Tag>Product</Tag>
  </TagGroup>
)

export const Outline = (args: any) => (
  <TagGroup label="Health" variant="outline" {...args}>
    <Tag>Passing</Tag>
    <Tag>Healthy</Tag>
    <Tag>Active</Tag>
  </TagGroup>
)

export const Destructive = (args: any) => (
  <TagGroup label="Issues" variant="destructive" {...args}>
    <Tag>Error</Tag>
    <Tag>Critical</Tag>
    <Tag>Blocked</Tag>
  </TagGroup>
)

export const Ghost = (args: any) => (
  <TagGroup label="Info" variant="ghost" {...args}>
    <Tag>Queued</Tag>
    <Tag>Pending</Tag>
    <Tag>Scheduled</Tag>
  </TagGroup>
)

export const Removable = (args: any) => (
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
