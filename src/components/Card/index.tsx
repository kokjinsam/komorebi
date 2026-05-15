"use client"

import React from "react"
import { tv } from "tailwind-variants"
import { cn } from "@/utils"

const card = tv({
  base: "group/card bg-card text-card-foreground ring-foreground/5 dark:ring-foreground/10 flex flex-col gap-6 overflow-hidden rounded-4xl py-6 text-sm shadow-md ring-1 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-4xl *:[img:last-child]:rounded-b-4xl",
  defaultVariants: { size: "default" },
  variants: {
    size: {
      default: "",
      sm: "gap-4 py-4"
    }
  }
})

export interface CardProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm"
}

export function Card({ className, size = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(card({ size }), className)}
      data-size={size}
      data-slot="card"
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-4xl px-6 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4",
        className
      )}
      data-slot="card-header"
      {...props}
    />
  )
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("font-heading text-base font-medium", className)}
      data-slot="card-title"
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="card-description"
      {...props}
    />
  )
}

export function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      data-slot="card-action"
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-6 group-data-[size=sm]/card:px-4", className)}
      data-slot="card-content"
      {...props}
    />
  )
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center rounded-b-4xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4",
        className
      )}
      data-slot="card-footer"
      {...props}
    />
  )
}
