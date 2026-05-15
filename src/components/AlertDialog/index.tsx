"use client"

import { InfoIcon, WarningCircleIcon } from "@phosphor-icons/react"
import React, { type ReactNode } from "react"
import { type DialogProps } from "react-aria-components/Dialog"
import { Heading } from "react-aria-components/Heading"
import { chain } from "react-aria/chain"
import { Button } from "../Button"
import { Dialog } from "../Dialog"

interface AlertDialogProps extends Omit<DialogProps, "children"> {
  actionLabel: string
  cancelLabel?: string
  children: ReactNode
  onAction?: () => void
  title: string
  variant?: "info" | "destructive"
}

export function AlertDialog({
  actionLabel,
  cancelLabel,
  children,
  onAction,
  title,
  variant,
  ...props
}: AlertDialogProps) {
  return (
    <Dialog data-slot="alert-dialog" role="alertdialog" {...props}>
      {({ close }) => (
        <>
          <Heading
            className="font-heading my-0 text-xl leading-6 font-semibold"
            slot="title"
          >
            {title}
          </Heading>
          <div
            className={`absolute top-6 right-6 size-6 ${variant === "destructive" ? "text-destructive" : "text-primary"}`}
          >
            {variant === "destructive" ? (
              <WarningCircleIcon aria-hidden weight="fill" />
            ) : (
              <InfoIcon aria-hidden />
            )}
          </div>
          <p className="text-muted-foreground mt-3 text-sm">{children}</p>
          <div className="mt-6 flex justify-end gap-2">
            <Button onPress={close} variant="outline">
              {cancelLabel || "Cancel"}
            </Button>
            <Button
              autoFocus
              onPress={chain(onAction, close)}
              variant={variant === "destructive" ? "destructive" : "default"}
            >
              {actionLabel}
            </Button>
          </div>
        </>
      )}
    </Dialog>
  )
}
