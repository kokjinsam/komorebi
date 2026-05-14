import React from "react"
import { Badge } from "../src/Badge"

export default {
  title: "Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive", "ghost"]
    }
  },
  args: { children: "Badge" }
}

export const Default = { args: { variant: "default" } }

export const Secondary = { args: { variant: "secondary" } }

export const Outline = { args: { variant: "outline" } }

export const Destructive = { args: { variant: "destructive" } }

export const Ghost = { args: { variant: "ghost" } }

export const AllVariants = () => (
  <div className="flex flex-wrap gap-2">
    <Badge variant="default">Default</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="ghost">Ghost</Badge>
  </div>
)
