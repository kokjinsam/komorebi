import { IconContext } from "@phosphor-icons/react"
import React, { type ReactNode } from "react"

export function Provider({ children }: { children: ReactNode }) {
  return (
    <IconContext.Provider value={{ weight: "regular", mirrored: false }}>
      {children}
    </IconContext.Provider>
  )
}
