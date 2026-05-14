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

export const Neutral = (args: any) => (
  <TagGroup label="Status" color="neutral" {...args}>
    <Tag>Draft</Tag>
    <Tag>Review</Tag>
    <Tag>Published</Tag>
  </TagGroup>
)

export const Danger = (args: any) => (
  <TagGroup label="Issues" color="danger" {...args}>
    <Tag>Error</Tag>
    <Tag>Critical</Tag>
    <Tag>Blocked</Tag>
  </TagGroup>
)

export const Chart1 = (args: any) => (
  <TagGroup label="Health (chart1)" color="chart1" {...args}>
    <Tag>Passing</Tag>
    <Tag>Healthy</Tag>
    <Tag>Active</Tag>
  </TagGroup>
)

Chart1.storyName = "Chart1 — good"

export const Chart3 = (args: any) => (
  <TagGroup label="Caution (chart3)" color="chart3" {...args}>
    <Tag>Warning</Tag>
    <Tag>At risk</Tag>
    <Tag>Degraded</Tag>
  </TagGroup>
)

Chart3.storyName = "Chart3 — caution"

export const Chart5 = (args: any) => (
  <TagGroup label="Info (chart5)" color="chart5" {...args}>
    <Tag>Queued</Tag>
    <Tag>Pending</Tag>
    <Tag>Scheduled</Tag>
  </TagGroup>
)

export const Removable = (args: any) => (
  <TagGroup label="Categories" selectionMode="none" {...args}>
    <Tag id="1" textValue="News">News</Tag>
    <Tag id="2" textValue="Travel">Travel</Tag>
    <Tag id="3" textValue="Gaming">Gaming</Tag>
    <Tag id="4" textValue="Shopping">Shopping</Tag>
  </TagGroup>
)

Removable.args = {
  onRemove: (keys: Set<string>) => alert(`Removed: ${[...keys].join(", ")}`)
}
