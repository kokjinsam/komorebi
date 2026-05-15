import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Breadcrumb, Breadcrumbs } from "../src"

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args}>
    <Breadcrumb href="/">Home</Breadcrumb>
    <Breadcrumb href="/react-aria">React Aria</Breadcrumb>
    <Breadcrumb>Breadcrumbs</Breadcrumb>
  </Breadcrumbs>
)
