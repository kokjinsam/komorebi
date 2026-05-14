import { type Meta } from "@storybook/react"
import { HelpCircle } from "lucide-react"
import React from "react"
import { DialogTrigger } from "react-aria-components/Dialog"
import { Heading } from "react-aria-components/Heading"
import { Button } from "../src/Button"
import { Dialog } from "../src/Dialog"
import { Popover } from "../src/Popover"

const meta: Meta<typeof Popover> = {
  component: Popover,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  args: {
    showArrow: true
  }
}

export default meta

export const Example = (args: any) => (
  <DialogTrigger>
    <Button variant="secondary" aria-label="Help">
      <HelpCircle className="h-4 w-4" />
    </Button>
    <Popover {...args} className="max-w-[250px]">
      <Dialog>
        <Heading slot="title" className="mb-2 text-lg font-semibold">
          Help
        </Heading>
        <p className="text-sm">
          For help accessing your account, please contact support.
        </p>
      </Dialog>
    </Popover>
  </DialogTrigger>
)
