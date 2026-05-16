import { DocsContainer } from "@storybook/addon-docs/blocks"
import { useDarkMode } from "@vueless/storybook-dark-mode"
import React from "react"
import { themes } from "storybook/theming"
import "../src/styles/tailwind.css"
import "../src/styles/default-theme.css"
import "../src/styles/komorebi.css"

function ThemedDocsContainer(props) {
  const isDark = useDarkMode()

  return React.createElement(
    DocsContainer,
    { ...props, theme: isDark ? themes.dark : themes.light },
    props.children
  )
}

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
    darkMode: {
      classTarget: "body",
      darkClass: "dark",
      lightClass: "light",
      stylePreview: true
    },
    docs: {
      container: ThemedDocsContainer
    }
  }
}

export default preview
