import { DotsThreeIcon } from "@phosphor-icons/react"
import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Button } from "../src"
import {
  MenuTrigger,
  SubmenuTrigger,
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator
} from "../src"

const meta: Meta<typeof Menu> = {
  component: Menu,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Menu> = (args) => (
  <MenuTrigger>
    <Button className="px-2" variant="secondary">
      <DotsThreeIcon className="h-5 w-5" />
    </Button>
    <Menu {...args}>
      <MenuItem id="new">New…</MenuItem>
      <MenuItem id="open">Open…</MenuItem>
      <MenuSeparator />
      <MenuItem id="save">Save</MenuItem>
      <MenuItem id="saveAs">Save as…</MenuItem>
      <MenuSeparator />
      <MenuItem id="print">Print…</MenuItem>
    </Menu>
  </MenuTrigger>
)

export const DisabledItems: StoryFn<typeof Menu> = (args) => (
  <Example {...args} />
)
DisabledItems.args = {
  disabledKeys: ["save"]
}

export const Sections: StoryFn<typeof Menu> = (args) => (
  <MenuTrigger>
    <Button className="px-2" variant="secondary">
      <DotsThreeIcon className="h-5 w-5" />
    </Button>
    <Menu {...args}>
      <MenuSection title="Your Content">
        <MenuItem id="repos">Repositories</MenuItem>
        <MenuItem id="projects">Projects</MenuItem>
        <MenuItem id="organizations">Organizations</MenuItem>
        <MenuItem id="stars">Stars</MenuItem>
        <MenuItem id="sponsors">Sponsors</MenuItem>
      </MenuSection>
      <MenuSection title="Your Account">
        <MenuItem id="profile">Profile</MenuItem>
        <MenuItem id="status">Set status</MenuItem>
        <MenuItem id="sign-out">Sign out</MenuItem>
      </MenuSection>
    </Menu>
  </MenuTrigger>
)

export const Submenu: StoryFn<typeof Menu> = (args) => (
  <MenuTrigger>
    <Button className="px-2" variant="secondary">
      <DotsThreeIcon className="h-5 w-5" />
    </Button>
    <Menu {...args}>
      <MenuItem id="new">New…</MenuItem>
      <SubmenuTrigger>
        <MenuItem id="open">Open</MenuItem>
        <Menu>
          <MenuItem id="open-new">Open in New Window</MenuItem>
          <MenuItem id="open-current">Open in Current Window</MenuItem>
        </Menu>
      </SubmenuTrigger>
      <MenuSeparator />
      <MenuItem id="print">Print…</MenuItem>
      <SubmenuTrigger>
        <MenuItem id="share">Share</MenuItem>
        <Menu>
          <MenuItem id="sms">SMS</MenuItem>
          <MenuItem id="x">X</MenuItem>
          <SubmenuTrigger>
            <MenuItem id="email">Email</MenuItem>
            <Menu>
              <MenuItem id="work">Work</MenuItem>
              <MenuItem id="personal">Personal</MenuItem>
            </Menu>
          </SubmenuTrigger>
        </Menu>
      </SubmenuTrigger>
    </Menu>
  </MenuTrigger>
)
