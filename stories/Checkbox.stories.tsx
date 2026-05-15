import { Checkbox } from "../src"

export default {
  args: {
    children: "Checkbox",
    isDisabled: false
  },
  argTypes: {},
  component: Checkbox,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  title: "Checkbox"
}

export const Default = {
  args: {
    isIndeterminate: false
  }
}
