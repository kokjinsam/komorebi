import React from "react"
import { themes } from "storybook/theming"
import "../src/styles/index.css"

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        { className: "font-sans text-foreground antialiased" },
        React.createElement(Story)
      )
  ],
  parameters: {
    backgrounds: {
      default: "muted",
      values: [
        { name: "muted", value: "var(--muted)" },
        { name: "background", value: "var(--background)" }
      ]
    },
    controls: {
      matchers: {}
    },
    docs: {
      theme: globalThis.matchMedia("(prefers-color-scheme: dark)").matches
        ? themes.dark
        : themes.light
    }
  }
}

export default preview
