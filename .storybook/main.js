/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  addons: ["@storybook/addon-docs", "@vueless/storybook-dark-mode"],
  docs: {
    autodocs: "tag"
  },
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false
      },
      propFilter: (prop) => !/^aria-|on[A-Z]/.test(prop.name),
      shouldExtractLiteralValuesFromEnum: true
    }
  }
}
export default config
