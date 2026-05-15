import {
  TextBIcon as BoldIcon,
  TextItalicIcon as ItalicIcon,
  TextUnderlineIcon as UnderlineIcon
} from "@phosphor-icons/react"
import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ToggleButton } from "../src"
import { ToggleButtonGroup } from "../src"

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof ToggleButtonGroup> = (args) => (
  <ToggleButtonGroup {...args}>
    <ToggleButton aria-label="Bold" id="bold">
      <BoldIcon className="h-4 w-4" />
    </ToggleButton>
    <ToggleButton aria-label="Italic" id="italic">
      <ItalicIcon className="h-4 w-4" />
    </ToggleButton>
    <ToggleButton aria-label="Underline" id="underline">
      <UnderlineIcon className="h-4 w-4" />
    </ToggleButton>
  </ToggleButtonGroup>
)

Example.args = {
  selectionMode: "multiple"
}
