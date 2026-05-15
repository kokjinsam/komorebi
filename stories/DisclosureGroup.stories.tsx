import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Disclosure, DisclosureHeader, DisclosurePanel } from "../src"
import { DisclosureGroup } from "../src"

const meta: Meta<typeof DisclosureGroup> = {
  component: DisclosureGroup,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof DisclosureGroup> = (args) => (
  <DisclosureGroup {...args}>
    <Disclosure>
      <DisclosureHeader>Files</DisclosureHeader>
      <DisclosurePanel>Files content</DisclosurePanel>
    </Disclosure>
    <Disclosure>
      <DisclosureHeader>Images</DisclosureHeader>
      <DisclosurePanel>Images content</DisclosurePanel>
    </Disclosure>
    <Disclosure>
      <DisclosureHeader>Documents</DisclosureHeader>
      <DisclosurePanel>Documents content</DisclosurePanel>
    </Disclosure>
  </DisclosureGroup>
)
