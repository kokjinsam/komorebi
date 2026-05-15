import { QuestionIcon } from "@phosphor-icons/react"
import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { DialogTrigger } from "react-aria-components/Dialog"
import { Heading } from "react-aria-components/Heading"
import { Button } from "../src"
import { Dialog } from "../src"
import { Popover } from "../src"

const meta: Meta<typeof Popover> = {
  args: {
    showArrow: true
  },
  component: Popover,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Popover> = (args) => (
  <DialogTrigger>
    <Button aria-label="Help" variant="secondary">
      <QuestionIcon className="h-4 w-4" />
    </Button>
    <Popover {...args} className="max-w-[250px]">
      <Dialog>
        <Heading className="mb-2 text-lg font-semibold" slot="title">
          Help
        </Heading>
        <p className="text-sm">
          For help accessing your account, please contact support.
        </p>
      </Dialog>
    </Popover>
  </DialogTrigger>
)
