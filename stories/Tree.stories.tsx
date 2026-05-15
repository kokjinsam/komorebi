import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Tree, TreeItem } from "../src"

const meta: Meta<typeof Tree> = {
  component: Tree,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Tree> = (args) => (
  <Tree
    aria-label="Files"
    style={{ height: "400px", width: "300px" }}
    {...args}
  >
    <TreeItem title="Documents">
      <TreeItem title="Project">
        <TreeItem title="Weekly Report" />
      </TreeItem>
    </TreeItem>
    <TreeItem title="Photos">
      <TreeItem title="Image 1" />
      <TreeItem title="Image 2" />
    </TreeItem>
  </Tree>
)

Example.args = {
  defaultExpandedKeys: ["documents", "photos", "project"],
  defaultSelectedKeys: ["project"],
  onAction: null,
  selectionMode: "multiple"
}

export const DisabledItems: StoryFn<typeof Tree> = (args) => (
  <Example {...args} />
)
DisabledItems.args = {
  ...Example.args,
  disabledKeys: ["photos"]
}
