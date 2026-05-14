import {
  TextBIcon as BoldIcon,
  TextItalicIcon as ItalicIcon,
  TextUnderlineIcon as UnderlineIcon
} from "@phosphor-icons/react"
import { type Meta } from "@storybook/react"
import React from "react"
import { ToggleButton } from "../src/ToggleButton"
import { ToggleButtonGroup } from "../src/ToggleButtonGroup"

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example = (args: any) => (
  <ToggleButtonGroup {...args}>
    <ToggleButton id="bold" aria-label="Bold">
      <BoldIcon className="h-4 w-4" />
    </ToggleButton>
    <ToggleButton id="italic" aria-label="Italic">
      <ItalicIcon className="h-4 w-4" />
    </ToggleButton>
    <ToggleButton id="underline" aria-label="Underline">
      <UnderlineIcon className="h-4 w-4" />
    </ToggleButton>
  </ToggleButtonGroup>
)

Example.args = {
  selectionMode: "multiple"
}
