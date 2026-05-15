import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Link } from "../src"

const meta: Meta<typeof Link> = {
  component: Link,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Link> = (args) => (
  <Link {...args}>The missing link</Link>
)

Example.args = {
  href: "https://www.imdb.com/title/tt6348138/",
  target: "_blank"
}
