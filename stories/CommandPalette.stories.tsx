import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { DialogTrigger } from "react-aria-components/Dialog"
import { Button } from "../src"
import { CommandPalette } from "../src"
import { MenuItem, MenuSection } from "../src"

const meta: Meta<typeof CommandPalette> = {
  component: CommandPalette,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof CommandPalette> = (args) => (
  <DialogTrigger>
    <Button>
      Open Command Palette{" "}
      <kbd className="ml-4 rounded-sm border border-white/20 bg-white/10 px-1 font-sans text-xs">
        ⌘ J
      </kbd>
    </Button>
    <CommandPalette {...args}>
      <MenuItem>Chocolate</MenuItem>
      <MenuItem id="mint">Mint</MenuItem>
      <MenuItem>Strawberry</MenuItem>
      <MenuItem>Vanilla</MenuItem>
      <MenuItem>Cookies and Cream</MenuItem>
    </CommandPalette>
  </DialogTrigger>
)

export const DisabledItems: StoryFn<typeof CommandPalette> = (args) => (
  <Example {...args} />
)
DisabledItems.args = {
  disabledKeys: ["mint"]
}

export const Sections: StoryFn<typeof CommandPalette> = (args) => (
  <DialogTrigger>
    <Button>
      Open Command Palette{" "}
      <kbd className="ml-4 rounded-sm border border-white/20 bg-white/10 px-1 font-sans text-xs">
        ⌘ J
      </kbd>
    </Button>
    <CommandPalette {...args}>
      <MenuSection title="Fruit">
        <MenuItem id="Apple">Apple</MenuItem>
        <MenuItem id="Banana">Banana</MenuItem>
        <MenuItem id="Orange">Orange</MenuItem>
        <MenuItem id="Honeydew">Honeydew</MenuItem>
        <MenuItem id="Grapes">Grapes</MenuItem>
        <MenuItem id="Watermelon">Watermelon</MenuItem>
        <MenuItem id="Cantaloupe">Cantaloupe</MenuItem>
        <MenuItem id="Pear">Pear</MenuItem>
      </MenuSection>
      <MenuSection title="Vegetable">
        <MenuItem id="Cabbage">Cabbage</MenuItem>
        <MenuItem id="Broccoli">Broccoli</MenuItem>
        <MenuItem id="Carrots">Carrots</MenuItem>
        <MenuItem id="Lettuce">Lettuce</MenuItem>
        <MenuItem id="Spinach">Spinach</MenuItem>
        <MenuItem id="Bok Choy">Bok Choy</MenuItem>
        <MenuItem id="Cauliflower">Cauliflower</MenuItem>
        <MenuItem id="Potatoes">Potatoes</MenuItem>
      </MenuSection>
    </CommandPalette>
  </DialogTrigger>
)

Sections.args = {
  label: "Preferred fruit or vegetable"
}
