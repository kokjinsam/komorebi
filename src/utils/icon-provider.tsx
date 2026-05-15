import { IconContext } from "@phosphor-icons/react"
import React, { type ReactNode } from "react"

export function IconProvider({ children }: { children: ReactNode }) {
  return (
    <IconContext.Provider value={{ mirrored: false, weight: "regular" }}>
      {children}
    </IconContext.Provider>
  )
}
