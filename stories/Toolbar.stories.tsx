import { type Meta } from "@storybook/react"
import { TextBIcon as BoldIcon, TextItalicIcon as ItalicIcon, TextUnderlineIcon as UnderlineIcon } from "@phosphor-icons/react"
import React from "react"
import { Group } from "react-aria-components/Group"
import { Button } from "../src/Button"
import { Checkbox } from "../src/Checkbox"
import { Separator } from "../src/Separator"
import { ToggleButton } from "../src/ToggleButton"
import { Toolbar } from "../src/Toolbar"

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example = (args: any) => (
  <Toolbar aria-label="Text formatting" {...args}>
    <Group aria-label="Style" className="contents">
      <ToggleButton aria-label="Bold" className="p-2.5">
        <BoldIcon className="h-4 w-4" />
      </ToggleButton>
      <ToggleButton aria-label="Italic" className="p-2.5">
        <ItalicIcon className="h-4 w-4" />
      </ToggleButton>
      <ToggleButton aria-label="Underline" className="p-2.5">
        <UnderlineIcon className="h-4 w-4" />
      </ToggleButton>
    </Group>
    <Separator
      orientation={args.orientation === "vertical" ? "horizontal" : "vertical"}
    />
    <Group aria-label="Clipboard" className="contents">
      <Button variant="secondary">Copy</Button>
      <Button variant="secondary">Paste</Button>
      <Button variant="secondary">Cut</Button>
    </Group>
    <Separator
      orientation={args.orientation === "vertical" ? "horizontal" : "vertical"}
    />
    <Checkbox>Night Mode</Checkbox>
  </Toolbar>
)
