"use client"

import { CaretRightIcon } from "@phosphor-icons/react"
import React from "react"
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  type BreadcrumbProps,
  type BreadcrumbsProps,
  type LinkProps
} from "react-aria-components/Breadcrumbs"
import { twMerge } from "tailwind-merge"
import { Link } from "./Link"
import { composeTailwindRenderProps } from "./utils"

export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
  return (
    <AriaBreadcrumbs
      {...props}
      data-slot="breadcrumbs"
      className={twMerge("flex flex-wrap items-center gap-1", props.className)}
    />
  )
}

export function Breadcrumb(
  props: BreadcrumbProps & Omit<LinkProps, "className">
) {
  return (
    <AriaBreadcrumb
      {...props}
      data-slot="breadcrumb"
      className={composeTailwindRenderProps(
        props.className,
        "flex items-center gap-1"
      )}
    >
      {({ isCurrent }) => (
        <>
          <Link
            variant={isCurrent ? "secondary" : "secondary"}
            {...props}
            className={
              isCurrent
                ? "text-foreground pointer-events-none no-underline"
                : undefined
            }
          />
          {!isCurrent && (
            <CaretRightIcon className="text-muted-foreground size-3" />
          )}
        </>
      )}
    </AriaBreadcrumb>
  )
}
