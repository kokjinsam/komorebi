"use client"

import React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Tab as RACTab,
  TabList as RACTabList,
  TabPanels as RACTabPanels,
  TabPanel as RACTabPanel,
  Tabs as RACTabs,
  SelectionIndicator,
  type TabListProps,
  type TabPanelProps,
  type TabPanelsProps,
  type TabProps,
  type TabsProps
} from "react-aria-components/Tabs"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"
import { focusRing } from "./utils"

const tabsStyles = tv({
  base: "flex max-w-full gap-4 font-sans",
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
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabsStyles({ ...renderProps, className })
      )}
    />
  )
}

const tabListStyles = tv({
  base: "-m-1 flex max-w-full [scrollbar-width:none] overflow-x-auto overflow-y-clip p-1",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col items-start"
    }
  }
})

export function TabList<T extends object>(props: TabListProps<T>) {
  return (
    <RACTabList
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabListStyles({ ...renderProps, className })
      )}
    />
  )
}

const tabProps = tv({
  extend: focusRing,
  base: "group relative flex cursor-default items-center rounded-full px-3 py-1.5 text-sm font-medium transition forced-color-adjust-none [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      true: "selected:bg-muted selected:text-muted-foreground forced-colors:selected:text-[HighlightText] forced-colors:selected:bg-[GrayText] text-muted-foreground forced-colors:text-[GrayText]"
    }
  }
})

export function Tab(props: TabProps) {
  return (
    <RACTab
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabProps({ ...renderProps, className })
      )}
    >
      {composeRenderProps(props.children, (children) => (
        <>
          {children}
          <SelectionIndicator className="absolute top-0 left-0 z-10 h-full w-full rounded-full bg-background mix-blend-difference group-disabled:-z-1 group-disabled:bg-muted-foreground/40 group-disabled:mix-blend-normal motion-safe:transition-[translate,width,height]" />
        </>
      ))}
    </RACTab>
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

const tabPanelStyles = tv({
  extend: focusRing,
  base: "entering:opacity-0 exiting:opacity-0 exiting:absolute exiting:top-0 exiting:left-0 exiting:w-full box-border flex-1 p-4 text-sm text-foreground transition"
})

export function TabPanel(props: TabPanelProps) {
  return (
    <RACTabPanel
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabPanelStyles({ ...renderProps, className })
      )}
    />
  )
}
