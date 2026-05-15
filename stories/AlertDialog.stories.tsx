import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { DialogTrigger } from "react-aria-components/Dialog"
import { AlertDialog } from "../src"
import { Button } from "../src"
import { Modal } from "../src"

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof AlertDialog> = (args) => (
  <DialogTrigger>
    <Button variant="secondary">Delete…</Button>
    <Modal>
      <AlertDialog {...args} />
    </Modal>
  </DialogTrigger>
)

Example.args = {
  actionLabel: "Delete",
  children:
    'Are you sure you want to delete "Documents"? All contents will be permanently destroyed.',
  title: "Delete folder",
  variant: "destructive"
}
