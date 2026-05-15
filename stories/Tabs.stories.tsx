import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "../src"

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

export const Example: StoryFn<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <TabList aria-label="History of Ancient Rome">
      <Tab id="FoR">Founding of Rome</Tab>
      <Tab id="MaR">Monarchy and Republic</Tab>
      <Tab id="Emp">Empire</Tab>
    </TabList>
    <TabPanels>
      <TabPanel id="FoR">
        Arma virumque cano, Troiae qui primus ab oris.
      </TabPanel>
      <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
      <TabPanel id="Emp">Alea jacta est.</TabPanel>
    </TabPanels>
  </Tabs>
)
