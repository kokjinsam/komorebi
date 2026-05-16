import { type Meta, type StoryFn } from "@storybook/react"
import React from "react"
import { ResizableGroup, ResizableHandle, ResizablePanel } from "../src"

const meta: Meta = {
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  title: "Resizable"
}

export default meta

export const IDELayout: StoryFn = () => (
  <div className="h-[480px] w-[480px]">
    <ResizableGroup
      className="h-[480px] rounded-3xl border"
      orientation="horizontal"
    >
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="text-muted-foreground p-4 text-sm">Sidebar</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ResizableGroup orientation="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="p-4 text-sm">Editor</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={10}>
            <div className="p-4 font-mono text-sm">Terminal</div>
          </ResizablePanel>
        </ResizableGroup>
      </ResizablePanel>
    </ResizableGroup>
  </div>
)
