import { DownloadSimpleIcon, PrinterIcon } from "@phosphor-icons/react"
import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { TooltipTrigger } from "react-aria-components/Tooltip"
import { Button } from "../src"
import { Tooltip } from "../src"

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Tooltip> = (args) => (
  <div className="flex gap-2">
    <TooltipTrigger>
      <Button className="px-2" variant="secondary">
        <DownloadSimpleIcon className="h-5 w-5" />
      </Button>
      <Tooltip {...args}>Save</Tooltip>
    </TooltipTrigger>
    <TooltipTrigger>
      <Button className="px-2" variant="secondary">
        <PrinterIcon className="h-5 w-5" />
      </Button>
      <Tooltip {...args}>Print</Tooltip>
    </TooltipTrigger>
  </div>
)
