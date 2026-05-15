import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Switch } from "../src"

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Switch> = (args) => (
  <Switch {...args}>Wi-Fi</Switch>
)
