import React from "react"
import { themes } from "storybook/theming"
import "../src/index.css"

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {}
    },
    docs: {
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? themes.dark
        : themes.light
    },
    backgrounds: {
      default: "muted",
      values: [
        { name: "muted", value: "var(--muted)" },
        { name: "background", value: "var(--background)" }
      ]
    }
  },
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        { className: "font-sans text-foreground antialiased" },
        React.createElement(Story)
      )
  ]
}

export default preview
