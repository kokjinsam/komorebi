"use client"

import React from "react"
import { type FormProps, Form as RACForm } from "react-aria-components/Form"
import { twMerge } from "tailwind-merge"

export function Form(props: FormProps) {
  return (
    <RACForm
      {...props}
      data-slot="form"
      className={twMerge("group/form flex flex-col gap-6", props.className)}
    />
  )
}
