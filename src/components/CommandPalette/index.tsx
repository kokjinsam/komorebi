"use client"

import React, { useEffect } from "react"
import {
  Autocomplete as AriaAutocomplete,
  type AutocompleteProps as AriaAutocompleteProps,
  useFilter
} from "react-aria-components/Autocomplete"
import { Dialog } from "react-aria-components/Dialog"
import { type MenuProps as AriaMenuProps } from "react-aria-components/Menu"
import { Menu } from "../Menu"
import { Modal } from "../Modal"
import { SearchField } from "../SearchField"

export interface CommandPaletteProps<T extends object>
  extends AriaMenuProps<T>, Omit<AriaAutocompleteProps, "children"> {
  isOpen: boolean
  onOpenChange: (isOpen?: boolean) => void
}

export function CommandPalette<T extends object>(
  props: CommandPaletteProps<T>
) {
  const { isOpen, onOpenChange } = props
  const { contains } = useFilter({ sensitivity: "base" })

  useEffect(() => {
    const isMacUA = /mac(os|intosh)/i.test(navigator.userAgent)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "j" && (isMacUA ? e.metaKey : e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(true)
      } else if (e.key === "Escape") {
        e.preventDefault()
        onOpenChange(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onOpenChange])

  return (
    <Modal
      isDismissable
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      position="top"
    >
      <Dialog
        className="flex max-h-[inherit] flex-col p-1"
        data-slot="command-palette"
      >
        <AriaAutocomplete filter={contains} {...props}>
          <div className="px-1 pt-1">
            <SearchField
              aria-label="Search commands"
              autoFocus
              placeholder="Search commands"
            />
          </div>
          <Menu
            {...props}
            className="max-h-72 min-h-0 flex-1"
            renderEmptyState={() => "No results found."}
          />
        </AriaAutocomplete>
      </Dialog>
    </Modal>
  )
}
