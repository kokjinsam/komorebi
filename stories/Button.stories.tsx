import { Button } from "../src/Button"

export default {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link"
      ]
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg"
      ]
    }
  },
  args: {
    isDisabled: false,
    children: "Button"
  }
}

export const Default = {
  args: { variant: "default" }
}

export const Secondary = {
  args: { variant: "secondary" }
}

export const Outline = {
  args: { variant: "outline" }
}

export const Ghost = {
  args: { variant: "ghost" }
}

export const Destructive = {
  args: { variant: "destructive" }
}

export const Pending = {
  args: { variant: "default", isPending: true, children: "Saving…" }
}

export const Disabled = {
  args: { variant: "default", isDisabled: true }
}
