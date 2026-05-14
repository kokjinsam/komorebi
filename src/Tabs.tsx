"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  TabPanels as RACTabPanels,
  Tabs as RACTabs,
  type TabListProps,
  type TabPanelProps,
  type TabPanelsProps,
  type TabProps,
  type TabsProps
} from "react-aria-components/Tabs"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

const tabsStyles = tv({
  base: "group/tabs flex max-w-full gap-4",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row"
    }
  }
})

export function Tabs(props: TabsProps) {
  return (
    <RACTabs
      {...props}
      data-slot="tabs"
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabsStyles({ ...renderProps, className })
      )}
    />
  )
}

const tabListStyles = tv({
  base: "inline-flex h-9 items-center justify-center rounded-3xl bg-muted p-1 text-muted-foreground",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col h-auto w-auto"
    }
  }
})

export function TabList<T extends object>(props: TabListProps<T>) {
  return (
    <RACTabList
      {...props}
      data-slot="tabs-list"
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabListStyles({ ...renderProps, className })
      )}
    />
  )
}

export function Tab(props: TabProps) {
  return (
    <RACTab
      {...props}
      data-slot="tabs-tab"
      className={composeRenderProps(props.className, (className) =>
        twMerge(
          "inline-flex h-7 cursor-default items-center justify-center gap-1.5 rounded-2xl px-3 text-sm font-medium whitespace-nowrap transition-all outline-none select-none [-webkit-tap-highlight-color:transparent]",
          "selected:bg-background selected:text-foreground selected:shadow-sm",
          "disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:ring-3 focus-visible:ring-ring/30 forced-colors:outline-[Highlight]",
          className
        )
      )}
    />
  )
}

export function TabPanels<T extends object>(props: TabPanelsProps<T>) {
  return (
    <RACTabPanels
      {...props}
      className={twMerge(
        "relative h-(--tab-panel-height) motion-safe:transition-[height] overflow-clip",
        props.className
      )}
    />
  )
}

export function TabPanel(props: TabPanelProps) {
  return (
    <RACTabPanel
      {...props}
      data-slot="tabs-panel"
      className={composeRenderProps(props.className, (className) =>
        twMerge(
          "mt-2 text-foreground outline-none entering:opacity-0 exiting:opacity-0 exiting:absolute exiting:top-0 exiting:left-0 exiting:w-full transition",
          className
        )
      )}
    />
  )
}
