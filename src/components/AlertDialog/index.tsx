"use client"

import { InfoIcon, WarningCircleIcon } from "@phosphor-icons/react"
import React, { type ReactNode } from "react"
import { type DialogProps } from "react-aria-components/Dialog"
import { Heading } from "react-aria-components/Heading"
import { chain } from "react-aria/chain"
import { Button } from "./Button"
import { Dialog } from "./Dialog"

interface AlertDialogProps extends Omit<DialogProps, "children"> {
  title: string
  children: ReactNode
  variant?: "info" | "destructive"
  actionLabel: string
  cancelLabel?: string
  onAction?: () => void
}

export function AlertDialog({
  title,
  variant,
  cancelLabel,
  actionLabel,
  onAction,
  children,
  ...props
}: AlertDialogProps) {
  return (
    <Dialog role="alertdialog" data-slot="alert-dialog" {...props}>
      {({ close }) => (
        <>
          <Heading
            slot="title"
            className="font-heading my-0 text-xl leading-6 font-semibold"
          >
            {title}
          </Heading>
          <div
            className={`absolute top-6 right-6 size-6 ${variant === "destructive" ? "text-destructive" : "text-primary"}`}
          >
            {variant === "destructive" ? (
              <WarningCircleIcon weight="fill" aria-hidden />
            ) : (
              <InfoIcon aria-hidden />
            )}
          </div>
          <p className="text-muted-foreground mt-3 text-sm">{children}</p>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onPress={close}>
              {cancelLabel || "Cancel"}
            </Button>
            <Button
              variant={variant === "destructive" ? "destructive" : "default"}
              autoFocus
              onPress={chain(onAction, close)}
            >
              {actionLabel}
            </Button>
          </div>
        </>
      )}
    </Dialog>
  )
}
