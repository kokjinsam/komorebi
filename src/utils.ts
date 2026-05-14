import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

export const cn = twMerge

export const focusRing = tv({
  base: "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: {
      false: "",
      true: ""
    }
  }
})

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className))
}
