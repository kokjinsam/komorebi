import { Button } from "../src"

export default {
  args: {
    children: "Button",
    isDisabled: false
  },
  argTypes: {
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
    },
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
    }
  },
  component: Button,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  title: "Button"
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
  args: { children: "Saving…", isPending: true, variant: "default" }
}

export const Disabled = {
  args: { isDisabled: true, variant: "default" }
}
