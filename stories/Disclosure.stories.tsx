import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Disclosure, DisclosureHeader, DisclosurePanel } from "../src"

const meta: Meta<typeof Disclosure> = {
  component: Disclosure,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Disclosure> = (args) => (
  <Disclosure {...args}>
    <DisclosureHeader>Files</DisclosureHeader>
    <DisclosurePanel>Files content</DisclosurePanel>
  </Disclosure>
)
