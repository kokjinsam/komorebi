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
import { composeTailwindRenderProps } from "@/utils"
import { Link } from "../Link"

export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
  return (
    <AriaBreadcrumbs
      {...props}
      className={twMerge("flex flex-wrap items-center gap-1", props.className)}
      data-slot="breadcrumbs"
    />
  )
}

export function Breadcrumb(
  props: BreadcrumbProps & Omit<LinkProps, "className">
) {
  return (
    <AriaBreadcrumb
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex items-center gap-1"
      )}
      data-slot="breadcrumb"
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
